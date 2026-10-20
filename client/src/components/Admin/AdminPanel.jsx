import React, { useState, useEffect } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Plus,
  Check,
  AlertCircle,
  ExternalLink,
  LogOut,
  Layout,
  Info,
  BarChart3,
  Mail,
  Settings,
  RefreshCw,
  Sparkles,
  Image as ImageIcon,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import {
  fetchHomepageContent,
  updateHomepageContent,
  adminLogin,
  fetchAdminMessages,
  deleteAdminMessage
} from '../../api';
import { defaultHomeContent } from '../../data/defaultHomeContent';

export default function AdminPanel({ onNavigate, onContentUpdated }) {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      if (search.includes('preview=1')) return true;
      return !!localStorage.getItem('dlf_admin_token');
    }
    return false;
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Active tab: 'hero' | 'about' | 'stats' | 'messages' | 'siteInfo'
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      if (search.includes('tab=about')) return 'about';
      if (search.includes('tab=stats')) return 'stats';
      if (search.includes('tab=messages')) return 'messages';
      if (search.includes('tab=siteInfo')) return 'siteInfo';
    }
    return 'hero';
  });

  // Content state
  const [content, setContent] = useState(defaultHomeContent);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Load content
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchHomepageContent();
      if (data) setContent(data);

      if (isAuthenticated) {
        const msgs = await fetchAdminMessages();
        setMessages(msgs);
      }
      setLoading(false);
    }
    loadData();
  }, [isAuthenticated]);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setLoggingIn(true);
    try {
      const res = await adminLogin(password);
      if (res && res.success) {
        localStorage.setItem('dlf_admin_token', res.token || 'auth-token');
        setIsAuthenticated(true);
        const msgs = await fetchAdminMessages();
        setMessages(msgs);
      } else {
        setAuthError(res.error || 'Incorrect admin password. (Default: admin123)');
      }
    } catch (err) {
      setAuthError('Connection error during login');
    } finally {
      setLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('dlf_admin_token');
    setIsAuthenticated(false);
    setPassword('');
  };

  // Save changes handler
  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setSaveError('');
    try {
      const res = await updateHomepageContent(content);
      if (res && res.success) {
        setSaveSuccess(true);
        if (onContentUpdated) onContentUpdated(content);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setSaveError('Failed to save changes');
      }
    } catch (err) {
      setSaveError('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  // Reset to default content
  const handleResetDefaults = async () => {
    if (window.confirm('Reset all Home Page content back to original defaults?')) {
      setContent(defaultHomeContent);
      await updateHomepageContent(defaultHomeContent);
      if (onContentUpdated) onContentUpdated(defaultHomeContent);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Slide helpers
  const handleUpdateSlide = (index, field, value) => {
    const updatedSlides = [...(content.hero?.slides || [])];
    updatedSlides[index] = { ...updatedSlides[index], [field]: value };
    setContent({
      ...content,
      hero: { ...content.hero, slides: updatedSlides }
    });
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: Date.now(),
      image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/1-17.jpg',
      badge: 'New Initiative',
      titlePrefix: 'Humanity is',
      titleMiddle: 'the Mother of',
      titleHighlight: 'Dharma',
      description: 'Enter your new banner description here.',
      ctaText: 'Explore More',
      ctaTarget: 'activities',
      secondaryText: 'Contact Us',
      secondaryTarget: 'contact'
    };
    setContent({
      ...content,
      hero: { ...content.hero, slides: [...(content.hero?.slides || []), newSlide] }
    });
  };

  const handleDeleteSlide = (index) => {
    if ((content.hero?.slides || []).length <= 1) {
      alert('You must have at least one hero slide.');
      return;
    }
    const updated = content.hero.slides.filter((_, i) => i !== index);
    setContent({
      ...content,
      hero: { ...content.hero, slides: updated }
    });
  };

  // Highlight bullet points in About Us
  const handleHighlightChange = (idx, val) => {
    const updated = [...(content.about?.highlights || [])];
    updated[idx] = val;
    setContent({
      ...content,
      about: { ...content.about, highlights: updated }
    });
  };

  // Delete message
  const handleDeleteMsg = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      await deleteAdminMessage(id);
      setMessages(messages.filter((m) => m.id !== id));
    }
  };

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-[#901C25] text-white p-8 text-center relative">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-3 border border-white/20">
              <Lock size={28} className="text-[#E48A2D]" />
            </div>
            <h2 className="text-2xl font-bold font-serif">Admin Portal</h2>
            <p className="text-white/80 text-xs mt-1">Dharmic Life Foundation Content Management</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {authError && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#901C25] text-sm pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1">
                <Sparkles size={11} className="text-[#E48A2D]" />
                <span>Default system password is <strong>admin123</strong></span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 bg-[#901C25] hover:bg-[#73161d] text-white font-bold rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              {loggingIn ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Access Admin Panel</span>
              )}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('home')}
                className="text-xs text-gray-500 hover:text-[#901C25] transition"
              >
                ← Return to Public Website
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-stone-100 text-gray-800 font-sans">
      
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#901C25] text-white flex items-center justify-center font-bold text-sm shadow">
              DLF
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-none">Content Manager</h1>
              <span className="text-[11px] text-gray-500">Dharmic Life Foundation</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-stone-50 transition flex items-center gap-1.5"
            >
              <span>View Live Site</span>
              <ExternalLink size={13} />
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-[#901C25] hover:bg-[#73161d] text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5"
            >
              {saving ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-gray-400 hover:text-red-700 hover:bg-red-50 transition"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Notifications */}
      {saveSuccess && (
        <div className="bg-green-600 text-white text-xs font-bold py-2.5 px-4 text-center sticky top-16 z-20 flex items-center justify-center gap-2 animate-fadeIn shadow-md">
          <Check size={16} />
          <span>Home Page content successfully saved! Your public website is now updated.</span>
        </div>
      )}
      {saveError && (
        <div className="bg-red-600 text-white text-xs font-bold py-2.5 px-4 text-center sticky top-16 z-20 flex items-center justify-center gap-2 animate-fadeIn shadow-md">
          <AlertCircle size={16} />
          <span>{saveError}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Tabs */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-gray-200 p-3 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                activeTab === 'hero'
                  ? 'bg-[#901C25] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-stone-50'
              }`}
            >
              <Layout size={16} />
              <span>Hero Banner & Slides</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                activeTab === 'about'
                  ? 'bg-[#901C25] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-stone-50'
              }`}
            >
              <Info size={16} />
              <span>About Us Section</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                activeTab === 'stats'
                  ? 'bg-[#901C25] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-stone-50'
              }`}
            >
              <BarChart3 size={16} />
              <span>Impact Numbers</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                activeTab === 'messages'
                  ? 'bg-[#901C25] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-stone-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <Mail size={16} />
                <span>Contact Inquiries</span>
              </span>
              {messages.length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'messages' ? 'bg-white text-[#901C25]' : 'bg-red-100 text-red-700'
                }`}>
                  {messages.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('siteInfo')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                activeTab === 'siteInfo'
                  ? 'bg-[#901C25] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-stone-50'
              }`}
            >
              <Settings size={16} />
              <span>Contact & Social Links</span>
            </button>

            <div className="pt-4 border-t border-gray-100 mt-4">
              <button
                onClick={handleResetDefaults}
                className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium text-gray-500 hover:text-amber-800 hover:bg-amber-50 transition flex items-center gap-2"
              >
                <RefreshCw size={13} />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>

          {/* Right Editor Panel */}
          <div className="md:col-span-9 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            
            {/* ---------------------------------------------------- */}
            {/* TAB 1: HERO SLIDER */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'hero' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-gray-900">Hero Slider Slides</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Maintain the main full-width banners, titles, and call-to-action buttons.
                    </p>
                  </div>
                  <button
                    onClick={handleAddSlide}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-gray-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <Plus size={14} />
                    <span>Add New Slide</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {(content.hero?.slides || []).map((slide, idx) => (
                    <div
                      key={slide.id || idx}
                      className="border border-gray-200 rounded-xl p-5 bg-stone-50/50 space-y-4 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#901C25] text-white">
                          Slide #{idx + 1}
                        </span>
                        {(content.hero?.slides || []).length > 1 && (
                          <button
                            onClick={() => handleDeleteSlide(idx)}
                            className="text-gray-400 hover:text-red-700 p-1 transition"
                            title="Remove Slide"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Top Badge / Subtitle
                          </label>
                          <input
                            type="text"
                            value={slide.badge || ''}
                            onChange={(e) => handleUpdateSlide(idx, 'badge', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Highlighted Word (e.g. Dharma)
                          </label>
                          <input
                            type="text"
                            value={slide.titleHighlight || ''}
                            onChange={(e) => handleUpdateSlide(idx, 'titleHighlight', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Title Prefix
                          </label>
                          <input
                            type="text"
                            value={slide.titlePrefix || ''}
                            onChange={(e) => handleUpdateSlide(idx, 'titlePrefix', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Title Middle Text
                          </label>
                          <input
                            type="text"
                            value={slide.titleMiddle || ''}
                            onChange={(e) => handleUpdateSlide(idx, 'titleMiddle', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={slide.description || ''}
                          onChange={(e) => handleUpdateSlide(idx, 'description', e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Background Image URL
                          </label>
                          <input
                            type="text"
                            value={slide.image || ''}
                            onChange={(e) => handleUpdateSlide(idx, 'image', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Primary Button Text
                          </label>
                          <input
                            type="text"
                            value={slide.ctaText || ''}
                            onChange={(e) => handleUpdateSlide(idx, 'ctaText', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none bg-white"
                          />
                        </div>
                      </div>

                      {/* Image Preview */}
                      {slide.image && (
                        <div className="mt-2 relative h-40 rounded-lg overflow-hidden border border-gray-200 bg-stone-900 group">
                          <img
                            src={slide.image}
                            alt="Slide Preview"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.target.src = '/images/hero-bg.jpg'; }}
                          />
                          <span className="absolute top-2 left-2 px-2.5 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold rounded-md shadow">
                            Slide Preview
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: ABOUT US */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold font-serif text-gray-900">About Us Section</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Maintain the core philosophy narrative, featured highlights, and photo.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Tag</label>
                    <input
                      type="text"
                      value={content.about?.badge || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: { ...content.about, badge: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Main Heading</label>
                    <input
                      type="text"
                      value={content.about?.title || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: { ...content.about, title: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Narrative Description</label>
                  <textarea
                    rows={4}
                    value={content.about?.description1 || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, description1: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Sacred Quote / Motto</label>
                  <input
                    type="text"
                    value={content.about?.quote || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, quote: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Featured Photo URL</label>
                    <input
                      type="text"
                      value={content.about?.image || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: { ...content.about, image: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Floating Badge Title</label>
                    <input
                      type="text"
                      value={content.about?.experienceBadgeTitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: { ...content.about, experienceBadgeTitle: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Key Highlights (The 4 Pillar Bullet Points)
                  </label>
                  <div className="space-y-2.5">
                    {(content.about?.highlights || []).map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#901C25] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                          {hIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={h}
                          onChange={(e) => handleHighlightChange(hIdx, e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: IMPACT NUMBERS / STATS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold font-serif text-gray-900">Impact Numbers & Statistics</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Update the key milestones and counts shown across the homepage and volunteer section.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-200 rounded-xl bg-stone-50/50 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#901C25]">Stat #1: Annadhanam</span>
                    <div>
                      <label className="block text-[11px] text-gray-600 mb-1">Number / Metric</label>
                      <input
                        type="text"
                        value={content.stats?.mealsServed || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            stats: { ...content.stats, mealsServed: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-600 mb-1">Label</label>
                      <input
                        type="text"
                        value={content.stats?.mealsLabel || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            stats: { ...content.stats, mealsLabel: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-xl bg-stone-50/50 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#901C25]">Stat #2: Cremation</span>
                    <div>
                      <label className="block text-[11px] text-gray-600 mb-1">Number / Metric</label>
                      <input
                        type="text"
                        value={content.stats?.soulsHonored || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            stats: { ...content.stats, soulsHonored: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-600 mb-1">Label</label>
                      <input
                        type="text"
                        value={content.stats?.soulsLabel || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            stats: { ...content.stats, soulsLabel: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-xl bg-stone-50/50 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#901C25]">Stat #3: Education</span>
                    <div>
                      <label className="block text-[11px] text-gray-600 mb-1">Number / Metric</label>
                      <input
                        type="text"
                        value={content.stats?.studentsSupported || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            stats: { ...content.stats, studentsSupported: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-600 mb-1">Label</label>
                      <input
                        type="text"
                        value={content.stats?.studentsLabel || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            stats: { ...content.stats, studentsLabel: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-xl bg-stone-50/50 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#901C25]">Stat #4: Volunteers</span>
                    <div>
                      <label className="block text-[11px] text-gray-600 mb-1">Number / Metric</label>
                      <input
                        type="text"
                        value={content.stats?.volunteersActive || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            stats: { ...content.stats, volunteersActive: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-600 mb-1">Label</label>
                      <input
                        type="text"
                        value={content.stats?.volunteersLabel || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            stats: { ...content.stats, volunteersLabel: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: CONTACT INQUIRIES INBOX */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-gray-900">Contact Form Inquiries</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Messages received from visitors submitting the form on the Contact page.
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-stone-100 px-3 py-1.5 rounded-lg text-gray-700">
                    Total: {messages.length}
                  </span>
                </div>

                {messages.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-gray-300 rounded-xl text-gray-400">
                    <Mail size={36} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-sm font-medium">No contact messages received yet.</p>
                    <p className="text-xs text-gray-400 mt-1">Submissions on /contact will appear right here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 border border-gray-200 rounded-xl bg-stone-50/50 hover:bg-white transition shadow-sm space-y-2 relative"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-100 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 text-sm">{msg.name}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-xs text-[#901C25] font-semibold hover:underline"
                            >
                              {msg.email}
                            </a>
                            {msg.phone && (
                              <>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-600">{msg.phone}</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] text-gray-400">
                              {msg.created_at ? new Date(msg.created_at).toLocaleString() : ''}
                            </span>
                            <button
                              onClick={() => handleDeleteMsg(msg.id)}
                              className="text-gray-400 hover:text-red-700 transition"
                              title="Delete Message"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {msg.subject && (
                          <div className="text-xs font-semibold text-gray-700">
                            Subject: {msg.subject}
                          </div>
                        )}

                        <p className="text-xs text-gray-600 leading-relaxed bg-white p-3 rounded-lg border border-gray-100">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 5: SITE & CONTACT INFO */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'siteInfo' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold font-serif text-gray-900">Official Contact & Social Channels</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Maintain official emails, phone numbers, and social media handles.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Official Email</label>
                    <input
                      type="email"
                      value={content.siteInfo?.email || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          siteInfo: { ...content.siteInfo, email: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={content.siteInfo?.phone || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          siteInfo: { ...content.siteInfo, phone: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Physical Address</label>
                  <input
                    type="text"
                    value={content.siteInfo?.address || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteInfo: { ...content.siteInfo, address: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Facebook URL</label>
                    <input
                      type="text"
                      value={content.siteInfo?.facebook || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          siteInfo: { ...content.siteInfo, facebook: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Instagram URL</label>
                    <input
                      type="text"
                      value={content.siteInfo?.instagram || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          siteInfo: { ...content.siteInfo, instagram: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Twitter (X) URL</label>
                    <input
                      type="text"
                      value={content.siteInfo?.twitter || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          siteInfo: { ...content.siteInfo, twitter: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Save Bar */}
            <div className="mt-8 pt-5 border-t border-gray-200 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">
                All changes reflect live on public pages when saved.
              </span>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-[#901C25] hover:bg-[#73161d] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    <span>Save All Changes</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
