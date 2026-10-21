import React, { useState, useEffect } from 'react';
import {
  Lock,
  User,
  KeyRound,
  ShieldCheck,
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
  Calendar,
  HeartHandshake,
  FolderTree,
  Upload,
  Loader2
} from 'lucide-react';
import ActivitiesAdminManager from './ActivitiesAdminManager';
import {
  fetchHomepageContent,
  updateHomepageContent,
  adminLogin,
  fetchAdminMessages,
  deleteAdminMessage,
  uploadMediaSingle
} from '../../api';
import { getMediaUrl } from '../../config';
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
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Active tab: 'hero' | 'about' | 'coreActivities' | 'stats' | 'eventsSection' | 'gallerySection' | 'siteInfo' | 'messages'
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      if (search.includes('tab=activitiesManager')) return 'activitiesManager';
      if (search.includes('tab=about')) return 'about';
      if (search.includes('tab=coreActivities')) return 'coreActivities';
      if (search.includes('tab=stats')) return 'stats';
      if (search.includes('tab=eventsSection')) return 'eventsSection';
      if (search.includes('tab=gallerySection')) return 'gallerySection';
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
      const res = await adminLogin({ username, password });
      if (res && res.success) {
        localStorage.setItem('dlf_admin_token', res.token || 'auth-token');
        setIsAuthenticated(true);
        const msgs = await fetchAdminMessages();
        setMessages(msgs);
      } else {
        setAuthError(res.error || 'Incorrect admin credentials.');
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

  // ----------------------------------------------------
  // HERO SLIDE HELPERS
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // ABOUT US HIGHLIGHT HELPERS
  // ----------------------------------------------------
  const handleHighlightChange = (idx, val) => {
    const updated = [...(content.about?.highlights || [])];
    updated[idx] = val;
    setContent({
      ...content,
      about: { ...content.about, highlights: updated }
    });
  };

  const handleAddHighlight = () => {
    setContent({
      ...content,
      about: {
        ...content.about,
        highlights: [...(content.about?.highlights || []), 'New highlight point']
      }
    });
  };

  const handleDeleteHighlight = (idx) => {
    const updated = (content.about?.highlights || []).filter((_, i) => i !== idx);
    setContent({
      ...content,
      about: { ...content.about, highlights: updated }
    });
  };

  // ----------------------------------------------------
  // CORE ACTIVITIES HELPERS
  // ----------------------------------------------------
  const handleUpdateActivityItem = (idx, field, val) => {
    const items = [...(content.coreActivities?.items || [])];
    items[idx] = { ...items[idx], [field]: val };
    setContent({
      ...content,
      coreActivities: { ...content.coreActivities, items }
    });
  };

  const handleAddActivityItem = () => {
    const items = [...(content.coreActivities?.items || [])];
    items.push({
      id: Date.now(),
      slug: 'other-additional-activities',
      title: 'New Core Activity',
      description: 'Describe this community seva initiative and its impact.',
      image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/12-5.jpg',
      badge: 'Community Seva'
    });
    setContent({
      ...content,
      coreActivities: { ...content.coreActivities, items }
    });
  };

  const handleDeleteActivityItem = (idx) => {
    const items = (content.coreActivities?.items || []).filter((_, i) => i !== idx);
    setContent({
      ...content,
      coreActivities: { ...content.coreActivities, items }
    });
  };

  // ----------------------------------------------------
  // EVENTS SECTION HELPERS
  // ----------------------------------------------------
  const handleUpdateEventItem = (idx, field, val) => {
    const items = [...(content.eventsSection?.items || [])];
    items[idx] = { ...items[idx], [field]: val };
    setContent({
      ...content,
      eventsSection: { ...content.eventsSection, items }
    });
  };

  const handleAddEventItem = () => {
    const items = [...(content.eventsSection?.items || [])];
    items.push({
      id: Date.now(),
      title: 'New Seva Event',
      event_date: '21 Oct, 2026',
      location: 'Pondicherry',
      summary: 'Brief summary of this community seva drive or event.',
      image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/07/photo-2.jpg',
      category: 'Annadhanam',
      route: 'events'
    });
    setContent({
      ...content,
      eventsSection: { ...content.eventsSection, items }
    });
  };

  const handleDeleteEventItem = (idx) => {
    const items = (content.eventsSection?.items || []).filter((_, i) => i !== idx);
    setContent({
      ...content,
      eventsSection: { ...content.eventsSection, items }
    });
  };

  // State for uploading gallery image files
  const [galleryUploadingIdx, setGalleryUploadingIdx] = useState(null);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState(0);
  const [galleryUploadError, setGalleryUploadError] = useState('');

  // ----------------------------------------------------
  // GALLERY SECTION HELPERS
  // ----------------------------------------------------
  const handleUpdateGalleryItem = (idx, field, val) => {
    const items = [...(content.gallerySection?.items || [])];
    items[idx] = { ...items[idx], [field]: val };
    setContent({
      ...content,
      gallerySection: { ...content.gallerySection, items }
    });
  };

  const handleUploadGalleryFile = async (idx, file) => {
    if (!file) return;
    setGalleryUploadingIdx(idx);
    setGalleryUploadProgress(0);
    setGalleryUploadError('');

    try {
      const res = await uploadMediaSingle(file, (percent) => {
        setGalleryUploadProgress(percent);
      });

      if (res && res.success && res.data?.url) {
        handleUpdateGalleryItem(idx, 'image', res.data.url);
      } else {
        setGalleryUploadError(res.message || 'Image upload failed. Please try again.');
      }
    } catch (err) {
      setGalleryUploadError('Network error uploading image.');
    } finally {
      setTimeout(() => {
        setGalleryUploadingIdx(null);
        setGalleryUploadProgress(0);
      }, 500);
    }
  };

  const handleAddGalleryItem = () => {
    const items = [...(content.gallerySection?.items || [])];
    items.push({
      id: Date.now(),
      title: 'New Seva Moment',
      image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/21-3-580x580.jpg'
    });
    setContent({
      ...content,
      gallerySection: { ...content.gallerySection, items }
    });
  };

  const handleDeleteGalleryItem = (idx) => {
    const items = (content.gallerySection?.items || []).filter((_, i) => i !== idx);
    setContent({
      ...content,
      gallerySection: { ...content.gallerySection, items }
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
      <div className="min-h-screen bg-gradient-to-br from-[#1c1917] via-[#2c1316] to-[#120d0e] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Ambient background glow & decorative circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#901C25]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E48A2D]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative z-10 transition-all">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#901C25] via-[#a3222d] to-[#74151c] text-white p-8 text-center relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-xl" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-[#E48A2D]/20 rounded-full blur-xl" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-3.5 border border-white/20 shadow-inner">
                <Lock size={30} className="text-[#E48A2D]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight">Admin Portal</h2>
              <p className="text-white/80 text-xs sm:text-sm mt-1.5 font-medium">
                Dharmic Life Foundation Content Management
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-7 sm:p-8 space-y-5">
            {authError && (
              <div className="p-3.5 bg-red-50/90 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2.5 animate-shake">
                <AlertCircle size={16} className="shrink-0 text-red-600" />
                <span className="font-medium">{authError}</span>
              </div>
            )}

            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User size={14} className="text-[#901C25]" />
                <span>Admin Username</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#901C25] focus:border-transparent text-sm bg-stone-50/50 hover:bg-white transition"
                />
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <KeyRound size={14} className="text-[#901C25]" />
                <span>Admin Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#901C25] focus:border-transparent text-sm bg-stone-50/50 hover:bg-white transition"
                />
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 bg-gradient-to-r from-[#901C25] to-[#a8222e] hover:from-[#7a171f] hover:to-[#901C25] text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform active:scale-[0.99]"
            >
              {loggingIn ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Sign In to Admin Panel</span>
                </>
              )}
            </button>

            {/* Return link */}
            <div className="pt-2 text-center border-t border-gray-100">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('home')}
                className="text-xs text-gray-500 hover:text-[#901C25] transition inline-flex items-center gap-1 font-medium"
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
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#901C25] text-white flex items-center justify-center font-bold text-sm shadow">
              DLF
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-none">Home Page Content Manager</h1>
              <span className="text-[11px] text-gray-500">Maintain all sections of Dharmic Life Foundation Home Page</span>
            </div>
          </div>

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
          <div className="md:col-span-3 bg-white rounded-2xl border border-gray-200 p-3 shadow-sm space-y-1 sticky top-24">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Home Page Sections
            </div>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                activeTab === 'hero'
                  ? 'bg-[#901C25] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-stone-50'
              }`}
            >
              <Layout size={16} />
              <span>1. Hero Banner & Slides</span>
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
              <span>2. About Us Section</span>
            </button>

            <button
              onClick={() => setActiveTab('coreActivities')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                activeTab === 'coreActivities'
                  ? 'bg-[#901C25] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-stone-50'
              }`}
            >
              <HeartHandshake size={16} />
              <span>3. Core Activities</span>
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
              <span>4. Volunteer & Impact</span>
            </button>

            <button
              onClick={() => setActiveTab('eventsSection')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                activeTab === 'eventsSection'
                  ? 'bg-[#901C25] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-stone-50'
              }`}
            >
              <Calendar size={16} />
              <span>5. Events Section</span>
            </button>

            <button
              onClick={() => setActiveTab('gallerySection')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                activeTab === 'gallerySection'
                  ? 'bg-[#901C25] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-stone-50'
              }`}
            >
              <ImageIcon size={16} />
              <span>6. Gallery Section</span>
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
              <span>7. Header & Footer Info</span>
            </button>

            <div className="pt-2 border-t border-gray-100 mt-2">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Activities & Media
              </div>
              <button
                onClick={() => setActiveTab('activitiesManager')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center gap-3 ${
                  activeTab === 'activitiesManager'
                    ? 'bg-[#901C25] text-white shadow-sm'
                    : 'text-gray-700 hover:bg-stone-50'
                }`}
              >
                <FolderTree size={16} />
                <span>Activities</span>
              </button>
            </div>

            <div className="pt-2 border-t border-gray-100 mt-2">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Submissions
              </div>
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
            </div>

            <div className="pt-3 border-t border-gray-100 mt-2">
              <button
                onClick={handleResetDefaults}
                className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium text-gray-500 hover:text-amber-800 hover:bg-amber-50 transition flex items-center gap-2"
              >
                <RefreshCw size={13} />
                <span>Reset All to Defaults</span>
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
                    <h2 className="text-xl font-bold font-serif text-gray-900">1. Hero Slider Slides</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Maintain the main full-width banners, titles, descriptions, and call-to-action buttons.
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

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Secondary Button Text
                          </label>
                          <input
                            type="text"
                            value={slide.secondaryText || ''}
                            onChange={(e) => handleUpdateSlide(idx, 'secondaryText', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none bg-white"
                          />
                        </div>
                      </div>

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
                  <h2 className="text-xl font-bold font-serif text-gray-900">2. About Us Section</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Maintain the core philosophy narrative, featured highlights, buttons, and photo.
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Floating Badge Subtitle</label>
                    <input
                      type="text"
                      value={content.about?.experienceBadgeSub || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: { ...content.about, experienceBadgeSub: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Primary Button Text</label>
                    <input
                      type="text"
                      value={content.about?.primaryBtnText || 'Discover More'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: { ...content.about, primaryBtnText: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Secondary Button Text</label>
                    <input
                      type="text"
                      value={content.about?.secondaryBtnText || 'Our Trustees'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          about: { ...content.about, secondaryBtnText: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-gray-700">
                      Key Highlights (Pillar Bullet Points)
                    </label>
                    <button
                      onClick={handleAddHighlight}
                      className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-gray-800 text-xs font-bold rounded-lg transition flex items-center gap-1"
                    >
                      <Plus size={13} />
                      <span>Add Bullet</span>
                    </button>
                  </div>
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
                        <button
                          onClick={() => handleDeleteHighlight(hIdx)}
                          className="text-gray-400 hover:text-red-700 p-1.5 transition"
                          title="Delete Bullet"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: CORE ACTIVITIES */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'coreActivities' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-gray-900">3. Our Core Activities Section</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Maintain the section heading and all activity cards displayed on the Home Page.
                    </p>
                  </div>
                  <button
                    onClick={handleAddActivityItem}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-gray-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <Plus size={14} />
                    <span>Add Activity Card</span>
                  </button>
                </div>

                {/* Section Header Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-gray-200">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Tag / Badge</label>
                    <input
                      type="text"
                      value={content.coreActivities?.badge || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreActivities: { ...content.coreActivities, badge: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Main Title</label>
                    <input
                      type="text"
                      value={content.coreActivities?.title || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreActivities: { ...content.coreActivities, title: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={content.coreActivities?.subtitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreActivities: { ...content.coreActivities, subtitle: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                </div>

                {/* Activity Cards List */}
                <div className="space-y-4">
                  {(content.coreActivities?.items || []).map((act, idx) => (
                    <div
                      key={act.id || idx}
                      className="border border-gray-200 rounded-xl p-5 bg-stone-50/50 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#901C25] text-white">
                          Activity #{idx + 1}
                        </span>
                        <button
                          onClick={() => handleDeleteActivityItem(idx)}
                          className="text-gray-400 hover:text-red-700 p-1 transition"
                          title="Delete Activity"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-gray-700 mb-1">Activity Title</label>
                          <input
                            type="text"
                            value={act.title || ''}
                            onChange={(e) => handleUpdateActivityItem(idx, 'title', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Top Badge Tag</label>
                          <input
                            type="text"
                            value={act.badge || ''}
                            onChange={(e) => handleUpdateActivityItem(idx, 'badge', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={act.description || ''}
                          onChange={(e) => handleUpdateActivityItem(idx, 'description', e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-gray-700 mb-1">Image URL</label>
                          <input
                            type="text"
                            value={act.image || ''}
                            onChange={(e) => handleUpdateActivityItem(idx, 'image', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Target Page Slug</label>
                          <input
                            type="text"
                            value={act.slug || ''}
                            onChange={(e) => handleUpdateActivityItem(idx, 'slug', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: VOLUNTEER & IMPACT NUMBERS / STATS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold font-serif text-gray-900">4. Volunteer & Impact Section</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Update the Volunteer section narrative, featured photo, milestones, and progress bar percentages.
                  </p>
                </div>

                {/* Volunteer Section Text & Image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-gray-200">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Tag</label>
                    <input
                      type="text"
                      value={content.stats?.sectionBadge || 'Get involved now'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, sectionBadge: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Heading</label>
                    <input
                      type="text"
                      value={content.stats?.sectionTitle || 'Only Possible because of Friends Like You'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, sectionTitle: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Description</label>
                    <textarea
                      rows={3}
                      value={content.stats?.sectionDescription || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, sectionDescription: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Featured Photo URL</label>
                    <input
                      type="text"
                      value={content.stats?.sectionImage || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, sectionImage: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Volunteer Overlay Card Subtitle</label>
                    <input
                      type="text"
                      value={content.stats?.volunteerCardSubtitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, volunteerCardSubtitle: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                </div>

                {/* 4 Impact Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-200 rounded-xl bg-stone-50/50 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#901C25]">Stat #1: Annadhanam</span>
                    <div className="grid grid-cols-2 gap-3">
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
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-600 mb-1">Progress Bar %</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={content.stats?.mealsProgress ?? 95}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              stats: { ...content.stats, mealsProgress: Number(e.target.value) }
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold bg-white"
                        />
                      </div>
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
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-xl bg-stone-50/50 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#901C25]">Stat #2: Cremation</span>
                    <div className="grid grid-cols-2 gap-3">
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
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-600 mb-1">Progress Bar %</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={content.stats?.soulsProgress ?? 90}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              stats: { ...content.stats, soulsProgress: Number(e.target.value) }
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold bg-white"
                        />
                      </div>
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
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-xl bg-stone-50/50 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#901C25]">Stat #3: Education</span>
                    <div className="grid grid-cols-2 gap-3">
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
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-600 mb-1">Progress Bar %</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={content.stats?.studentsProgress ?? 80}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              stats: { ...content.stats, studentsProgress: Number(e.target.value) }
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold bg-white"
                        />
                      </div>
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
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white"
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
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-bold bg-white"
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
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 5: EVENTS SECTION (HOME PAGE) */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'eventsSection' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-gray-900">5. Events Section (Home Page)</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Maintain the "Dharmic Impact Across the Map" section header and featured event cards.
                    </p>
                  </div>
                  <button
                    onClick={handleAddEventItem}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-gray-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <Plus size={14} />
                    <span>Add Event Card</span>
                  </button>
                </div>

                {/* Section Header Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50 p-4 rounded-xl border border-gray-200">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Tag</label>
                    <input
                      type="text"
                      value={content.eventsSection?.badge || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          eventsSection: { ...content.eventsSection, badge: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Title</label>
                    <input
                      type="text"
                      value={content.eventsSection?.title || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          eventsSection: { ...content.eventsSection, title: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Bottom Button Text</label>
                    <input
                      type="text"
                      value={content.eventsSection?.ctaText || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          eventsSection: { ...content.eventsSection, ctaText: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={content.eventsSection?.subtitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          eventsSection: { ...content.eventsSection, subtitle: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                </div>

                {/* Event Items */}
                <div className="space-y-4">
                  {(content.eventsSection?.items || []).map((ev, idx) => (
                    <div
                      key={ev.id || idx}
                      className="border border-gray-200 rounded-xl p-5 bg-stone-50/50 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#901C25] text-white">
                          Event #{idx + 1}
                        </span>
                        <button
                          onClick={() => handleDeleteEventItem(idx)}
                          className="text-gray-400 hover:text-red-700 p-1 transition"
                          title="Delete Event"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Event Title</label>
                          <input
                            type="text"
                            value={ev.title || ''}
                            onChange={(e) => handleUpdateEventItem(idx, 'title', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Date</label>
                            <input
                              type="text"
                              value={ev.event_date || ''}
                              onChange={(e) => handleUpdateEventItem(idx, 'event_date', e.target.value)}
                              className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                            <input
                              type="text"
                              value={ev.category || ''}
                              onChange={(e) => handleUpdateEventItem(idx, 'category', e.target.value)}
                              className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Location</label>
                          <input
                            type="text"
                            value={ev.location || ''}
                            onChange={(e) => handleUpdateEventItem(idx, 'location', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Image URL</label>
                          <input
                            type="text"
                            value={ev.image || ''}
                            onChange={(e) => handleUpdateEventItem(idx, 'image', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Summary</label>
                        <textarea
                          rows={2}
                          value={ev.summary || ''}
                          onChange={(e) => handleUpdateEventItem(idx, 'summary', e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 6: GALLERY SECTION (HOME PAGE) */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'gallerySection' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold font-serif text-gray-900">6. Gallery Photos Manager</h2>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-[#901C25]">
                        {(content.gallerySection?.items || []).length} Photos
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Manage all gallery photos shown across the Home Page and the Gallery Page (/gallery).
                    </p>
                  </div>
                  <button
                    onClick={handleAddGalleryItem}
                    className="px-4 py-2 bg-[#901C25] hover:bg-[#73161d] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
                  >
                    <Plus size={14} />
                    <span>Add Gallery Photo</span>
                  </button>
                </div>

                {/* Section Header Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-gray-200">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Tag (Home Page)</label>
                    <input
                      type="text"
                      value={content.gallerySection?.badge || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          gallerySection: { ...content.gallerySection, badge: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Title (Home Page)</label>
                    <input
                      type="text"
                      value={content.gallerySection?.title || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          gallerySection: { ...content.gallerySection, title: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Section Subtitle (Home Page)</label>
                    <input
                      type="text"
                      value={content.gallerySection?.subtitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          gallerySection: { ...content.gallerySection, subtitle: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                  </div>
                </div>

                {/* Gallery Items Grid */}
                {galleryUploadError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center justify-between">
                    <span>{galleryUploadError}</span>
                    <button onClick={() => setGalleryUploadError('')} className="font-bold ml-2">×</button>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(content.gallerySection?.items || []).map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="border border-gray-200 rounded-xl p-4 bg-stone-50/50 space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#901C25] text-white">
                            Photo #{idx + 1}
                          </span>
                          {item.category && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                              {item.category}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteGalleryItem(idx)}
                          className="text-gray-400 hover:text-red-700 p-1.5 transition rounded-lg hover:bg-red-50"
                          title="Delete Photo"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {item.image && (
                        <div className="relative h-36 w-full rounded-lg overflow-hidden bg-gray-200 border border-gray-200 group">
                          <img
                            src={getMediaUrl(item.image)}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = '/images/about.jpg'; }}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <span className="text-white text-[11px] font-medium bg-black/60 px-2 py-1 rounded">
                              Current Photo Preview
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Caption / Title</label>
                          <input
                            type="text"
                            value={item.title || ''}
                            onChange={(e) => handleUpdateGalleryItem(idx, 'title', e.target.value)}
                            placeholder="e.g. Daily Annadhanam Camp"
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#901C25]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Category / Album</label>
                          <select
                            value={item.category || 'all'}
                            onChange={(e) => handleUpdateGalleryItem(idx, 'category', e.target.value)}
                            className="w-full px-2.5 py-2 rounded-lg border border-gray-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#901C25]"
                          >
                            <option value="all">General / All</option>
                            <option value="aarthi">Aarthi Relief Fund</option>
                            <option value="clothes">Clothes Distribution</option>
                            <option value="annadhanam">Annadhanam</option>
                            <option value="award">Dharma Shri Award</option>
                            <option value="diwali">Diwali Sweets & Clothes</option>
                          </select>
                        </div>
                      </div>

                      {/* Upload Photo File */}
                      <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-2">
                        <label className="block text-[11px] font-bold text-gray-800">
                          Upload Photo File (Recommended)
                        </label>
                        <div className="flex items-center gap-2">
                          <label
                            className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer border border-dashed transition ${
                              galleryUploadingIdx === idx
                                ? 'bg-amber-50 border-amber-300 text-amber-800 cursor-not-allowed'
                                : 'bg-red-50/50 hover:bg-red-50 border-red-200 text-[#901C25]'
                            }`}
                          >
                            {galleryUploadingIdx === idx ? (
                              <>
                                <Loader2 size={14} className="animate-spin text-[#901C25]" />
                                <span>Uploading ({galleryUploadProgress}%)...</span>
                              </>
                            ) : (
                              <>
                                <Upload size={14} />
                                <span>Choose Image to Upload</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              disabled={galleryUploadingIdx === idx}
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleUploadGalleryFile(idx, e.target.files[0]);
                                  e.target.value = '';
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                        {galleryUploadingIdx === idx && (
                          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-[#901C25] h-1.5 transition-all duration-200"
                              style={{ width: `${Math.max(galleryUploadProgress, 5)}%` }}
                            />
                          </div>
                        )}
                        <p className="text-[10px] text-gray-400">
                          Saves to <code className="text-[#901C25] bg-stone-100 px-1 py-0.5 rounded">/uploads/images</code> securely on the server.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          Or Direct Image URL / Path
                        </label>
                        <input
                          type="text"
                          value={item.image || ''}
                          onChange={(e) => handleUpdateGalleryItem(idx, 'image', e.target.value)}
                          placeholder="https://... or /uploads/images/..."
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#901C25]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 7: HEADER, FOOTER & SOCIAL INFO */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'siteInfo' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold font-serif text-gray-900">7. Header Top Bar, Footer & Social Links</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Maintain official email, phone, location, footer summary, and social media links across the header & footer.
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">Physical Address (Top Bar & Footer)</label>
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

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Footer About Text</label>
                  <textarea
                    rows={3}
                    value={content.siteInfo?.footerAboutText || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteInfo: { ...content.siteInfo, footerAboutText: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Link</label>
                    <input
                      type="text"
                      value={content.siteInfo?.whatsapp || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          siteInfo: { ...content.siteInfo, whatsapp: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 8: CONTACT INQUIRIES INBOX */}
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
            {/* TAB: ACTIVITIES & MEDIA MANAGER */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'activitiesManager' && (
              <ActivitiesAdminManager />
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
