/**
 * ============================================================================
 * ENHANCED USER PROFILE PAGE WITH ACTIVITY TRACKING
 * ============================================================================
 * 
 * FEATURES:
 * - Basic profile information (photo, name, contact, hobbies)
 * - User statistics dashboard (resources, bookmarks, requests, ratings)
 * - 4 tabbed sections: Overview, Shared Resources, Activity, My Requests
 * - Full edit mode for profile updates
 * - Dark mode support with glassmorphism design
 * 
 * CODE OPTIMIZATION:
 * - Reusable component functions reduce duplication
 * - Shared styling constants for consistency
 * - Extracted helper functions for cleaner logic
 * ============================================================================
 */

import { useState } from 'react';
import { Edit2, Mail, Phone, User as UserIcon, Plus, X, Upload, Trash2, BookOpen, History, ThumbsUp, Star, Bookmark, ExternalLink, Calendar, Award } from 'lucide-react';
import type { User, Resource, TrainingRequest } from '../App';
import { 
  BackgroundDecoration, 
  getCardClass, 
  getInputClass, 
  getBadgeClass,
  getButtonClass,
  getTextClass,
  GRADIENT_PRIMARY,
  EmptyState,
  StarRating,
  CategoryBadge,
  StatusBadge,
  TabButton,
  validateImageFile
} from './shared-utils';

type ProfilePageProps = {
  user: User;
  onUpdateProfile: (user: User) => void;
  darkMode: boolean;
  resources: Resource[];
  bookmarkedResources: string[];
  trainingRequests: TrainingRequest[];
};

