/**
 * ============================================================================
 * AUTH PAGE COMPONENT - Login & Signup (OPTIMIZED)
 * ============================================================================
 * 
 * FEATURES:
 * - Toggle between signup and login modes
 * - Profile photo upload with JPEG/PNG validation
 * - Form validation for required fields
 * - Responsive glassmorphism design
 * 
 * OPTIMIZATION:
 * - Uses shared utilities for styling consistency
 * - Reduced code duplication
 * - Centralized form field generation
 * ============================================================================
 */

import { useState } from 'react';
import { Upload } from 'lucide-react';
import type { User } from '../App';
import { 
  BackgroundDecoration, 
  getCardClass, 
  getInputClass, 
  GRADIENT_PRIMARY, 
  PRONOUN_OPTIONS,
  validateImageFile 
} from './shared-utils';

type AuthPageProps = {
  onLogin: (user: User) => void;
  darkMode: boolean;
};

export function AuthPage({ onLogin, darkMode }: AuthPageProps) {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [isSignUp, setIsSignUp] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    pronouns: '',
    phone: '',
  });

  // ============================================================================
  // REUSABLE STYLES - Eliminates repetition
  // ============================================================================
  const inputClass = getInputClass(darkMode);
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const textLabel = darkMode ? 'text-gray-300' : 'text-gray-700';

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  
  /**
   * Handle profile photo upload with JPEG/PNG validation
   */
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!validateImageFile(file)) {
      alert('Invalid file type! Please upload a JPEG or PNG image.');
      e.target.value = '';
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  /**
   * Handle form submission with validation
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate photo upload for signup
    if (isSignUp && !photoPreview) {
      alert('Please upload a profile photo');
      return;
    }
    
    // Create user object
    const user: User = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      pronouns: formData.pronouns || undefined,
      phone: formData.phone || undefined,
      photo: photoPreview || 'https://via.placeholder.com/150',
      hobbies: []
    };

    onLogin(user);
  };

  /**
   * Update form field value
   */
  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // ============================================================================
  // REUSABLE COMPONENTS - Reduces duplication
  // ============================================================================
  
  /**
   * Render form input field
   */
  const InputField = ({ 
    id, 
    label, 
    type = 'text', 
    required = false, 
    placeholder = '' 
  }: { 
    id: keyof typeof formData; 
    label: string; 
    type?: string; 
    required?: boolean; 
    placeholder?: string;
  }) => (
    <div>
      <label htmlFor={id} className={`block mb-2 text-sm ${textLabel}`}>
        {label} {required && '*'}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={formData[id]}
        onChange={(e) => updateField(id, e.target.value)}
        className={inputClass}
        placeholder={placeholder}
      />
    </div>
  );

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className={`min-h-[calc(100vh-4rem)] py-12 px-4 transition-colors duration-300 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50'}`}>
      {/* Background Animation */}
      <BackgroundDecoration darkMode={darkMode} />
      
      <div className="max-w-md mx-auto relative z-10">
        <div className={getCardClass(darkMode, 'large')}>
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-cyan-500/40 transform hover:scale-110 transition-transform duration-300" 
              style={{ background: GRADIENT_PRIMARY }}>
              <span className="text-white text-3xl">SS</span>
            </div>
            <h2 className={`mb-3 text-3xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className={textSecondary}>
              {isSignUp
                ? 'Join our community and start sharing skills'
                : 'Login to access your profile and resources'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Photo Upload (Signup Only) */}
            {isSignUp && (
              <>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Profile preview"
                        className="w-24 h-24 rounded-2xl object-cover border-4 border-cyan-500/30 shadow-xl"
                      />
                    ) : (
                      <div className={`w-24 h-24 rounded-2xl flex items-center justify-center border-2 border-dashed transition-all duration-300 ${darkMode ? 'border-cyan-500/30 bg-gray-700/50' : 'border-cyan-200 bg-cyan-50/50'}`}>
                        <Upload className={`w-8 h-8 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      </div>
                    )}
                    <label className="absolute -bottom-2 -right-2 p-2.5 rounded-xl cursor-pointer shadow-lg hover:scale-110 transition-all duration-200 border-2" 
                      style={{ background: GRADIENT_PRIMARY, borderColor: darkMode ? '#1f2937' : '#ffffff' }}>
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        aria-label="Upload profile photo (JPEG or PNG only)"
                      />
                    </label>
                  </div>
                  <p className={`mt-3 text-sm ${textSecondary}`}>
                    Upload Profile Photo *
                  </p>
                </div>

                {/* Signup Fields */}
                <InputField id="fullName" label="Full Name" required placeholder="Enter your full name" />
              </>
            )}

            {/* Common Fields (Email & Password) */}
            <InputField id="email" label="Email Address" type="email" required placeholder="you@example.com" />
            <InputField id="password" label="Password" type="password" required placeholder="Enter your password" />

            {/* Optional Signup Fields */}
            {isSignUp && (
              <>
                {/* Pronouns Dropdown */}
                <div>
                  <label htmlFor="pronouns" className={`block mb-2 text-sm ${textLabel}`}>
                    Pronouns (Optional)
                  </label>
                  <select
                    id="pronouns"
                    value={formData.pronouns}
                    onChange={(e) => updateField('pronouns', e.target.value)}
                    className={inputClass}
                  >
                    {PRONOUN_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <InputField id="phone" label="Phone Number (Optional)" type="tel" placeholder="+1 (555) 000-0000" />
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full py-4 rounded-xl text-white transition-all duration-300 hover:scale-105 shadow-xl overflow-hidden border-2 border-transparent hover:border-cyan-300"
              style={{ background: GRADIENT_PRIMARY }}
            >
              <div className="absolute inset-[2px] rounded-xl bg-gradient-to-br from-white/10 to-transparent"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSignUp ? 'Create Account' : 'Login'}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className={`text-sm transition-colors ${darkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'}`}
            >
              {isSignUp
                ? 'Already have an account? Login'
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
