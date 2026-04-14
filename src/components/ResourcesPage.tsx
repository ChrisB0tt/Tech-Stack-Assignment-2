/**
 * ============================================================================
 * UNIFIED RESOURCES PAGE WITH TABS
 * ============================================================================
 * 
 * This component integrates all resource-related features into one page:
 * - All Resources: Browse all community resources
 * - My Bookmarks: View saved/bookmarked resources
 * - Training Requests: Request skills and vote on others' requests
 * - AI Recommendations: Get personalized AI-powered suggestions
 * 
 * ============================================================================
 */

import { useState } from 'react';
import { Search, Plus, ExternalLink, Calendar, User as UserIcon, X, Bookmark, ThumbsUp, Sparkles, TrendingUp, Target, Lightbulb, Star, BookMarked, Zap } from 'lucide-react';
import type { Resource, User, TrainingRequest } from '../App';

type ResourcesPageProps = {
  resources: Resource[];
  currentUser: User | null;
  onAddResource: (resource: Omit<Resource, 'id' | 'authorId' | 'authorName' | 'createdAt' | 'upvotes' | 'upvotedBy' | 'rating' | 'ratedBy' | 'comments'>) => void;
  onNavigateToAuth: () => void;
  onUpdateResources: (resources: Resource[]) => void;
  bookmarkedResources: string[];
  onToggleBookmark: (resourceId: string) => void;
  trainingRequests: TrainingRequest[];
  onAddRequest: (request: Omit<TrainingRequest, 'id' | 'requesterId' | 'requesterName' | 'createdAt' | 'votes' | 'votedBy' | 'status'>) => void;
  onVoteRequest: (requestId: string) => void;
  darkMode: boolean;
};

