/**
 * ============================================================================
 * LAYOUT COMPONENTS - Navigation & Footer
 * ============================================================================
 * 
 * This file contains all layout-related components that appear on every page.
 * 
 * COMPONENTS INCLUDED:
 * 1. Navigation - Top navigation bar with responsive menu
 * 2. Footer - Bottom footer with links, social media, and newsletter
 * 
 * NAVIGATION FEATURES:
 * - Sticky top positioning with backdrop blur
 * - Animated logo with pulsing indicator
 * - Desktop menu with active page highlighting
 * - Mobile hamburger menu with slide-down animation
 * - User authentication state awareness
 * - Settings button access
 * - Responsive design for all screen sizes
 * 
 * FOOTER FEATURES:
 * - Brand section with trust badges (Verified Platform, SSL Encrypted)
 * - Quick links to main pages
 * - Resource links
 * - Newsletter subscription form
 * - Social media icon links
 * - Copyright and legal links
 * - Decorative background elements
 * 
 * ============================================================================
 */

import { useState } from 'react';
import { Menu, X, Settings, Facebook, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';
import type { User } from '../App';

// ============================================================================
// NAVIGATION COMPONENT
// ============================================================================

type NavigationProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
  currentUser: User | null;
  onLogout: () => void;
  darkMode: boolean;
};

