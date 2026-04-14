/**
 * ============================================================================
 * SHARED UTILITIES - Reusable Functions and Components
 * ============================================================================
 * 
 * This file contains reusable utilities shared across multiple components:
 * - Style class generators
 * - Common UI components
 * - Helper functions
 * - Shared constants
 * 
 * PURPOSE: Eliminate code duplication and ensure consistency across the app
 * ============================================================================
 */

import { ReactNode } from 'react';

// ============================================================================
// STYLE CLASS GENERATORS
// ============================================================================

/**
 * Generate consistent card styles based on theme and size
 * @param darkMode - Current theme mode
 * @param size - Card size variant (large, medium, small)
 */
export const getCardClass = (darkMode: boolean, size: 'large' | 'medium' | 'small' = 'medium') => {
  const base = 'backdrop-blur-md rounded-2xl border-2';
  const theme = darkMode ? 'bg-gray-800/90 border-cyan-500/30' : 'bg-white/90 border-cyan-200/50';
  
  const sizeMap = {
    large: 'shadow-xl p-8',
    medium: 'shadow-lg p-6',
    small: 'shadow-md p-4'
  };
  
  return `${base} ${theme} ${sizeMap[size]}`;
};

/**
 * Generate input field styles based on theme
 */
export const getInputClass = (darkMode: boolean) => 
  `w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
    darkMode 
      ? 'bg-gray-700/50 border-cyan-500/30 text-white focus:border-cyan-500' 
      : 'bg-white border-cyan-200 focus:border-cyan-400'
  }`;

/**
 * Generate badge styles based on theme
 */
export const getBadgeClass = (darkMode: boolean) =>
  `px-3 py-1 rounded-lg text-sm border ${
    darkMode 
      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' 
      : 'bg-cyan-100 text-cyan-700 border-cyan-200'
  }`;

/**
 * Generate button styles based on theme and variant
 */
export const getButtonClass = (darkMode: boolean, variant: 'primary' | 'secondary' | 'ghost' = 'primary') => {
  const base = 'px-4 py-2 rounded-xl transition-all';
  
  const variants = {
    primary: 'text-white hover:scale-105 shadow-lg',
    secondary: `border-2 ${darkMode ? 'border-cyan-500/30 text-gray-300 hover:bg-gray-700' : 'border-cyan-200 text-gray-700 hover:bg-gray-100'}`,
    ghost: darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
  };
  
  return `${base} ${variants[variant]}`;
};

/**
 * Get text color classes based on hierarchy
 */
export const getTextClass = (darkMode: boolean, level: 'primary' | 'secondary' | 'tertiary' = 'primary') => {
  const levels = {
    primary: darkMode ? 'text-white' : 'text-gray-900',
    secondary: darkMode ? 'text-gray-400' : 'text-gray-600',
    tertiary: darkMode ? 'text-gray-500' : 'text-gray-500'
  };
  return levels[level];
};

// ============================================================================
// SHARED CONSTANTS
// ============================================================================

/**
 * Gradient style for primary buttons and elements
 */
export const GRADIENT_PRIMARY = 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)';

/**
 * Category options used across the app
 */
export const CATEGORIES = ['All', 'Technology', 'Arts', 'Lifestyle', 'Business', 'Health', 'Education', 'AI Tools'];

/**
 * Pronoun options for user profiles
 */
export const PRONOUN_OPTIONS = [
  { value: '', label: 'Select pronouns' },
  { value: 'she/her', label: 'she/her' },
  { value: 'he/him', label: 'he/him' },
  { value: 'they/them', label: 'they/them' },
  { value: 'she/they', label: 'she/they' },
  { value: 'he/they', label: 'he/they' },
  { value: 'any pronouns', label: 'any pronouns' },
  { value: 'prefer not to say', label: 'prefer not to say' }
];

// ============================================================================
// REUSABLE UI COMPONENTS
// ============================================================================

/**
 * Animated background decoration used across pages
 */
export const BackgroundDecoration = ({ darkMode }: { darkMode: boolean }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className={`absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${darkMode ? 'bg-cyan-500' : 'bg-cyan-300'}`}></div>
    <div className={`absolute bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000 ${darkMode ? 'bg-blue-500' : 'bg-blue-300'}`}></div>
  </div>
);

/**
 * Section heading with icon
 */