export function ResourcesPage({ 
  resources, 
  currentUser, 
  onAddResource, 
  onNavigateToAuth, 
  bookmarkedResources, 
  onToggleBookmark,
  trainingRequests,
  onAddRequest,
  onVoteRequest,
  darkMode 
}: ResourcesPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'bookmarks' | 'requests' | 'ai'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'fulfilled' | 'closed'>('all');
  const [sortBy, setSortBy] = useState<'votes' | 'date'>('votes');
  const [aiCategory, setAiCategory] = useState<'all' | 'personalized' | 'trending' | 'tools'>('all');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    link: ''
  });

  const [requestFormData, setRequestFormData] = useState({
    title: '',
    description: '',
    category: ''
  });

  const categories = ['All', 'Technology', 'Arts', 'Lifestyle', 'Business', 'Health', 'Education', 'AI Tools'];

  // Filtered resources for "All Resources" tab
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Bookmarked resources
  const bookmarked = resources.filter(r => bookmarkedResources.includes(r.id));

  // Training requests filtering
  const filteredRequests = trainingRequests
    .filter(request => statusFilter === 'all' || request.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'votes') return b.votes - a.votes;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  // AI Recommendations logic
  const getPersonalizedRecommendations = () => {
    if (!currentUser || !currentUser.hobbies || currentUser.hobbies.length === 0) return [];
    return resources.filter(resource => {
      const hobbyMatch = currentUser.hobbies.some(hobby => 
        resource.title.toLowerCase().includes(hobby.toLowerCase()) ||
        resource.description.toLowerCase().includes(hobby.toLowerCase()) ||
        resource.category.toLowerCase().includes(hobby.toLowerCase())
      );
      return hobbyMatch;
    }).slice(0, 6);
  };

  const getTrendingResources = () => {
    return [...resources]
      .sort((a, b) => {
        const scoreA = a.rating * 10 + a.upvotes;
        const scoreB = b.rating * 10 + b.upvotes;
        return scoreB - scoreA;
      })
      .slice(0, 6);
  };

  const getAITools = () => [
    {
      title: 'ChatGPT - AI Conversation Assistant',
      description: 'Advanced AI language model for conversations, writing, coding, and problem-solving',
      category: 'AI Tools',
      link: 'https://chat.openai.com',
      icon: '🤖',
      tags: ['Writing', 'Coding', 'Learning']
    },
    {
      title: 'Midjourney - AI Image Generation',
      description: 'Create stunning artwork and images from text descriptions using AI',
      category: 'AI Tools',
      link: 'https://midjourney.com',
      icon: '🎨',
      tags: ['Art', 'Design', 'Creativity']
    },
    {
      title: 'GitHub Copilot - AI Code Assistant',
      description: 'AI-powered code completion and suggestions for faster development',
      category: 'AI Tools',
      link: 'https://github.com/features/copilot',
      icon: '💻',
      tags: ['Coding', 'Productivity', 'Development']
    },
    {
      title: 'Grammarly - AI Writing Assistant',
      description: 'Improve your writing with AI-powered grammar, spelling, and style suggestions',
      category: 'AI Tools',
      link: 'https://grammarly.com',
      icon: '✍️',
      tags: ['Writing', 'Communication', 'Productivity']
    },
    {
      title: 'Notion AI - Smart Workspace',
      description: 'AI-enhanced note-taking and project management platform',
      category: 'AI Tools',
      link: 'https://notion.so',
      icon: '📝',
      tags: ['Productivity', 'Organization', 'Collaboration']
    },
    {
      title: 'Runway ML - AI Video Editing',
      description: 'Create and edit videos using AI-powered tools',
      category: 'AI Tools',
      link: 'https://runwayml.com',
      icon: '🎬',
      tags: ['Video', 'Editing', 'Creativity']
    }
  ];

  const getSkillSuggestions = () => {
    if (!currentUser || !currentUser.hobbies || currentUser.hobbies.length === 0) {
      return [
        { skill: 'Web Development', reason: 'High demand skill in 2024', icon: '🌐' },
        { skill: 'Data Science', reason: 'Growing field with AI integration', icon: '📊' },
        { skill: 'Digital Marketing', reason: 'Essential for modern businesses', icon: '📱' }
      ];
    }

    const suggestions = [];
    const hobbies = currentUser.hobbies.map(h => h.toLowerCase());

    if (hobbies.some(h => h.includes('programming') || h.includes('coding') || h.includes('tech'))) {
      suggestions.push({ skill: 'AI & Machine Learning', reason: 'Complement your programming skills', icon: '🤖' });
      suggestions.push({ skill: 'Cloud Computing', reason: 'Deploy your applications at scale', icon: '☁️' });
    }

    if (hobbies.some(h => h.includes('art') || h.includes('design') || h.includes('creative'))) {
      suggestions.push({ skill: 'UI/UX Design', reason: 'Enhance your design portfolio', icon: '🎨' });
      suggestions.push({ skill: '3D Modeling', reason: 'Expand your creative toolkit', icon: '🎭' });
    }

    if (hobbies.some(h => h.includes('writing') || h.includes('content') || h.includes('blog'))) {
      suggestions.push({ skill: 'SEO & Content Marketing', reason: 'Reach larger audiences', icon: '📈' });
      suggestions.push({ skill: 'Copywriting', reason: 'Monetize your writing skills', icon: '✍️' });
    }

    if (suggestions.length === 0) {
      suggestions.push(
        { skill: 'Python Programming', reason: 'Versatile and beginner-friendly', icon: '🐍' },
        { skill: 'Public Speaking', reason: 'Universal professional skill', icon: '🎤' },
        { skill: 'Financial Literacy', reason: 'Manage your finances better', icon: '💰' }
      );
    }

    return suggestions.slice(0, 3);
  };

  const personalizedRecs = getPersonalizedRecommendations();
  const trendingRecs = getTrendingResources();
  const aiTools = getAITools();
  const skillSuggestions = getSkillSuggestions();

  const aiDisplayResources = aiCategory === 'personalized' ? personalizedRecs :
                             aiCategory === 'trending' ? trendingRecs :
                             aiCategory === 'tools' ? [] :
                             [...personalizedRecs, ...trendingRecs].slice(0, 12);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onNavigateToAuth();
      return;
    }
    onAddResource(formData);
    setFormData({ title: '', description: '', category: '', link: '' });
    setShowAddForm(false);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onNavigateToAuth();
      return;
    }
    onAddRequest(requestFormData);
    setRequestFormData({ title: '', description: '', category: '' });
    setShowRequestForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return darkMode ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300';
      case 'fulfilled': return darkMode ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300';
      case 'closed': return darkMode ? 'bg-gray-500/20 text-gray-300 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-300';
      default: return '';
    }
  };

  const tabs = [
    { id: 'all', label: 'All Resources', icon: BookMarked, count: resources.length },
    { id: 'bookmarks', label: 'My Bookmarks', icon: Bookmark, count: bookmarkedResources.length },
    { id: 'requests', label: 'Training Requests', icon: ThumbsUp, count: trainingRequests.length },
    { id: 'ai', label: 'AI Recommendations', icon: Sparkles, count: null }
  ];

  return (
    <div className={`min-h-[calc(100vh-4rem)] py-12 px-4 transition-colors duration-300 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50'}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${darkMode ? 'bg-cyan-500' : 'bg-cyan-300'}`}></div>
        <div className={`absolute bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000 ${darkMode ? 'bg-blue-500' : 'bg-blue-300'}`}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className={`mb-2 text-4xl transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Browse Resources
            <span className="inline-block ml-3 animate-bounce">📚</span>
          </h1>
          <p className={`text-lg transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover, save, request, and get AI-powered recommendations
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`backdrop-blur-md rounded-2xl shadow-lg p-2 mb-8 border-2 ${darkMode ? 'bg-gray-800/90 border-cyan-500/30' : 'bg-white/90 border-cyan-200/50'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-white shadow-lg'
                      : darkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={activeTab === tab.id ? { background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' } : {}}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  {tab.count !== null && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-white/20'
                        : darkMode
                          ? 'bg-gray-700'
                          : 'bg-gray-200'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {/* ALL RESOURCES TAB */}
        {activeTab === 'all' && (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => {
                  if (!currentUser) onNavigateToAuth();
                  else setShowAddForm(true);
                }}
                className="relative flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all duration-300 hover:scale-105 shadow-lg overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Add Resource</span>
              </button>
            </div>

            {/* Search and Filter */}
            <div className={`backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border-2 ${darkMode ? 'bg-gray-800/90 border-cyan-500/30' : 'bg-white/90 border-cyan-200/50'}`}>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative group">
                  <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${darkMode ? 'bg-gray-700/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-500' : 'bg-white border-cyan-200 focus:border-cyan-400'}`}
                    placeholder="Search resources..."
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                        selectedCategory === category
                          ? 'text-white shadow-lg'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      style={selectedCategory === category ? { background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' } : {}}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Resources Grid */}
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map(resource => (
                  <div
                    key={resource.id}
                    className={`backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 hover:scale-105 group ${darkMode ? 'bg-gray-800/80 border-gray-700 hover:border-cyan-500' : 'bg-white/80 border-white hover:border-cyan-300'}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1 rounded-lg text-sm border ${darkMode ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border-cyan-200'}`}>
                        {resource.category}
                      </span>
                      <button
                        onClick={() => onToggleBookmark(resource.id)}
                        className={`p-2 rounded-lg transition-all ${bookmarkedResources.includes(resource.id) ? 'scale-110' : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      >
                        <Bookmark className={`w-5 h-5 transition-colors ${bookmarkedResources.includes(resource.id) ? 'fill-yellow-500 text-yellow-500' : darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </button>
                    </div>
                    <h3 className={`mb-2 text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{resource.title}</h3>
                    <p className={`mb-4 text-sm line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{resource.description}</p>
                    <div className={`flex items-center gap-2 text-xs mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      <UserIcon className="w-3 h-3" />
                      <span>{resource.authorName}</span>
                      <span>•</span>
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
                    </div>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white px-4 py-2 rounded-xl hover:scale-105 transition-all w-full justify-center shadow-lg"
                      style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}
                    >
                      <span>View Resource</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-20 rounded-2xl border-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-100'}`}>
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No resources found</p>
              </div>
            )}
          </>
        )}

        {/* BOOKMARKS TAB */}
        {activeTab === 'bookmarks' && (
          <>
            {bookmarked.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarked.map(resource => (
                  <div
                    key={resource.id}
                    className={`backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 hover:scale-105 transition-all duration-300 ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white'}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1 rounded-lg text-sm border ${darkMode ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border-cyan-200'}`}>
                        {resource.category}
                      </span>
                      <button
                        onClick={() => onToggleBookmark(resource.id)}
                        className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      >
                        <Bookmark className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      </button>
                    </div>
                    <h3 className={`mb-2 text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{resource.title}</h3>
                    <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{resource.description}</p>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white px-4 py-2 rounded-xl hover:scale-105 transition-all w-full justify-center shadow-lg"
                      style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}
                    >
                      <span>View Resource</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-20 rounded-2xl border-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-100'}`}>
                <Bookmark className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-lg mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No bookmarks yet</p>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {currentUser ? 'Bookmark resources to save them for later' : 'Login to bookmark resources'}
                </p>
              </div>
            )}
          </>
        )}

        {/* TRAINING REQUESTS TAB */}
        {activeTab === 'requests' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2 flex-wrap">
                {['all', 'open', 'fulfilled', 'closed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status as any)}
                    className={`px-4 py-2 rounded-xl capitalize transition-all ${
                      statusFilter === status
                        ? 'text-white'
                        : darkMode
                          ? 'text-gray-300 border border-cyan-500/30 hover:border-cyan-500'
                          : 'text-gray-700 border border-cyan-200 hover:border-cyan-400'
                    }`}
                    style={statusFilter === status ? { background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' } : {}}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  if (!currentUser) onNavigateToAuth();
                  else setShowRequestForm(true);
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:scale-105 shadow-lg overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                <span className="hidden sm:inline">Request Training</span>
                <span className="sm:hidden">Request</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => {
                  const hasVoted = currentUser && request.votedBy.includes(currentUser.id);
                  return (
                    <div
                      key={request.id}
                      className={`backdrop-blur-md rounded-2xl shadow-lg p-6 border-2 transition-all hover:shadow-xl ${darkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-white/50'}`}
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex sm:flex-col items-center gap-2">
                          <button
                            onClick={() => {
                              if (!currentUser) onNavigateToAuth();
                              else onVoteRequest(request.id);
                            }}
                            className={`p-4 rounded-xl transition-all hover:scale-110 border-2 ${
                              hasVoted
                                ? 'text-white border-transparent shadow-lg'
                                : darkMode
                                  ? 'text-gray-400 border-cyan-500/30 hover:border-cyan-500'
                                  : 'text-gray-600 border-cyan-200 hover:border-cyan-400'
                            }`}
                            style={hasVoted ? { background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' } : {}}
                          >
                            <ThumbsUp className={`w-6 h-6 ${hasVoted ? 'fill-current' : ''}`} />
                          </button>
                          <span className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>{request.votes}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>{request.title}</h3>
                            <span className={`px-3 py-1 rounded-lg text-xs uppercase tracking-wide border ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </div>
                          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{request.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${darkMode ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' : 'border-cyan-200 bg-cyan-50 text-cyan-700'}`}>
                              🏷️ {request.category}
                            </span>
                            <span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              <UserIcon className="w-4 h-4" />
                              {request.requesterName}
                            </span>
                            <span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              <Calendar className="w-4 h-4" />
                              {new Date(request.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={`p-12 rounded-2xl border-2 text-center ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'}`}>
                  <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No training requests found</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* AI RECOMMENDATIONS TAB */}
        {activeTab === 'ai' && (
          <>
            <div className="mb-8 flex flex-wrap gap-3 justify-center">
              {['all', 'personalized', 'trending', 'tools'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAiCategory(cat as any)}
                  className={`px-6 py-3 rounded-xl capitalize transition-all flex items-center gap-2 ${
                    aiCategory === cat
                      ? 'text-white shadow-lg'
                      : darkMode
                        ? 'text-gray-300 border border-cyan-500/30 hover:border-cyan-500'
                        : 'text-gray-700 border border-cyan-200 hover:border-cyan-400'
                  }`}
                  style={aiCategory === cat ? { background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' } : {}}
                >
                  {cat === 'all' && <Sparkles className="w-4 h-4" />}
                  {cat === 'personalized' && <Target className="w-4 h-4" />}
                  {cat === 'trending' && <TrendingUp className="w-4 h-4" />}
                  {cat === 'tools' && <Lightbulb className="w-4 h-4" />}
                  {cat.replace('-', ' ')}
                </button>
              ))}
            </div>

            {currentUser && aiCategory !== 'tools' && (
              <div className="mb-12">
                <h2 className={`text-2xl mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Lightbulb className="w-6 h-6" style={{ color: 'var(--theme-color)' }} />
                  Suggested Skills for You
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {skillSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`backdrop-blur-md rounded-2xl shadow-lg p-6 border-2 transition-all hover:shadow-xl hover:scale-105 ${darkMode ? 'bg-gradient-to-br from-gray-800/90 to-gray-800/70 border-gray-700' : 'bg-gradient-to-br from-white/90 to-white/70 border-white/50'}`}
                    >
                      <div className="text-4xl mb-3">{suggestion.icon}</div>
                      <h3 className={`text-xl mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{suggestion.skill}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{suggestion.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aiCategory === 'tools' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiTools.map((tool, index) => (
                  <div
                    key={index}
                    className={`backdrop-blur-md rounded-2xl shadow-lg p-6 border-2 transition-all hover:shadow-xl hover:scale-105 ${darkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-white/50'}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{tool.icon}</div>
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      >
                        <ExternalLink className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      </a>
                    </div>
                    <h3 className={`text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tool.title}</h3>
                    <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tool.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`px-3 py-1 rounded-lg text-xs ${darkMode ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border border-cyan-200'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : aiDisplayResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiDisplayResources.map((resource) => (
                  <div
                    key={resource.id}
                    className={`backdrop-blur-md rounded-2xl shadow-lg p-6 border-2 transition-all hover:shadow-xl hover:scale-105 ${darkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-white/50'}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`px-3 py-1 rounded-lg text-xs ${darkMode ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border border-cyan-200'}`}>
                        {resource.category}
                      </span>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      >
                        <ExternalLink className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      </a>
                    </div>
                    <h3 className={`text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{resource.title}</h3>
                    <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {resource.rating > 0 ? resource.rating.toFixed(1) : 'No ratings'}
                        </span>
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        👍 {resource.upvotes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-12 rounded-2xl border-2 text-center ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'}`}>
                <Sparkles className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-xl mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentUser
                    ? 'No personalized recommendations yet. Add some hobbies in your profile!'
                    : 'Login to see personalized recommendations'}
                </p>
              </div>
            )}
          </>
        )}

        {/* Add Resource Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={`rounded-2xl shadow-2xl max-w-md w-full p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Resource</h2>
                <button onClick={() => setShowAddForm(false)} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all focus:outline-none ${darkMode ? 'bg-gray-700/50 border-cyan-500/30 text-white placeholder-gray-500 focus:border-cyan-500 focus:bg-gray-700' : 'bg-white border-cyan-200 text-gray-900 focus:border-cyan-400'}`}
                    placeholder="Resource title"
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all focus:outline-none ${darkMode ? 'bg-gray-700/50 border-cyan-500/30 text-white placeholder-gray-500 focus:border-cyan-500 focus:bg-gray-700' : 'bg-white border-cyan-200 text-gray-900 focus:border-cyan-400'}`}
                    placeholder="Brief description"
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all focus:outline-none ${darkMode ? 'bg-gray-700/50 border-cyan-500/30 text-white focus:border-cyan-500 focus:bg-gray-700' : 'bg-white border-cyan-200 text-gray-900 focus:border-cyan-400'}`}
                  >
                    <option value="">Select a category</option>
                    {categories.filter(cat => cat !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Link *</label>
                  <input
                    type="url"
                    required
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all focus:outline-none ${darkMode ? 'bg-gray-700/50 border-cyan-500/30 text-white placeholder-gray-500 focus:border-cyan-500 focus:bg-gray-700' : 'bg-white border-cyan-200 text-gray-900 focus:border-cyan-400'}`}
                    placeholder="https://example.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-white transition-all hover:scale-105 shadow-xl"
                  style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}
                >
                  Add Resource
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add Training Request Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={`rounded-2xl shadow-2xl max-w-md w-full p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Request Training</h2>
                <button onClick={() => setShowRequestForm(false)} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>
              <form onSubmit={handleRequestSubmit} className="space-y-5">
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>What do you want to learn? *</label>
                  <input
                    type="text"
                    required
                    value={requestFormData.title}
                    onChange={(e) => setRequestFormData({ ...requestFormData, title: e.target.value })}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all focus:outline-none ${darkMode ? 'bg-gray-700/50 border-cyan-500/30 text-white placeholder-gray-500 focus:border-cyan-500 focus:bg-gray-700' : 'bg-white border-cyan-200 text-gray-900 focus:border-cyan-400'}`}
                    placeholder="e.g., Advanced Python for Data Science"
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description *</label>
                  <textarea
                    required
                    value={requestFormData.description}
                    onChange={(e) => setRequestFormData({ ...requestFormData, description: e.target.value })}
                    rows={4}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all focus:outline-none ${darkMode ? 'bg-gray-700/50 border-cyan-500/30 text-white placeholder-gray-500 focus:border-cyan-500 focus:bg-gray-700' : 'bg-white border-cyan-200 text-gray-900 focus:border-cyan-400'}`}
                    placeholder="Describe what you're looking for..."
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category *</label>
                  <select
                    required
                    value={requestFormData.category}
                    onChange={(e) => setRequestFormData({ ...requestFormData, category: e.target.value })}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all focus:outline-none ${darkMode ? 'bg-gray-700/50 border-cyan-500/30 text-white focus:border-cyan-500 focus:bg-gray-700' : 'bg-white border-cyan-200 text-gray-900 focus:border-cyan-400'}`}
                  >
                    <option value="">Select a category</option>
                    {categories.filter(cat => cat !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-white transition-all hover:scale-105 shadow-xl"
                  style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
