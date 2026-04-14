import { useState, useEffect } from 'react';
import { Navigation, Footer } from './components/Layout';
import { Homepage, AboutPage, ContactPage } from './components/Pages';
import { AuthPage } from './components/AuthPage';
import { ProfilePage } from './components/ProfilePage';
import { ResourcesPage } from './components/ResourcesPage';
import { SettingsPage } from './components/SettingsPage';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * User Type
 * Represents a registered user in the system
 * 
 * @property id - Unique identifier for the user
 * @property fullName - User's full name (mandatory)
 * @property email - User's email address (mandatory)
 * @property pronouns - User's preferred pronouns (optional)
 * @property phone - User's phone number (optional)
 * @property photo - User's profile photo URL (mandatory)
 * @property hobbies - Array of user's hobbies and skills
 */
export type User = {
  id: string;
  fullName: string;
  email: string;
  pronouns?: string;
  phone?: string;
  photo: string; // Mandatory field
  hobbies: string[];
};

/**
 * Comment Type
 * Represents a comment/review on a resource
 * 
 * @property id - Unique identifier for the comment
 * @property userId - ID of the user who wrote the comment
 * @property userName - Name of the user who wrote the comment
 * @property text - The comment text
 * @property createdAt - ISO date string when comment was created
 */
export type Comment = {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
};

/**
 * Resource Type
 * Represents a learning resource (tutorial, article, tool, etc.)
 * 
 * @property id - Unique identifier for the resource
 * @property title - Resource title
 * @property description - Brief description of the resource
 * @property category - Category (Technology, Arts, Lifestyle, AI Tools, etc.)
 * @property link - External URL to the resource
 * @property authorId - ID of the user who posted the resource
 * @property authorName - Name of the user who posted the resource
 * @property createdAt - ISO date string when resource was posted
 * @property upvotes - Number of upvotes the resource has received
 * @property upvotedBy - Array of user IDs who upvoted
 * @property rating - Average rating (out of 5)
 * @property ratedBy - Array of individual ratings with user IDs
 * @property comments - Array of comments on the resource
 */
export type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  upvotes: number;
  upvotedBy: string[];
  rating: number;
  ratedBy: { userId: string; rating: number }[];
  comments: Comment[];
};

/**
 * Training Request Type
 * Represents a user's request for specific training/skills
 * Other users can vote on requests to show demand
 * 
 * @property id - Unique identifier for the request
 * @property title - Request title (e.g., "Need Python Programming Course")
 * @property description - Detailed description of what's needed
 * @property category - Category of training requested
 * @property requesterId - ID of user who made the request
 * @property requesterName - Name of user who made the request
 * @property createdAt - ISO date string when request was created
 * @property votes - Number of votes the request has received
 * @property votedBy - Array of user IDs who voted for this request
 * @property status - Status of request (open, fulfilled, closed)
 */
export type TrainingRequest = {
  id: string;
  title: string;
  description: string;
  category: string;
  requesterId: string;
  requesterName: string;
  createdAt: string;
  votes: number;
  votedBy: string[];
  status: 'open' | 'fulfilled' | 'closed';
};

// ============================================================================
// COOKIE UTILITY FUNCTIONS
// ============================================================================

/**
 * Set a cookie with a name, value, and expiry in days
 * 
 * @param name - Cookie name
 * @param value - Cookie value (will be URL-encoded)
 * @param days - Number of days until expiry
 */
function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

/**
 * Get a cookie value by name
 * 
 * @param name - Cookie name to retrieve
 * @returns Cookie value or empty string if not found
 */
function getCookie(name: string): string {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }
  return '';
}

/**
 * Delete a cookie by name
 * 
 * @param name - Cookie name to delete
 */
