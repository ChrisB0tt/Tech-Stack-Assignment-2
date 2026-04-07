// ============================================================================
// SKILLHUB - VANILLA JS STATE MANAGEMENT
// ============================================================================

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

class SkillHubApp {
  constructor() {
    this.currentUser = null;
    this.resources = [];
    this.trainingRequests = [];
    this.bookmarkedResources = [];
    this.settings = {
      themeColor: '#06b6d4',
      darkMode: true,
      fontSize: 'medium',
      language: 'en',
      dyslexiaFont: false,
      highContrast: false,
      reduceMotion: false
    };
    
    this.init();
  }

  init() {
    this.loadFromStorage();
    this.applySettings();
    this.updateUI();
    this.attachEventListeners();
  }

  // ============================================================================
  // STORAGE MANAGEMENT
  // ============================================================================

  loadFromStorage() {
    // Load user
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    }

    // Load resources
    const resourcesStr = localStorage.getItem('resources');
    if (resourcesStr) {
      this.resources = JSON.parse(resourcesStr);
    } else {
      // Initialize with sample data
      this.resources = [
        {
          id: '1',
          title: 'Introduction to Web Development',
          description: 'Learn the basics of HTML, CSS, and JavaScript',
          category: 'Technology',
          link: 'https://example.com/web-dev',
          authorId: 'demo-user',
          authorName: 'Demo User',
          createdAt: '2024-11-15',
          upvotes: 5,
          upvotedBy: [],
          rating: 4.5,
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
          upvotes: 8,
          upvotedBy: [],
          rating: 4.8,
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
          upvotes: 12,
          upvotedBy: [],
          rating: 5.0,
          ratedBy: [],
          comments: []
        }
      ];
      this.saveToStorage();
    }

    // Load training requests
    const requestsStr = localStorage.getItem('trainingRequests');
    if (requestsStr) {
      this.trainingRequests = JSON.parse(requestsStr);
    }

    // Load bookmarks
    const bookmarksStr = localStorage.getItem('bookmarkedResources');
    if (bookmarksStr) {
      this.bookmarkedResources = JSON.parse(bookmarksStr);
    }

