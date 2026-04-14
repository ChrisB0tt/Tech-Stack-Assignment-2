/**
 * ============================================================================
 * ALL PAGE COMPONENTS - Consolidated File
 * ============================================================================
 * 
 * This file contains all page components for optimal bundle size:
 * - Homepage
 * - AboutPage  
 * - ContactPage
 * 
 * Each component is documented with its purpose and features.
 * ============================================================================
 */

import { useState } from 'react';
import { UserPlus, Share2, Eye, Mail, MapPin, MessageSquare } from 'lucide-react';

// ============================================================================
// HOMEPAGE COMPONENT
// ============================================================================

/**
 * Homepage - Landing page with hero section and feature cards
 * Features: Animated backgrounds, trust indicators, feature showcases
 */

type HomepageProps = {
  onNavigate: (page: string) => void;
  darkMode: boolean;
};

export function Homepage({ onNavigate, darkMode }: HomepageProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className={`relative py-20 md:py-32 px-4 overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${darkMode ? '#06b6d4' : '#06b6d4'} 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        {/* Floating Animated Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-40 left-[10%] w-2 h-2 rounded-full animate-pulse ${darkMode ? 'bg-cyan-400' : 'bg-cyan-500'}`}></div>
          <div className={`absolute top-60 right-[15%] w-3 h-3 rounded-full animate-pulse ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`} style={{ animationDelay: '1s' }}></div>
          <div className={`absolute bottom-40 left-[20%] w-2 h-2 rounded-full animate-pulse ${darkMode ? 'bg-purple-400' : 'bg-purple-500'}`} style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              {/* Trust Badge */}
              <div className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border backdrop-blur-md transition-colors duration-300 ${darkMode ? 'bg-gray-800/60 border-cyan-500/30' : 'bg-cyan-50 border-cyan-200'}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className={`text-sm ${darkMode ? 'text-cyan-400' : 'text-cyan-700'}`}>Trusted by 10,000+ learners</span>
              </div>
              
              {/* Main Heading */}
              <h1 className={`mb-6 text-4xl md:text-6xl lg:text-7xl leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Share Skills,
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
                  Build Community
                </span>
              </h1>
              
              {/* Description */}
              <p className={`mb-8 text-lg md:text-xl leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Join thousands of learners and teachers exchanging knowledge. Discover resources, share expertise, and grow together in a supportive environment.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => onNavigate('auth')}
                  className={`group relative px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl border-2 overflow-hidden ${darkMode ? 'bg-gray-900 text-white hover:bg-gray-800 border-white/20 hover:border-white' : 'bg-white hover:bg-gray-50 border-cyan-200 hover:border-cyan-400'}`}
                  style={darkMode ? {} : { color: 'var(--theme-color)' }}
                >
                  <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${darkMode ? 'bg-gray-800' : 'bg-cyan-50'}`}></div>
                  <span className="relative z-10 inline-flex items-center gap-2">
                    Create Free Account
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                
                <button
                  onClick={() => onNavigate('contact')}
                  className="relative px-8 py-4 rounded-2xl border-2 border-white/50 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 overflow-hidden group backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="relative z-10">Contact Us</span>
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center gap-8 flex-wrap">
                {/* Active Members */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-cyan-400 to-blue-500"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-purple-500"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-500"></div>
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>10,000+</div>
                    <div>Active Members</div>
                  </div>
                </div>
                
                {/* Rating */}
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>4.9/5 Rating</div>
                </div>
              </div>
            </div>

            {/* Right Content - Decorative */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px]">
                {/* Decorative cards with glassmorphism */}
                <div className={`absolute top-0 right-0 w-72 p-6 rounded-2xl backdrop-blur-md border-2 shadow-2xl transform rotate-6 transition-transform hover:rotate-3 ${darkMode ? 'bg-gray-800/80 border-cyan-500/30' : 'bg-white/80 border-cyan-200'}`}>
                  <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}>
                    <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Share Knowledge</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Contribute your expertise and help others learn</p>
                </div>
                
                <div className={`absolute bottom-20 left-0 w-72 p-6 rounded-2xl backdrop-blur-md border-2 shadow-2xl transform -rotate-6 transition-transform hover:rotate-0 ${darkMode ? 'bg-gray-800/80 border-cyan-500/30' : 'bg-white/80 border-cyan-200'}`}>
                  <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' }}>
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Join Community</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Connect with like-minded learners worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 px-4 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>How It Works</h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Three simple steps to start your learning journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className={`p-8 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800/50 border-cyan-500/30' : 'bg-white border-cyan-200'}`}>
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}>
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-center mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create Your Profile</h3>
              <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sign up and showcase your skills and interests to the community</p>
            </div>
            
            {/* Step 2 */}
            <div className={`p-8 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800/50 border-cyan-500/30' : 'bg-white border-cyan-200'}`}>
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' }}>
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-center mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Share Resources</h3>
              <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Contribute valuable learning materials and tutorials</p>
            </div>
            
            {/* Step 3 */}
            <div className={`p-8 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800/50 border-cyan-500/30' : 'bg-white border-cyan-200'}`}>
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)' }}>
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-center mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Discover & Learn</h3>
              <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Browse curated resources and expand your knowledge</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - "Loved by Community Members" */}
      <section className={`py-20 px-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Loved by Community Members</h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>See what our community has to say about their experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className={`p-8 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800/50 border-cyan-500/30' : 'bg-white border-cyan-200'}`}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className={`mb-6 italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                "This platform has been a game changer for me! I've learned so much from the community and made great connections."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white">
                  SM
                </div>
                <div>
                  <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Sarah Martinez</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Web Developer</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className={`p-8 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800/50 border-cyan-500/30' : 'bg-white border-cyan-200'}`}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className={`mb-6 italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                "I love how easy it is to find and share resources. The community is supportive and encouraging!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
                  JD
                </div>
                <div>
                  <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>James Davis</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Graphic Designer</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className={`p-8 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800/50 border-cyan-500/30' : 'bg-white border-cyan-200'}`}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className={`mb-6 italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                "The best place to share knowledge! I've improved my skills and helped others along the way."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white">
                  EP
                </div>
                <div>
                  <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Emily Patel</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Content Creator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-white mb-6 text-3xl md:text-5xl">Start Your Learning Journey Today</h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners and experts sharing knowledge daily. It's free to get started!
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('auth')}
              className="px-8 py-4 rounded-2xl bg-white text-cyan-600 hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-2xl border-2 border-white/50"
            >
              Create Free Account
            </button>
            
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-2xl border-2 border-white text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// ABOUT PAGE COMPONENT
// ============================================================================

/**
 * AboutPage - Information about the platform
 * Features: Mission statement, values, and community information
 */

type AboutPageProps = {
  darkMode: boolean;
};

export function AboutPage({ darkMode }: AboutPageProps) {
  return (
    <div className={`min-h-[calc(100vh-4rem)] py-12 px-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-cyan-50/30'}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`backdrop-blur-sm rounded-2xl shadow-xl p-8 border transition-colors duration-300 ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/50'}`}>
          <h1 className={`mb-6 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>About Us</h1>
          
          <div className="prose max-w-none">
            {/* Mission Section */}
            <section className="mb-8">
              <h2 className={`mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our Mission</h2>
              <p className={`mb-4 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Community Skill Swap Hub is dedicated to creating a vibrant ecosystem where individuals 
                can freely exchange knowledge, skills, and resources. We believe that everyone has something 
                valuable to teach and something new to learn.
              </p>
              <p className={`transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Our platform bridges the gap between those who want to share their expertise and those 
                eager to acquire new skills, fostering a community of continuous learning and mutual growth.
              </p>
            </section>

            {/* What We Do Section */}
            <section className="mb-8">
              <h2 className={`mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>What We Do</h2>
              <p className={`mb-4 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                We provide a user-friendly platform where community members can:
              </p>
              <ul className={`list-disc list-inside space-y-2 mb-4 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>Create profiles to showcase their skills and interests</li>
                <li>Share educational resources and learning materials</li>
                <li>Browse and discover resources across various categories</li>
                <li>Connect with like-minded individuals in their community</li>
                <li>Contribute to a growing knowledge base</li>
              </ul>
            </section>

            {/* Values Section */}
            <section className="mb-8">
              <h2 className={`mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`mb-2 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Community First</h3>
                  <p className={`transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    We prioritize building strong, supportive relationships within our community.
                  </p>
                </div>
                <div>
                  <h3 className={`mb-2 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Accessible Learning</h3>
                  <p className={`transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Knowledge should be accessible to everyone, regardless of background or resources.
                  </p>
                </div>
                <div>
                  <h3 className={`mb-2 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quality Content</h3>
                  <p className={`transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    We encourage sharing of high-quality, valuable resources that genuinely help others.
                  </p>
                </div>
                <div>
                  <h3 className={`mb-2 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Respectful Exchange</h3>
                  <p className={`transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    We foster an environment of mutual respect, where all contributions are valued.
                  </p>
                </div>
              </div>
            </section>

            {/* Join Section */}
            <section>
              <h2 className={`mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Join Our Community</h2>
              <p className={`mb-4 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Whether you're looking to share your expertise or learn something new, Community Skill Swap Hub 
                welcomes you. Together, we can build a stronger, more knowledgeable community where everyone 
                has the opportunity to grow and succeed.
              </p>
              <p className={`transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Start your journey today by creating a profile and exploring the wealth of resources 
                shared by our community members.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CONTACT PAGE COMPONENT
// ============================================================================

/**
 * ContactPage - Contact form and information
 * Features: Contact form with validation, contact information cards
 */

type ContactPageProps = {
  darkMode: boolean;
};

export function ContactPage({ darkMode }: ContactPageProps) {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className={`min-h-[calc(100vh-4rem)] py-12 px-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-cyan-50/30'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className={`mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact Us</h1>
          <p className={`max-w-2xl mx-auto transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Have questions or feedback? We'd love to hear from you. Send us a message and we'll 
            respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="space-y-6">
            {/* Email Card */}
            <div className={`backdrop-blur-sm rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/50'}`}>
              <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: darkMode ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)' }}>
                <Mail className="w-6 h-6" style={{ color: 'var(--theme-color)' }} />
              </div>
              <h3 className={`mb-2 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email</h3>
              <p className={`transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>support@skillswaphub.com</p>
            </div>

            {/* Location Card */}
            <div className={`backdrop-blur-sm rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/50'}`}>
              <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: darkMode ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)' }}>
                <MapPin className="w-6 h-6" style={{ color: 'var(--theme-color)' }} />
              </div>
              <h3 className={`mb-2 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Location</h3>
              <p className={`transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                123 Community Street<br />
                Your City, ST 12345
              </p>
            </div>

            {/* Response Time Card */}
            <div className={`backdrop-blur-sm rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/50'}`}>
              <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: darkMode ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)' }}>
                <MessageSquare className="w-6 h-6" style={{ color: 'var(--theme-color)' }} />
              </div>
              <h3 className={`mb-2 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Response Time</h3>
              <p className={`transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>We typically respond within 24-48 hours</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className={`backdrop-blur-sm rounded-2xl shadow-xl p-8 border transition-colors duration-300 ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/50'}`}>
              <h2 className={`mb-6 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Send us a Message</h2>
              
              {/* Success Message */}
              {submitted && (
                <div className={`mb-6 p-4 rounded-lg transition-colors duration-300 ${darkMode ? 'bg-green-900/30 text-green-400 border border-green-700' : 'bg-green-50 text-green-800 border border-green-200'}`}>
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block mb-2 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'}`}
                      style={{ '--tw-ring-color': 'var(--theme-color)' } as any}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={`block mb-2 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'}`}
                      style={{ '--tw-ring-color': 'var(--theme-color)' } as any}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className={`block mb-2 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'}`}
                    style={{ '--tw-ring-color': 'var(--theme-color)' } as any}
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={`block mb-2 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none transition-all duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'}`}
                    style={{ '--tw-ring-color': 'var(--theme-color)' } as any}
                    rows={6}
                    placeholder="Your message..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-white transition-colors"
                  style={{ backgroundColor: 'var(--theme-color)' }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}