function deleteCookie(name: string) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function App() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  // Page Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');
  
  // User Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Theme Settings - Default to modern cyan and dark mode
  const [themeColor, setThemeColor] = useState<string>('#06b6d4'); // Cyan
  const [darkMode, setDarkMode] = useState<boolean>(true); // Dark mode is default
  
  // Accessibility Settings
  const [fontSize, setFontSize] = useState<string>('medium'); // Font size options: small, medium, large, extra-large
  const [language, setLanguage] = useState<string>('en'); // Language code (9 languages supported)
  const [dyslexiaFont, setDyslexiaFont] = useState<boolean>(false); // Dyslexia-friendly font toggle
  const [highContrast, setHighContrast] = useState<boolean>(false); // High contrast mode toggle
  const [reduceMotion, setReduceMotion] = useState<boolean>(false); // Reduce animations toggle
  
  // Resources Data - Sample data for demonstration
  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Introduction to Web Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript',
      category: 'Technology',
      link: 'https://example.com/web-dev',
      authorId: 'demo-user',
      authorName: 'Demo User',
      createdAt: '2024-11-15',
      upvotes: 0,
      upvotedBy: [],
      rating: 0,
      ratedBy: [],
      comments: []
    },
    {
      id: '2',
      title: 'Gardening 101',
      description: 'Essential tips for starting your first garden',
      category: 'Lifestyle',
      link: 'https://example.com/gardening',
      authorId: 'demo-user',
      authorName: 'Jane Smith',
      createdAt: '2024-11-20',
      upvotes: 0,
      upvotedBy: [],
      rating: 0,
      ratedBy: [],
      comments: []
    },
    {
      id: '3',
      title: 'Photography Basics',
      description: 'Master camera settings and composition',
      category: 'Arts',
      link: 'https://example.com/photography',
      authorId: 'demo-user',
      authorName: 'John Doe',
      createdAt: '2024-11-25',
      upvotes: 0,
      upvotedBy: [],
      rating: 0,
      ratedBy: [],
      comments: []
    }
  ]);

  // ============================================================================
  // NEW ENHANCED FEATURES - POST-MVP
  // ============================================================================
  
  /**
   * Bookmarked Resources State
   * Stores array of resource IDs that the current user has bookmarked
   * Allows users to save resources for later viewing
   */
  const [bookmarkedResources, setBookmarkedResources] = useState<string[]>([]);
  
  /**
   * Training Requests State
   * Stores all training/skill requests made by users
   * Other users can vote on requests to show demand
   */
  const [trainingRequests, setTrainingRequests] = useState<TrainingRequest[]>([
    {
      id: 'req-1',
      title: 'Advanced Python for Data Science',
      description: 'Looking for comprehensive Python course focusing on pandas, numpy, and machine learning libraries',
      category: 'Technology',
      requesterId: 'demo-user',
      requesterName: 'Demo User',
      createdAt: '2024-12-10',
      votes: 15,
      votedBy: [],
      status: 'open'
    },
    {
      id: 'req-2',
      title: 'Digital Marketing Fundamentals',
      description: 'Need resources on SEO, social media marketing, and content strategy',
      category: 'Business',
      requesterId: 'demo-user',
      requesterName: 'Sarah Johnson',
      createdAt: '2024-12-12',
      votes: 8,
      votedBy: [],
      status: 'open'
    }
  ]);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  // Set page title on mount
  useEffect(() => {
    document.title = 'SkillHub - Learn Together';
  }, []);

  // Scroll to top when page changes for better UX
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // ============================================================================
  // COOKIE PERSISTENCE - Load data from cookies on mount
  // ============================================================================
  
  /**
   * Load persisted data from cookies when app initializes
   * This restores user session, bookmarks, and preferences
   */
  useEffect(() => {
    // Load current user from cookie
    const savedUser = getCookie('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse user cookie');
      }
    }
    
    // Load bookmarks from cookie
    const savedBookmarks = getCookie('bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarkedResources(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Failed to parse bookmarks cookie');
      }
    }
    
    // Load resources from cookie
    const savedResources = getCookie('resources');
    if (savedResources) {
      try {
        setResources(JSON.parse(savedResources));
      } catch (e) {
        console.error('Failed to parse resources cookie');
      }
    }
    
    // Load training requests from cookie
    const savedRequests = getCookie('trainingRequests');
    if (savedRequests) {
      try {
        setTrainingRequests(JSON.parse(savedRequests));
      } catch (e) {
        console.error('Failed to parse training requests cookie');
      }
    }
    
    // Load theme settings from cookie
    const savedDarkMode = getCookie('darkMode');
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    }
    
    // Load theme color from cookie
    const savedThemeColor = getCookie('themeColor');
    if (savedThemeColor) {
      setThemeColor(savedThemeColor);
    }
    
    // Load font size from cookie
    const savedFontSize = getCookie('fontSize');
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }
    
    // Load language from cookie
    const savedLanguage = getCookie('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    // Load dyslexia font preference from cookie
    const savedDyslexiaFont = getCookie('dyslexiaFont');
    if (savedDyslexiaFont) {
      setDyslexiaFont(savedDyslexiaFont === 'true');
    }
    
    // Load high contrast preference from cookie
    const savedHighContrast = getCookie('highContrast');
    if (savedHighContrast) {
      setHighContrast(savedHighContrast === 'true');
    }
    
    // Load reduce motion preference from cookie
    const savedReduceMotion = getCookie('reduceMotion');
    if (savedReduceMotion) {
      setReduceMotion(savedReduceMotion === 'true');
    }
  }, []);
  
  /**
   * Save data to cookies whenever they change
   * Ensures persistence across browser sessions
   */
  useEffect(() => {
    if (currentUser) {
      setCookie('currentUser', JSON.stringify(currentUser), 30); // 30 days expiry
    }
  }, [currentUser]);
  
  useEffect(() => {
    setCookie('bookmarks', JSON.stringify(bookmarkedResources), 30);
  }, [bookmarkedResources]);
  
  useEffect(() => {
    setCookie('resources', JSON.stringify(resources), 30);
  }, [resources]);
  
  useEffect(() => {
    setCookie('trainingRequests', JSON.stringify(trainingRequests), 30);
  }, [trainingRequests]);
  
  useEffect(() => {
    setCookie('darkMode', String(darkMode), 30);
  }, [darkMode]);
  
  useEffect(() => {
    setCookie('themeColor', themeColor, 30);
  }, [themeColor]);
  
  useEffect(() => {
    setCookie('fontSize', fontSize, 30);
  }, [fontSize]);
  
  useEffect(() => {
    setCookie('language', language, 30);
  }, [language]);
  
  useEffect(() => {
    setCookie('dyslexiaFont', String(dyslexiaFont), 30);
  }, [dyslexiaFont]);
  
  useEffect(() => {
    setCookie('highContrast', String(highContrast), 30);
  }, [highContrast]);
  
  useEffect(() => {
    setCookie('reduceMotion', String(reduceMotion), 30);
  }, [reduceMotion]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle user login/signup
   * Sets the current user and navigates to profile page
   */
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('profile');
  };

  /**
   * Handle user logout
   * Clears current user and returns to homepage
   */
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  /**
   * Handle profile updates
   * Updates the current user data
   */
  const handleUpdateProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  /**
   * Handle adding a new resource
   * Only authenticated users can add resources
   */
  const handleAddResource = (resource: Omit<Resource, 'id' | 'authorId' | 'authorName' | 'createdAt' | 'upvotes' | 'upvotedBy' | 'rating' | 'ratedBy' | 'comments'>) => {
    if (!currentUser) return;
    
    // Create new resource with auto-generated fields
    const newResource: Resource = {
      ...resource,
      id: Date.now().toString(), // Simple ID generation
      authorId: currentUser.id,
      authorName: currentUser.fullName,
      createdAt: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
      upvotes: 0,
      upvotedBy: [],
      rating: 0,
      ratedBy: [],
      comments: []
    };
    
    // Add new resource to the beginning of the array
    setResources([newResource, ...resources]);
  };

  // ============================================================================
  // NEW FEATURE HANDLERS - POST-MVP
  // ============================================================================

  /**
   * Handle toggling bookmark on a resource
   * Adds or removes resource ID from bookmarked array
   */
  const handleToggleBookmark = (resourceId: string) => {
    if (!currentUser) {
      setCurrentPage('auth');
      return;
    }
    
    setBookmarkedResources(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId) // Remove bookmark
        : [...prev, resourceId] // Add bookmark
    );
  };

  /**
   * Handle adding a new training request
   * Only authenticated users can create requests
   */
  const handleAddTrainingRequest = (request: Omit<TrainingRequest, 'id' | 'requesterId' | 'requesterName' | 'createdAt' | 'votes' | 'votedBy' | 'status'>) => {
    if (!currentUser) return;
    
    const newRequest: TrainingRequest = {
      ...request,
      id: `req-${Date.now()}`,
      requesterId: currentUser.id,
      requesterName: currentUser.fullName,
      createdAt: new Date().toISOString().split('T')[0],
      votes: 0,
      votedBy: [],
      status: 'open'
    };
    
    setTrainingRequests([newRequest, ...trainingRequests]);
  };

  /**
   * Handle voting on a training request
   * Users can only vote once per request
   */
  const handleVoteTrainingRequest = (requestId: string) => {
    if (!currentUser) {
      setCurrentPage('auth');
      return;
    }
    
    setTrainingRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        const hasVoted = request.votedBy.includes(currentUser.id);
        return {
          ...request,
          votes: hasVoted ? request.votes - 1 : request.votes + 1,
          votedBy: hasVoted 
            ? request.votedBy.filter(id => id !== currentUser.id)
            : [...request.votedBy, currentUser.id]
        };
      }
      return request;
    }));
  };

  /**
   * Handle updating resources (for upvotes, ratings, comments)
   */
  const handleUpdateResources = (updatedResources: Resource[]) => {
    setResources(updatedResources);
  };

  // ============================================================================
  // PAGE RENDERING
  // ============================================================================

  /**
   * Render the appropriate page component based on current page state
   * This is the main routing logic of the application
   */
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onNavigate={setCurrentPage} darkMode={darkMode} />;
      
      case 'auth':
        return <AuthPage onLogin={handleLogin} darkMode={darkMode} />;
      
      case 'profile':
        // Redirect to auth if not logged in
        return currentUser ? (
          <ProfilePage 
            user={currentUser} 
            onUpdateProfile={handleUpdateProfile} 
            darkMode={darkMode}
            resources={resources}
            bookmarkedResources={bookmarkedResources}
            trainingRequests={trainingRequests}
          />
        ) : (
          <AuthPage onLogin={handleLogin} darkMode={darkMode} />
        );
      
      case 'resources':
        return (
          <ResourcesPage 
            resources={resources} 
            currentUser={currentUser}
            onAddResource={handleAddResource}
            onNavigateToAuth={() => setCurrentPage('auth')}
            onUpdateResources={handleUpdateResources}
            bookmarkedResources={bookmarkedResources}
            onToggleBookmark={handleToggleBookmark}
            trainingRequests={trainingRequests}
            onAddRequest={handleAddTrainingRequest}
            onVoteRequest={handleVoteTrainingRequest}
            darkMode={darkMode}
          />
        );
      
      case 'about':
        return <AboutPage darkMode={darkMode} />;
      
      case 'contact':
        return <ContactPage darkMode={darkMode} />;
      
      case 'settings':
        return <SettingsPage 
          themeColor={themeColor} 
          onColorChange={setThemeColor} 
          darkMode={darkMode} 
          onDarkModeChange={setDarkMode}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
          language={language}
          onLanguageChange={setLanguage}
          dyslexiaFont={dyslexiaFont}
          onDyslexiaFontChange={setDyslexiaFont}
          highContrast={highContrast}
          onHighContrastChange={setHighContrast}
          reduceMotion={reduceMotion}
          onReduceMotionChange={setReduceMotion}
        />;
      
      default:
        return <Homepage onNavigate={setCurrentPage} darkMode={darkMode} />;
    }
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div 
      className={`min-h-screen flex flex-col transition-colors ${reduceMotion ? '' : 'duration-300'} ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} ${highContrast ? 'high-contrast' : ''}`}
      data-font-size={fontSize}
      lang={language}
    >
      {/* Dynamic CSS for theme, accessibility, and custom styling */}
      <style>{`
        /* ===== THEME COLOR VARIABLE ===== */
        :root {
          --theme-color: ${themeColor};
        }
        
        /* ===== FONT SIZE SETTINGS ===== */
        [data-font-size="small"] {
          font-size: 14px;
        }
        [data-font-size="medium"] {
          font-size: 16px;
        }
        [data-font-size="large"] {
          font-size: 18px;
        }
        [data-font-size="extra-large"] {
          font-size: 20px;
        }
        
        /* ===== DYSLEXIA-FRIENDLY FONT ===== */
        /* Uses Comic Sans MS as a fallback for dyslexia-friendly reading */
        ${dyslexiaFont ? `
          * {
            font-family: 'Comic Sans MS', 'OpenDyslexic', Arial, sans-serif !important;
            letter-spacing: 0.05em; /* Increased letter spacing */
            word-spacing: 0.1em; /* Increased word spacing */
            line-height: 1.8 !important; /* More breathing room between lines */
          }
        ` : ''}
        
        /* ===== HIGH CONTRAST MODE ===== */
        /* Enhances color contrast for better visibility */
        .high-contrast {
          --theme-color: ${darkMode ? '#00d9ff' : '#0066cc'};
        }
        .high-contrast * {
          border-color: ${darkMode ? '#ffffff !important' : '#000000 !important'};
        }
        
        /* ===== REDUCE MOTION ===== */
        /* Removes animations for users with motion sensitivity */
        ${reduceMotion ? `
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        ` : ''}
      `}</style>
      
      {/* Navigation Bar */}
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        currentUser={currentUser}
        onLogout={handleLogout}
        darkMode={darkMode}
      />
      
      {/* Main Content Area */}
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      {/* Footer */}
      <Footer 
        onNavigate={setCurrentPage}
        darkMode={darkMode}
      />
    </div>
  );
}