    // Load settings
    const settingsStr = localStorage.getItem('settings');
    if (settingsStr) {
      this.settings = { ...this.settings, ...JSON.parse(settingsStr) };
    }
  }

  saveToStorage() {
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    localStorage.setItem('resources', JSON.stringify(this.resources));
    localStorage.setItem('trainingRequests', JSON.stringify(this.trainingRequests));
    localStorage.setItem('bookmarkedResources', JSON.stringify(this.bookmarkedResources));
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  // ============================================================================
  // USER AUTHENTICATION
  // ============================================================================

  login(email, password) {
    // Simple mock authentication
    const user = {
      id: Date.now().toString(),
      fullName: email.split('@')[0],
      email: email,
      photo: 'https://via.placeholder.com/150',
      hobbies: []
    };
    this.currentUser = user;
    this.saveToStorage();
    this.updateUI();
    return user;
  }

  signup(userData) {
    const user = {
      id: Date.now().toString(),
      fullName: userData.fullName,
      email: userData.email,
      pronouns: userData.pronouns,
      phone: userData.phone,
      photo: userData.photo || 'https://via.placeholder.com/150',
      hobbies: []
    };
    this.currentUser = user;
    this.saveToStorage();
    this.updateUI();
    return user;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.updateUI();
    window.location.href = '/index.html';
  }

  // ============================================================================
  // RESOURCES MANAGEMENT
  // ============================================================================

  addResource(resource) {
    const newResource = {
      id: Date.now().toString(),
      ...resource,
      authorId: this.currentUser?.id || 'anonymous',
      authorName: this.currentUser?.fullName || 'Anonymous',
      createdAt: new Date().toISOString(),
      upvotes: 0,
      upvotedBy: [],
      rating: 0,
      ratedBy: [],
      comments: []
    };
    this.resources.push(newResource);
    this.saveToStorage();
    return newResource;
  }

  deleteResource(resourceId) {
    this.resources = this.resources.filter(r => r.id !== resourceId);
    this.saveToStorage();
  }

  upvoteResource(resourceId) {
    if (!this.currentUser) return;
    
    const resource = this.resources.find(r => r.id === resourceId);
    if (!resource) return;

    const hasUpvoted = resource.upvotedBy.includes(this.currentUser.id);
    
    if (hasUpvoted) {
      resource.upvotedBy = resource.upvotedBy.filter(id => id !== this.currentUser.id);
      resource.upvotes--;
    } else {
      resource.upvotedBy.push(this.currentUser.id);
      resource.upvotes++;
    }
    
    this.saveToStorage();
  }

  rateResource(resourceId, rating) {
    if (!this.currentUser) return;
    
    const resource = this.resources.find(r => r.id === resourceId);
    if (!resource) return;

    const existingRating = resource.ratedBy.find(r => r.userId === this.currentUser.id);
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      resource.ratedBy.push({ userId: this.currentUser.id, rating });
    }

    // Calculate average rating
    const sum = resource.ratedBy.reduce((acc, r) => acc + r.rating, 0);
    resource.rating = sum / resource.ratedBy.length;
    
    this.saveToStorage();
  }

  addComment(resourceId, comment) {
    if (!this.currentUser) return;
    
    const resource = this.resources.find(r => r.id === resourceId);
    if (!resource) return;

    const newComment = {
      id: Date.now().toString(),
      userId: this.currentUser.id,
      userName: this.currentUser.fullName,
      text: comment,
      createdAt: new Date().toISOString()
    };
    
    resource.comments.push(newComment);
    this.saveToStorage();
  }

  // ============================================================================
  // BOOKMARKS
  // ============================================================================

  toggleBookmark(resourceId) {
    if (!this.currentUser) return;

    const index = this.bookmarkedResources.indexOf(resourceId);
    if (index > -1) {
      this.bookmarkedResources.splice(index, 1);
    } else {
      this.bookmarkedResources.push(resourceId);
    }
    
    this.saveToStorage();
  }

  isBookmarked(resourceId) {
    return this.bookmarkedResources.includes(resourceId);
  }

  // ============================================================================
  // TRAINING REQUESTS
  // ============================================================================

  addTrainingRequest(request) {
    const newRequest = {
      id: Date.now().toString(),
      ...request,
      userId: this.currentUser?.id || 'anonymous',
      userName: this.currentUser?.fullName || 'Anonymous',
      createdAt: new Date().toISOString(),
      status: 'open',
      interestedUsers: []
    };
    this.trainingRequests.push(newRequest);
    this.saveToStorage();
    return newRequest;
  }

  updateRequestStatus(requestId, status) {
    const request = this.trainingRequests.find(r => r.id === requestId);
    if (request) {
      request.status = status;
      this.saveToStorage();
    }
  }

  expressInterest(requestId) {
    if (!this.currentUser) return;
    
    const request = this.trainingRequests.find(r => r.id === requestId);
    if (request && !request.interestedUsers.includes(this.currentUser.id)) {
      request.interestedUsers.push(this.currentUser.id);
      this.saveToStorage();
    }
  }

  // ============================================================================
  // SETTINGS
  // ============================================================================

  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveToStorage();
    this.applySettings();
  }

  applySettings() {
    const root = document.documentElement;
    
    // Apply theme color
    root.style.setProperty('--theme-color', this.settings.themeColor);
    
    // Apply dark mode
    if (this.settings.darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    
    // Apply font size
    root.style.setProperty('--font-size', this.getFontSizeValue(this.settings.fontSize));
    
    // Apply dyslexia font
    if (this.settings.dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
    
    // Apply high contrast
    if (this.settings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    // Apply reduce motion
    if (this.settings.reduceMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }

  getFontSizeValue(size) {
    const sizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px'
    };
    return sizes[size] || '16px';
  }

  // ============================================================================
  // UI UPDATES
  // ============================================================================

  updateUI() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const profileBtn = document.getElementById('profile-btn');

    if (this.currentUser) {
      if (loginBtn) loginBtn.style.display = 'none';
      if (logoutBtn) logoutBtn.style.display = 'block';
      if (profileBtn) {
        profileBtn.style.display = 'block';
        profileBtn.textContent = this.currentUser.fullName;
      }
    } else {
      if (loginBtn) loginBtn.style.display = 'block';
      if (logoutBtn) logoutBtn.style.display = 'none';
      if (profileBtn) profileBtn.style.display = 'none';
    }

    // Update resource count
    const resourceCount = document.getElementById('resources-count');
    if (resourceCount) {
      resourceCount.textContent = this.resources.length;
    }

    // Update navigation styling
    this.updateNavStyling();
  }

  updateNavStyling() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    const isDark = this.settings.darkMode;
    
    if (isDark) {
      nav.classList.add('bg-gray-900/90', 'border-cyan-500/30');
      nav.classList.remove('bg-white/90', 'border-cyan-200/50');
    } else {
      nav.classList.add('bg-white/90', 'border-cyan-200/50');
      nav.classList.remove('bg-gray-900/90', 'border-cyan-500/30');
    }

    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (isDark) {
        link.classList.add('text-gray-300', 'hover:bg-gray-700');
        link.classList.remove('text-gray-700', 'hover:bg-gray-100');
      } else {
        link.classList.add('text-gray-700', 'hover:bg-gray-100');
        link.classList.remove('text-gray-300', 'hover:bg-gray-700');
      }
    });
  }

  // ============================================================================
  // EVENT LISTENERS
  // ============================================================================

  attachEventListeners() {
    // Login button
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        window.location.href = '/login.html';
      });
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.logout();
      });
    }

    // Profile button
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        window.location.href = '/profile.html';
      });
    }

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        // Toggle mobile menu (you can implement this)
        alert('Mobile menu - implement as needed');
      });
    }
  }

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    
    return this.formatDate(dateString);
  }
}

// ============================================================================
// INITIALIZE APP
// ============================================================================

const app = new SkillHubApp();
window.skillHubApp = app;