export const SectionHeading = ({ 
  icon: Icon, 
  children, 
  darkMode 
}: { 
  icon: any; 
  children: ReactNode; 
  darkMode: boolean 
}) => (
  <h2 className={`text-2xl mb-6 flex items-center gap-2 ${getTextClass(darkMode, 'primary')}`}>
    <Icon className="w-6 h-6" style={{ color: 'var(--theme-color)' }} />
    {children}
  </h2>
);

/**
 * Empty state placeholder
 */
export const EmptyState = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  darkMode 
}: { 
  icon: any; 
  title: string; 
  subtitle: string; 
  darkMode: boolean 
}) => (
  <div className={`p-12 rounded-2xl border-2 text-center ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'}`}>
    <Icon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
    <p className={`text-xl ${getTextClass(darkMode, 'secondary')}`}>{title}</p>
    <p className={`text-sm mt-2 ${getTextClass(darkMode, 'tertiary')}`}>{subtitle}</p>
  </div>
);

/**
 * Loading spinner
 */
export const LoadingSpinner = ({ darkMode }: { darkMode: boolean }) => (
  <div className="flex justify-center items-center py-12">
    <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin ${
      darkMode ? 'border-cyan-400' : 'border-cyan-600'
    }`}></div>
  </div>
);

/**
 * Form input field with label
 */
export const FormInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  required = false,
  darkMode 
}: { 
  label: string; 
  type?: string; 
  value: string; 
  onChange: (v: string) => void; 
  placeholder?: string;
  required?: boolean;
  darkMode: boolean;
}) => (
  <div>
    <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      {label} {required && '*'}
    </label>
    <input 
      type={type} 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      className={getInputClass(darkMode)} 
      placeholder={placeholder}
      required={required}
    />
  </div>
);

/**
 * Primary gradient button
 */
export const PrimaryButton = ({ 
  onClick, 
  children, 
  disabled = false,
  fullWidth = false,
  type = 'button'
}: { 
  onClick?: () => void; 
  children: ReactNode; 
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`py-3 px-6 rounded-xl text-white transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''}`}
    style={{ background: GRADIENT_PRIMARY }}
  >
    {children}
  </button>
);

/**
 * Tab button component
 */
export const TabButton = ({
  active,
  onClick,
  icon: Icon,
  label,
  count,
  darkMode
}: {
  active: boolean;
  onClick: () => void;
  icon: any;
  label: string;
  count?: number;
  darkMode: boolean;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
        ? 'text-white shadow-lg' 
        : darkMode 
          ? 'text-gray-300 hover:bg-gray-700' 
          : 'text-gray-700 hover:bg-gray-100'
    }`}
    style={active ? { background: GRADIENT_PRIMARY } : {}}
  >
    <Icon className="w-5 h-5" />
    <span className="hidden sm:inline">{label}</span>
    {count !== undefined && (
      <span className={`px-2 py-0.5 rounded-full text-xs ${
        active 
          ? 'bg-white/20' 
          : darkMode 
            ? 'bg-gray-700' 
            : 'bg-gray-200'
      }`}>
        {count}
      </span>
    )}
  </button>
);

/**
 * Star rating display component
 */
export const StarRating = ({ 
  rating, 
  maxStars = 5,
  size = 'w-5 h-5'
}: { 
  rating: number; 
  maxStars?: number;
  size?: string;
}) => (
  <div className="flex items-center gap-1">
    {[...Array(maxStars)].map((_, i) => (
      <Star
        key={i}
        className={`${size} ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))}
  </div>
);

/**
 * Category badge component
 */
export const CategoryBadge = ({ 
  category, 
  darkMode 
}: { 
  category: string; 
  darkMode: boolean 
}) => (
  <span className={getBadgeClass(darkMode)}>
    {category}
  </span>
);

/**
 * Status badge for requests
 */
export const StatusBadge = ({
  status,
  darkMode
}: {
  status: 'open' | 'fulfilled' | 'closed';
  darkMode: boolean;
}) => {
  const statusStyles = {
    open: darkMode ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300',
    fulfilled: darkMode ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300',
    closed: darkMode ? 'bg-gray-500/20 text-gray-300 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-300'
  };
  
  return (
    <span className={`px-3 py-1 rounded-lg text-xs uppercase tracking-wide border ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

// Need to import Star icon
import { Star } from 'lucide-react';

// ============================================================================
// UTILITY HELPER FUNCTIONS
// ============================================================================

/**
 * Validate image file type (JPEG/PNG only)
 */
export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  return validTypes.includes(file.type);
};

/**
 * Format date to locale string
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Calculate average rating
 */
export const calculateAverageRating = (ratings: { userId: string; rating: number }[]): number => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
  return sum / ratings.length;
};