export function ProfilePage({ user, onUpdateProfile, darkMode, resources, bookmarkedResources, trainingRequests }: ProfilePageProps) {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);
  const [newHobby, setNewHobby] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'shared' | 'activity' | 'requests'>('overview');

  // ============================================================================
  // COMPUTED DATA - Calculate user statistics from all data sources
  // ============================================================================
  const sharedResources = resources.filter(r => r.authorId === user.id);
  const bookmarked = resources.filter(r => bookmarkedResources.includes(r.id));
  const userRequests = trainingRequests.filter(r => r.requesterId === user.id);
  const userRatings = resources.flatMap(r => r.ratedBy.filter(rating => rating.userId === user.id));
  const votedRequests = trainingRequests.filter(r => r.votedBy.includes(user.id));
  
  const totalRatingsGiven = userRatings.length;
  const averageRatingGiven = totalRatingsGiven > 0 
    ? (userRatings.reduce((sum, r) => sum + r.rating, 0) / totalRatingsGiven).toFixed(1)
    : '0';

  // ============================================================================
  // REUSABLE STYLE CONSTANTS - Prevents repetition and ensures consistency
  // ============================================================================
  const cardClass = getCardClass(darkMode);
  const cardSmallClass = getCardClass(darkMode, 'shadow-lg p-6');
  const inputClass = getInputClass(darkMode);
  const buttonGradient = GRADIENT_PRIMARY;
  const textPrimary = getTextClass(darkMode, 'primary');
  const textSecondary = getTextClass(darkMode, 'secondary');
  const badgeClass = getBadgeClass(darkMode);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  
  /**
   * Handle profile photo upload with JPEG/PNG validation
   */
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type (only JPEG/PNG allowed)
    if (!validateImageFile(file)) {
      alert('Invalid file type! Please upload a JPEG or PNG image.');
      e.target.value = '';
      return;
    }
    
    // Convert to base64 and update state
    const reader = new FileReader();
    reader.onloadend = () => setEditedUser({ ...editedUser, photo: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = () => setEditedUser({ ...editedUser, photo: 'https://via.placeholder.com/150' });
  const handleSave = () => { onUpdateProfile(editedUser); setIsEditing(false); };
  
  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setEditedUser({ ...editedUser, hobbies: [...editedUser.hobbies, newHobby.trim()] });
      setNewHobby('');
    }
  };
  
  const handleRemoveHobby = (index: number) => {
    setEditedUser({ ...editedUser, hobbies: editedUser.hobbies.filter((_, i) => i !== index) });
  };

  // ============================================================================
  // REUSABLE COMPONENT FUNCTIONS - Reduces code duplication
  // ============================================================================
  
  /**
   * Renders a form input field with label
   */
  const FormInput = ({ label, type = 'text', value, onChange, placeholder }: { label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
    <div>
      <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} placeholder={placeholder} />
    </div>
  );

  /**
   * Renders a stat card in the profile header
   */
  const StatCard = ({ value, label }: { value: number; label: string }) => (
    <div className={`p-4 rounded-xl border-2 ${darkMode ? 'bg-gray-700/50 border-cyan-500/20' : 'bg-cyan-50 border-cyan-200'}`}>
      <div className="text-2xl mb-1" style={{ color: 'var(--theme-color)' }}>{value}</div>
      <div className={`text-sm ${textSecondary}`}>{label}</div>
    </div>
  );

  /**
   * Renders an icon-text list item
   */
  const IconListItem = ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
    <li className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      <Icon className="w-4 h-4" style={{ color: 'var(--theme-color)' }} />
      <span>{children}</span>
    </li>
  );

  // ============================================================================
  // TAB CONFIGURATION - Centralized tab definitions
  // ============================================================================
  const tabs = [
    { id: 'overview', label: 'Overview', icon: UserIcon },
    { id: 'shared', label: 'Shared Resources', icon: BookOpen, count: sharedResources.length },
    { id: 'activity', label: 'Activity', icon: History, count: bookmarked.length + totalRatingsGiven + votedRequests.length },
    { id: 'requests', label: 'My Requests', icon: ThumbsUp, count: userRequests.length }
  ];

  // ============================================================================
  // EDIT MODE RENDER
  // ============================================================================
  if (isEditing) {
    return (
      <div className={`min-h-[calc(100vh-4rem)] py-12 px-4 transition-colors duration-300 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50'}`}>
        <BackgroundDecoration />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className={cardClass}>
            <h2 className={`mb-8 text-2xl ${textPrimary}`}>Edit Profile</h2>
            <div className="space-y-6">
              {/* Profile Photo Section */}
              <div>
                <label className={`block mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Profile Photo *</label>
                <div className="flex items-center gap-4">
                  <img src={editedUser.photo} alt="Profile" className="w-24 h-24 rounded-2xl object-cover border-4 border-cyan-500/30 shadow-xl" />
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 text-white shadow-md" style={{ background: buttonGradient }}>
                      <Upload className="w-4 h-4" />
                      <span>Upload New Photo</span>
                      <input type="file" accept="image/jpeg,image/jpg,image/png" onChange={handlePhotoUpload} className="hidden" aria-label="Upload profile photo (JPEG or PNG only)" />
                    </label>
                    <button type="button" onClick={handleDeletePhoto} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${darkMode ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Photo</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <FormInput label="Full Name" value={editedUser.fullName} onChange={(v) => setEditedUser({ ...editedUser, fullName: v })} />
              <FormInput label="Email" type="email" value={editedUser.email} onChange={(v) => setEditedUser({ ...editedUser, email: v })} />
              <FormInput label="Pronouns" value={editedUser.pronouns || ''} onChange={(v) => setEditedUser({ ...editedUser, pronouns: v })} placeholder="e.g., she/her, he/him, they/them" />
              <FormInput label="Phone" type="tel" value={editedUser.phone || ''} onChange={(v) => setEditedUser({ ...editedUser, phone: v })} placeholder="+1 (555) 000-0000" />

              {/* Hobbies Section */}
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Hobbies & Interests</label>
                <div className="flex gap-2 mb-3">
                  <input type="text" value={newHobby} onChange={(e) => setNewHobby(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHobby())} className={inputClass} placeholder="Add a hobby" />
                  <button type="button" onClick={handleAddHobby} className="px-4 py-2 rounded-xl text-white hover:scale-105 transition-all" style={{ background: buttonGradient }}>
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editedUser.hobbies.map((hobby, index) => (
                    <span key={index} className={badgeClass}>
                      {hobby}
                      <button type="button" onClick={() => handleRemoveHobby(index)} className="ml-2 hover:opacity-70">
                        <X className="w-4 h-4 inline" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button onClick={handleSave} className="flex-1 py-3 rounded-xl text-white transition-all hover:scale-105 shadow-lg" style={{ background: buttonGradient }}>Save Changes</button>
                <button onClick={() => { setEditedUser(user); setIsEditing(false); }} className={`flex-1 py-3 rounded-xl border-2 transition-all ${darkMode ? 'border-cyan-500/30 text-gray-300 hover:bg-gray-700' : 'border-cyan-200 text-gray-700 hover:bg-gray-100'}`}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // VIEW MODE RENDER
  // ============================================================================
  return (
    <div className={`min-h-[calc(100vh-4rem)] py-12 px-4 transition-colors duration-300 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50'}`}>
      <BackgroundDecoration />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ======================================================================
            PROFILE HEADER - Shows user info, stats, and edit button
            ====================================================================== */}
        <div className={cardClass + ' mb-8'}>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <img src={user.photo} alt={user.fullName} className="w-32 h-32 rounded-2xl object-cover border-4 border-cyan-500/30 shadow-xl" />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className={`text-3xl mb-2 ${textPrimary}`}>{user.fullName}</h1>
                  {user.pronouns && <p className={`text-lg mb-3 ${textSecondary}`}>({user.pronouns})</p>}
                </div>
                <button onClick={() => setIsEditing(true)} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-6">
                <div className={`flex items-center gap-3 ${textSecondary}`}>
                  <Mail className="w-5 h-5" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className={`flex items-center gap-3 ${textSecondary}`}>
                    <Phone className="w-5 h-5" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard value={sharedResources.length} label="Resources Shared" />
                <StatCard value={bookmarked.length} label="Bookmarks" />
                <StatCard value={userRequests.length} label="Requests Made" />
                <StatCard value={totalRatingsGiven} label="Ratings Given" />
              </div>
            </div>
          </div>

          {/* Hobbies Display */}
          {user.hobbies.length > 0 && (
            <div className="mt-6 pt-6 border-t-2" style={{ borderColor: darkMode ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.3)' }}>
              <h3 className={`mb-3 ${textPrimary}`}>Hobbies & Interests</h3>
              <div className="flex flex-wrap gap-2">
                {user.hobbies.map((hobby, index) => (
                  <span key={index} className={badgeClass}>{hobby}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ======================================================================
            TAB NAVIGATION - Switches between different profile sections
            ====================================================================== */}
        <div className={`backdrop-blur-md rounded-2xl shadow-lg p-2 mb-8 border-2 ${darkMode ? 'bg-gray-800/90 border-cyan-500/30' : 'bg-white/90 border-cyan-200/50'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} 
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'text-white shadow-lg' : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  style={isActive ? { background: buttonGradient } : {}}>
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>{tab.count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================================
            TAB CONTENT - Displays different sections based on active tab
            ====================================================================== */}
        
        {/* OVERVIEW TAB - Summary statistics and achievements */}
        {activeTab === 'overview' && (
          <div className={cardSmallClass}>
            <h2 className={`text-2xl mb-6 flex items-center gap-2 ${textPrimary}`}>
              <Award className="w-6 h-6" style={{ color: 'var(--theme-color)' }} />
              Profile Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className={`mb-3 ${textPrimary}`}>Community Contributions</h3>
                <ul className="space-y-2">
                  <IconListItem icon={BookOpen}>{sharedResources.length} resources shared with community</IconListItem>
                  <IconListItem icon={Star}>{totalRatingsGiven} ratings given (avg: {averageRatingGiven}★)</IconListItem>
                  <IconListItem icon={ThumbsUp}>{votedRequests.length} training requests supported</IconListItem>
                </ul>
              </div>
              <div>
                <h3 className={`mb-3 ${textPrimary}`}>Personal Activity</h3>
                <ul className="space-y-2">
                  <IconListItem icon={Bookmark}>{bookmarked.length} resources bookmarked</IconListItem>
                  <IconListItem icon={ThumbsUp}>{userRequests.length} training requests made</IconListItem>
                  <IconListItem icon={History}>Member since {new Date().getFullYear()}</IconListItem>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SHARED RESOURCES TAB - All resources created by user */}
        {activeTab === 'shared' && (
          sharedResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sharedResources.map((resource) => (
                <div key={resource.id} className={`${cardSmallClass} transition-all hover:scale-105`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className={badgeClass}>{resource.category}</span>
                    <Calendar className={`w-4 h-4 ${textSecondary}`} />
                  </div>
                  <h3 className={`mb-2 ${textPrimary}`}>{resource.title}</h3>
                  <p className={`mb-4 text-sm line-clamp-2 ${textSecondary}`}>{resource.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" style={{ color: 'var(--theme-color)' }} />
                        <span className={`text-sm ${textSecondary}`}>{resource.upvotes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className={`text-sm ${textSecondary}`}>{resource.rating > 0 ? resource.rating.toFixed(1) : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white transition-all hover:scale-105 shadow-lg" style={{ background: buttonGradient }}>
                    <span>View Resource</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={BookOpen} title="No resources shared yet" subtitle="Share your knowledge with the community!" />
          )
        )}

        {/* ACTIVITY TAB - Bookmarks, ratings, and votes */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            {/* Bookmarked Resources Section */}
            <div className={cardSmallClass}>
              <h3 className={`text-xl mb-4 flex items-center gap-2 ${textPrimary}`}>
                <Bookmark className="w-5 h-5" style={{ color: 'var(--theme-color)' }} />
                Bookmarked Resources ({bookmarked.length})
              </h3>
              {bookmarked.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookmarked.map((resource) => (
                    <div key={resource.id} className={`p-4 rounded-xl border transition-all ${darkMode ? 'bg-gray-700/50 border-gray-600 hover:border-cyan-500' : 'bg-white border-gray-200 hover:border-cyan-400'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <span className={`text-sm px-2 py-1 rounded ${darkMode ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-100 text-cyan-700'}`}>{resource.category}</span>
                        <Bookmark className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      </div>
                      <h4 className={`mb-2 ${textPrimary}`}>{resource.title}</h4>
                      <p className={`text-sm line-clamp-1 ${textSecondary}`}>{resource.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>No bookmarks yet</p>
              )}
            </div>

            {/* Ratings Given Section */}
            <div className={cardSmallClass}>
              <h3 className={`text-xl mb-4 flex items-center gap-2 ${textPrimary}`}>
                <Star className="w-5 h-5" style={{ color: 'var(--theme-color)' }} />
                Ratings Given ({totalRatingsGiven})
              </h3>
              {totalRatingsGiven > 0 ? (
                <div className="space-y-3">
                  {resources.filter(r => r.ratedBy.some(rating => rating.userId === user.id)).map((resource) => {
                    const userRating = resource.ratedBy.find(r => r.userId === user.id);
                    return (
                      <div key={resource.id} className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-white border-gray-200'}`}>
                        <div className="flex-1">
                          <h4 className={`mb-1 ${textPrimary}`}>{resource.title}</h4>
                          <p className={`text-sm ${textSecondary}`}>by {resource.authorName}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < (userRating?.rating || 0) ? 'fill-yellow-400 text-yellow-400' : darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>No ratings given yet</p>
              )}
            </div>

            {/* Voted Requests Section */}
            <div className={cardSmallClass}>
              <h3 className={`text-xl mb-4 flex items-center gap-2 ${textPrimary}`}>
                <ThumbsUp className="w-5 h-5" style={{ color: 'var(--theme-color)' }} />
                Supported Requests ({votedRequests.length})
              </h3>
              {votedRequests.length > 0 ? (
                <div className="space-y-3">
                  {votedRequests.map((request) => (
                    <div key={request.id} className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-white border-gray-200'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={badgeClass}>👍 {request.votes}</div>
                        <h4 className={`flex-1 ${textPrimary}`}>{request.title}</h4>
                      </div>
                      <p className={`text-sm ${textSecondary}`}>by {request.requesterName}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>No votes cast yet</p>
              )}
            </div>
          </div>
        )}

        {/* MY REQUESTS TAB - Training requests created by user */}
        {activeTab === 'requests' && (
          userRequests.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {userRequests.map((request) => (
                <div key={request.id} className={cardSmallClass}>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex sm:flex-col items-center gap-2">
                      <div className={`p-4 rounded-xl border-2 ${darkMode ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border-cyan-200'}`}>
                        <ThumbsUp className="w-6 h-6" />
                      </div>
                      <span className={`text-xl ${textPrimary}`}>{request.votes}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className={`text-xl ${textPrimary}`}>{request.title}</h3>
                        <span className={`px-3 py-1 rounded-lg text-xs uppercase tracking-wide border ${
                          request.status === 'open' ? darkMode ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300'
                          : request.status === 'fulfilled' ? darkMode ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300'
                          : darkMode ? 'bg-gray-500/20 text-gray-300 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}>{request.status}</span>
                      </div>
                      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{request.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${darkMode ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' : 'border-cyan-200 bg-cyan-50 text-cyan-700'}`}>
                          🏷️ {request.category}
                        </span>
                        <span className={`flex items-center gap-2 ${textSecondary}`}>
                          <Calendar className="w-4 h-4" />
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={ThumbsUp} title="No training requests yet" subtitle="Request skills you'd like to learn!" />
          )
        )}
      </div>
    </div>
  );
}