export function Navigation({ currentPage, onNavigate, currentUser, onLogout, darkMode }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'resources', label: 'Browse Resources' }
  ];

  const isAuthenticated = !!currentUser;

  return (
    <nav className={`backdrop-blur-md shadow-lg sticky top-0 z-50 transition-colors duration-300 border-b-4 ${darkMode ? 'bg-gray-900/95 border-cyan-500' : 'bg-white/95 border-cyan-400'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            className="cursor-pointer flex items-center gap-3 group"
            onClick={() => onNavigate('home')}
            aria-label="Navigate to home"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" 
                style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
                <span className="text-white text-2xl relative z-10 transform group-hover:scale-110 transition-transform">SS</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse" style={{ background: 'var(--theme-color)' }}></div>
            </div>
            <div>
              <span className={`block text-lg transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>SkillHub</span>
              <span className="block text-xs" style={{ color: 'var(--theme-color)' }}>Learn Together</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-6 py-3 transition-all duration-300 overflow-hidden group ${
                  currentPage === item.id
                    ? 'text-white'
                    : darkMode 
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {currentPage === item.id && (
                  <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}>
                    <div className="absolute inset-[2px] rounded-xl" style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}></div>
                  </div>
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {item.label}
                  {currentPage === item.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                  )}
                </span>
                {currentPage !== item.id && (
                  <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300`} style={{ background: 'var(--theme-color)' }}></div>
                )}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => onNavigate('profile')}
                  className={`relative px-6 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 overflow-hidden group ${darkMode ? 'border-cyan-500/30 text-gray-300 hover:border-cyan-500' : 'border-cyan-200 text-gray-700 hover:border-cyan-400'}`}
                >
                  <span className="relative z-10">Profile</span>
                  <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${darkMode ? 'bg-gray-800' : 'bg-cyan-50'}`}></div>
                </button>
                <button
                  onClick={onLogout}
                  className="relative px-6 py-3 rounded-xl text-white transition-all duration-300 hover:scale-105 overflow-hidden group border-2 border-transparent hover:border-cyan-300"
                  style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}
                >
                  <div className="absolute inset-[2px] rounded-lg bg-gradient-to-br from-white/10 to-transparent"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Logout
                    <div className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </span>
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="relative px-4 py-2 rounded-xl text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-cyan-300 overflow-hidden group text-sm"
                style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}
              >
                <div className="absolute inset-[2px] rounded-lg bg-gradient-to-br from-white/10 to-transparent"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Login / Sign Up
                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </span>
              </button>
            )}

            {/* Settings Button */}
            <button
              onClick={() => onNavigate('settings')}
              className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-110 border-2 ${darkMode ? 'border-cyan-500/30 bg-gray-800 hover:border-cyan-500' : 'border-cyan-200 bg-gray-50 hover:border-cyan-400'}`}
              title="Settings"
              aria-label="Open settings"
            >
              <Settings className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-3 rounded-xl border-2 transition-all duration-300 ${darkMode ? 'border-cyan-500/30 bg-gray-800' : 'border-cyan-200 bg-gray-50'}`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`md:hidden border-t-2 ${darkMode ? 'bg-gray-900 border-cyan-500/30' : 'bg-white border-cyan-200'}`}>
          <div className="px-4 py-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-6 py-4 rounded-xl transition-all duration-300 border-2 ${
                  currentPage === item.id
                    ? 'text-white border-transparent'
                    : darkMode
                      ? 'text-gray-300 border-cyan-500/30 hover:border-cyan-500'
                      : 'text-gray-700 border-cyan-200 hover:border-cyan-400'
                }`}
                style={currentPage === item.id ? { background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' } : {}}
              >
                <span className="flex items-center justify-between">
                  {item.label}
                  {currentPage === item.id && (
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  )}
                </span>
              </button>
            ))}
            
            <div className={`pt-4 border-t-2 space-y-3 ${darkMode ? 'border-cyan-500/30' : 'border-cyan-200'}`}>
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 ${darkMode ? 'border-cyan-500/30 text-gray-300' : 'border-cyan-200 text-gray-700'}`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-6 py-4 rounded-xl text-white border-2 border-transparent"
                    style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onNavigate('auth');
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-6 py-4 rounded-xl text-white border-2 border-transparent"
                  style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}
                >
                  Login / Sign Up
                </button>
              )}

              <button
                onClick={() => {
                  onNavigate('settings');
                  setIsMenuOpen(false);
                }}
                className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${darkMode ? 'border-cyan-500/30 bg-gray-800 text-gray-300' : 'border-cyan-200 bg-gray-50 text-gray-700'}`}
              >
                <span>Settings</span>
                <Settings className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// ============================================================================
// FOOTER COMPONENT
// ============================================================================

type FooterProps = {
  onNavigate: (page: string) => void;
  darkMode: boolean;
};

export function Footer({ onNavigate, darkMode }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Github, label: 'GitHub', href: '#' }
  ];

  return (
    <footer className={`transition-colors duration-300 border-t-4 relative overflow-hidden ${darkMode ? 'bg-gray-900 border-cyan-500' : 'bg-gray-50 border-cyan-400'}`}>
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: 'var(--theme-color)' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl" style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl"></div>
                  <span className="text-white text-2xl relative z-10">SS</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 animate-pulse" style={{ background: 'var(--theme-color)', borderColor: darkMode ? '#111827' : '#f9fafb' }}></div>
              </div>
              <div>
                <span className={`block text-xl transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>SkillHub</span>
                <span className="block text-xs" style={{ color: 'var(--theme-color)' }}>Learn Together</span>
              </div>
            </div>
            <p className={`mb-6 leading-relaxed transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Building a collaborative learning environment where everyone can share knowledge and grow together.
            </p>
            
            {/* Trust Badges */}
            <div className="space-y-3">
              <div className={`p-3 rounded-xl border-2 backdrop-blur-sm ${darkMode ? 'border-green-500/30 bg-green-500/10' : 'border-green-200 bg-green-50'}`}>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-500">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <div className={`${darkMode ? 'text-green-300' : 'text-green-700'}`}>Verified Platform</div>
                    <div className={`text-xs ${darkMode ? 'text-green-400/70' : 'text-green-600/70'}`}>Trusted by 10,000+ users</div>
                  </div>
                </div>
              </div>
              
              <div className={`p-3 rounded-xl border-2 backdrop-blur-sm ${darkMode ? 'border-blue-500/30 bg-blue-500/10' : 'border-blue-200 bg-blue-50'}`}>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <div className={`${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>SSL Encrypted</div>
                    <div className={`text-xs ${darkMode ? 'text-blue-400/70' : 'text-blue-600/70'}`}>Your data is secure</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <div className="relative inline-block mb-6">
              <h3 className={`relative z-10 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Links</h3>
              <div className="absolute -bottom-1 left-0 w-12 h-1 rounded-full" style={{ background: 'var(--theme-color)' }}></div>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className={`group flex items-center gap-2 transition-all hover:translate-x-1 ${darkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'}`}
                  >
                    <div className="w-1 h-1 rounded-full transition-all group-hover:w-2" style={{ background: 'var(--theme-color)' }}></div>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <div className="relative inline-block mb-6">
              <h3 className={`relative z-10 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Resources</h3>
              <div className="absolute -bottom-1 left-0 w-12 h-1 rounded-full" style={{ background: 'var(--theme-color)' }}></div>
            </div>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('auth')}
                  className={`group flex items-center gap-2 transition-all hover:translate-x-1 ${darkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'}`}
                >
                  <div className="w-1 h-1 rounded-full transition-all group-hover:w-2" style={{ background: 'var(--theme-color)' }}></div>
                  Sign Up
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className={`group flex items-center gap-2 transition-all hover:translate-x-1 ${darkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'}`}
                >
                  <div className="w-1 h-1 rounded-full transition-all group-hover:w-2" style={{ background: 'var(--theme-color)' }}></div>
                  Browse Resources
                </button>
              </li>
              <li>
                <button
                  className={`group flex items-center gap-2 transition-all hover:translate-x-1 ${darkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'}`}
                >
                  <div className="w-1 h-1 rounded-full transition-all group-hover:w-2" style={{ background: 'var(--theme-color)' }}></div>
                  Help Center
                </button>
              </li>
              <li>
                <button
                  className={`group flex items-center gap-2 transition-all hover:translate-x-1 ${darkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'}`}
                >
                  <div className="w-1 h-1 rounded-full transition-all group-hover:w-2" style={{ background: 'var(--theme-color)' }}></div>
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-4">
            <div className="relative inline-block mb-6">
              <h3 className={`relative z-10 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Stay Connected 📬</h3>
              <div className="absolute -bottom-1 left-0 w-12 h-1 rounded-full" style={{ background: 'var(--theme-color)' }}></div>
            </div>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get the latest updates and resources delivered to your inbox.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
                className={`w-full px-4 py-4 pr-14 rounded-xl border-2 focus:outline-none transition-all duration-200 ${darkMode ? 'bg-gray-800 border-cyan-500/30 text-white placeholder-gray-500 focus:border-cyan-500' : 'bg-white border-cyan-200 focus:border-cyan-400'}`}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg text-white transition-all duration-200 hover:scale-110 shadow-lg"
                style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}
                aria-label="Subscribe to newsletter"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
            
            {/* Social Links */}
            <div className="mt-6">
              <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Follow Us</p>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl border-2 transition-all duration-200 hover:scale-110 hover:-translate-y-1 ${darkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-cyan-400 border-cyan-500/30 hover:border-cyan-500' : 'hover:bg-cyan-50 text-gray-600 hover:text-cyan-600 border-cyan-200 hover:border-cyan-400'}`}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t-2 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors ${darkMode ? 'border-cyan-500/30' : 'border-cyan-200'}`}>
          <p className={`text-sm transition-colors flex items-center gap-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--theme-color)' }}></span>
            © {currentYear} Skill Swap Hub. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button className={`text-sm hover:underline ${darkMode ? 'text-gray-500 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-600'}`}>
              Terms
            </button>
            <span className={darkMode ? 'text-gray-700' : 'text-gray-300'}>•</span>
            <button className={`text-sm hover:underline ${darkMode ? 'text-gray-500 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-600'}`}>
              Privacy
            </button>
            <span className={darkMode ? 'text-gray-700' : 'text-gray-300'}>•</span>
            <button className={`text-sm hover:underline ${darkMode ? 'text-gray-500 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-600'}`}>
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}