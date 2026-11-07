import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Upload,
  Image as ImageIcon,
  Video,
  Check,
  AlertCircle,
  RefreshCw,
  X,
  ExternalLink,
  Layers,
  ChevronRight,
  FolderOpen,
  Database,
  Link,
  UploadCloud,
  FilePlus,
  Film
} from 'lucide-react';
import {
  fetchActivityItems,
  createActivityItem,
  updateActivityItem,
  deleteActivityItem,
  syncCategoryItems
} from '../../api';

// Static frontend datasets to display & allow 1-click sync to DB
import { annadhanamDrives } from '../../data/annadhanamDrives';
import { unclaimedSoulsDrives } from '../../data/unclaimedSoulsDrives';
import { dharmicLifeClasses } from '../../data/dharmicLifeClasses';
import { educationSupportDrives } from '../../data/educationSupportDrives';
import { womenEmpowermentDrives } from '../../data/womenEmpowermentDrives';
import { homelessDrives } from '../../data/homelessDrives';
import { otherActivitiesDrives } from '../../data/otherActivitiesDrives';

const STATIC_DATA_MAP = {
  'annadhanam': annadhanamDrives,
  'unclaimed-souls': unclaimedSoulsDrives,
  'spreading-the-dharmic-way-of-life': dharmicLifeClasses,
  'education-support': educationSupportDrives,
  'women-empowerment': womenEmpowermentDrives,
  'caring-for-homeless-people': homelessDrives,
  'other-additional-activities': otherActivitiesDrives
};

export const ACTIVITY_SUBMENUS = [
  { slug: 'annadhanam', name: 'Annadhanam', desc: 'When Hunger ends, Dharma begins' },
  { slug: 'unclaimed-souls', name: 'Unclaimed Souls', desc: 'Honoring Unclaimed Souls with Dignified Cremation' },
  { slug: 'spreading-the-dharmic-way-of-life', name: 'Spreading the Dharmic way of life', desc: 'Classes, Spiritual Workshops & Value Education' },
  { slug: 'education-support', name: 'Educational Support', desc: 'Student Sponsorship & Government College Drives' },
  { slug: 'women-empowerment', name: 'Women Empowerment', desc: 'Livelihood Training & Self-Reliance Programmes' },
  { slug: 'caring-for-homeless-people', name: 'Caring for Homeless People', desc: 'Street Welfare, Clothes & Healthcare Drives' },
  { slug: 'other-additional-activities', name: 'Other Additional Activities', desc: 'Tree Plantation, Medical Camps & Relief' }
];

export default function ActivitiesAdminManager() {
  const [selectedSubmenu, setSelectedSubmenu] = useState(ACTIVITY_SUBMENUS[0].slug);
  const [items, setItems] = useState(() => STATIC_DATA_MAP[ACTIVITY_SUBMENUS[0].slug] || []);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form state
  const [editingId, setEditingId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const [selectedVideoFiles, setSelectedVideoFiles] = useState([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Load items when sub-category changes (instant render + background DB sync)
  const loadCategoryItems = async (slug) => {
    setIsRefreshing(true);
    try {
      const data = await fetchActivityItems(slug);
      if (data && data.length > 0) {
        setItems(data);
      }
    } catch (e) {
      console.warn('Background sync failed:', e);
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Instant switch to category static data (0ms delay)
    const initialStatic = STATIC_DATA_MAP[selectedSubmenu] || [];
    setItems(initialStatic);
    loadCategoryItems(selectedSubmenu);
    resetForm();
  }, [selectedSubmenu]);

  const resetForm = () => {
    setEditingId(null);
    setFormTitle('');
    setFormContent('');
    setExistingImages([]);
    setExistingVideos([]);
    setSelectedImageFiles([]);
    setSelectedVideoFiles([]);
    setImageUrlInput('');
    setVideoUrlInput('');
    setShowAddForm(false);
    setUploadProgress(0);
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setFormTitle(item.title || '');
    setFormContent(item.content || '');
    setExistingImages(Array.isArray(item.images) ? [...item.images] : []);
    setExistingVideos(Array.isArray(item.videos) ? [...item.videos] : []);
    setSelectedImageFiles([]);
    setSelectedVideoFiles([]);
    setImageUrlInput('');
    setVideoUrlInput('');
    setShowAddForm(true);
    setUploadProgress(0);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Manage existing images & videos
  const handleRemoveExistingImage = (indexToRemove) => {
    setExistingImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleRemoveExistingVideo = (indexToRemove) => {
    setExistingVideos(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Manage newly selected image files (accumulate multiple selections)
  const handleAppendImageFiles = (files) => {
    const list = Array.from(files || []);
    if (!list.length) return;
    setSelectedImageFiles(prev => [...prev, ...list]);
  };

  const handleRemoveSelectedImageFile = (indexToRemove) => {
    setSelectedImageFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Manage newly selected video files (accumulate multiple selections)
  const handleAppendVideoFiles = (files) => {
    const list = Array.from(files || []);
    if (!list.length) return;
    setSelectedVideoFiles(prev => [...prev, ...list]);
  };

  const handleRemoveSelectedVideoFile = (indexToRemove) => {
    setSelectedVideoFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Add media by direct URL
  const handleAddImageUrl = (e) => {
    if (e) e.preventDefault();
    const trimmed = imageUrlInput.trim();
    if (!trimmed) return;
    setExistingImages(prev => [...prev, trimmed]);
    setImageUrlInput('');
  };

  const handleAddVideoUrl = (e) => {
    if (e) e.preventDefault();
    const trimmed = videoUrlInput.trim();
    if (!trimmed) return;
    setExistingVideos(prev => [...prev, trimmed]);
    setVideoUrlInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setMessage({ type: 'error', text: 'Please enter a title for this activity item.' });
      return;
    }

    setSubmitting(true);
    setUploadProgress(0);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('categorySlug', selectedSubmenu);
    formData.append('title', formTitle.trim());
    formData.append('content', formContent.trim());
    formData.append('existingImages', JSON.stringify(existingImages));
    formData.append('existingVideos', JSON.stringify(existingVideos));

    // Append newly selected files to FormData
    for (let i = 0; i < selectedImageFiles.length; i++) {
      formData.append('imageFiles', selectedImageFiles[i]);
    }
    for (let i = 0; i < selectedVideoFiles.length; i++) {
      formData.append('videoFiles', selectedVideoFiles[i]);
    }

    try {
      let res;
      if (editingId) {
        res = await updateActivityItem(editingId, formData, (percent) => {
          setUploadProgress(percent);
        });
      } else {
        res = await createActivityItem(formData, (percent) => {
          setUploadProgress(percent);
        });
      }

      if (res && res.success) {
        setUploadProgress(100);
        setMessage({
          type: 'success',
          text: editingId ? 'Activity item updated successfully!' : 'New activity item added & media saved securely!'
        });

        // Instant optimistic update (0ms UI wait)
        if (editingId && res.data) {
          setItems((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...res.data } : item)));
        } else if (res.data) {
          setItems((prev) => [res.data, ...prev]);
        }

        resetForm();
        loadCategoryItems(selectedSubmenu, false);
        setTimeout(() => setMessage({ type: '', text: '' }), 4000);
      } else {
        setMessage({ type: 'error', text: res.message || 'Failed to save activity item.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error while saving activity item.' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setUploadProgress(0), 1200);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    // Instant optimistic deletion from UI
    setItems((prev) => prev.filter((item) => item.id !== id));

    try {
      const res = await deleteActivityItem(id);
      if (res && res.success) {
        setMessage({ type: 'success', text: 'Activity item deleted successfully.' });
        loadCategoryItems(selectedSubmenu, false);
        setTimeout(() => setMessage({ type: '', text: '' }), 4000);
      } else {
        setMessage({ type: 'error', text: res.message || 'Could not delete item.' });
        loadCategoryItems(selectedSubmenu, false);
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error deleting activity item.' });
      loadCategoryItems(selectedSubmenu, false);
    }
  };

  // Sync existing frontend data into DB table
  const handleSyncToDB = async () => {
    const staticItems = STATIC_DATA_MAP[selectedSubmenu] || [];
    if (!staticItems.length) {
      setMessage({ type: 'error', text: 'No existing frontend entries to sync for this category.' });
      return;
    }

    setSyncing(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await syncCategoryItems(selectedSubmenu, staticItems);
      if (res && res.success) {
        setMessage({
          type: 'success',
          text: `All ${staticItems.length} items from frontend successfully stored and linked in database!`
        });
        await loadCategoryItems(selectedSubmenu);
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      } else {
        setMessage({ type: 'error', text: res.message || 'Failed to sync items to DB.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to synchronize with database.' });
    } finally {
      setSyncing(false);
    }
  };

  const currentCategoryObj = ACTIVITY_SUBMENUS.find(s => s.slug === selectedSubmenu) || ACTIVITY_SUBMENUS[0];
  const staticItemsForCurrent = STATIC_DATA_MAP[selectedSubmenu] || [];
  const displayItems = items.length > 0 ? items : staticItemsForCurrent;

  return (
    <div className="space-y-6">
      {/* Submenus Selection Pills */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
          <FolderOpen size={16} className="text-[#901C25]" />
          <span>Select Activity Submenu Category</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {ACTIVITY_SUBMENUS.map((sub) => {
            const isSelected = selectedSubmenu === sub.slug;
            return (
              <button
                key={sub.slug}
                onClick={() => setSelectedSubmenu(sub.slug)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#901C25] text-white border-[#901C25] shadow-sm'
                    : 'bg-stone-50 text-gray-700 border-gray-200 hover:bg-stone-100 hover:border-gray-300'
                }`}
              >
                <span>{sub.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Header Banner */}
      <div className="bg-gradient-to-r from-[#901C25] to-[#601218] text-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-200 font-bold block mb-1">
            Category Management
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif">{currentCategoryObj.name}</h2>
          <p className="text-xs text-white/80 mt-1">{currentCategoryObj.desc}</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {items.length === 0 && staticItemsForCurrent.length > 0 && (
            <button
              onClick={handleSyncToDB}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 px-3.5 py-2.5 rounded-xl font-bold text-xs hover:bg-amber-300 transition shadow-sm disabled:opacity-50"
              title="Store all pre-existing frontend data into DB"
            >
              {syncing ? <RefreshCw size={14} className="animate-spin" /> : <Database size={14} />}
              <span>{syncing ? 'Saving to DB...' : `Save ${staticItemsForCurrent.length} Items to DB`}</span>
            </button>
          )}

          <button
            onClick={() => {
              if (showAddForm && !editingId) {
                setShowAddForm(false);
              } else {
                resetForm();
                setShowAddForm(true);
              }
            }}
            className="inline-flex items-center gap-2 bg-white text-[#901C25] px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-amber-50 transition shadow-sm"
          >
            {showAddForm && !editingId ? <X size={15} /> : <Plus size={15} />}
            <span>{showAddForm && !editingId ? 'Close Form' : 'Add New Entry'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {message.text && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2.5 shadow-sm ${
            message.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Form (Add or Edit) */}
      {showAddForm && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#901C25]"></span>
              <h3 className="text-sm font-bold text-gray-900">
                {editingId ? 'Edit Activity Entry' : `Add Entry to ${currentCategoryObj.name}`}
              </h3>
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Title <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] font-mono text-gray-400">
                  {formTitle.length} characters (Unlimited length supported)
                </span>
              </div>
              <textarea
                rows={4}
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. 1. Offline Class 26th October 2020 at chennai or Food Distribution Drive"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none resize-y leading-relaxed min-h-[96px]"
                required
              />
            </div>

            {/* Optional Content / Summary */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Content / Description (Optional)
              </label>
              <textarea
                rows={3}
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="Details about this activity drive, venue, attendees, impact, etc."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
              />
            </div>

            {/* 1. IMAGES SECTION */}
            <div className="space-y-4 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon size={15} className="text-[#901C25]" />
                  <span>Images &amp; Gallery Photos</span>
                </label>
                <span className="text-[11px] font-semibold text-gray-500">
                  Total Photos: {existingImages.length + selectedImageFiles.length}
                </span>
              </div>

              {/* Current Images Preview */}
              {existingImages.length > 0 && (
                <div className="bg-stone-50 p-4 rounded-xl border border-gray-200">
                  <div className="text-xs font-bold text-gray-700 mb-2.5 flex items-center justify-between">
                    <span>Saved Images ({existingImages.length})</span>
                    <span className="text-[10px] text-gray-500">Click red trash to remove</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {existingImages.map((imgUrl, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-300 aspect-video bg-gray-100 shadow-sm">
                        <img src={imgUrl} alt={`saved-${idx}`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 bg-black/75 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingImage(idx)}
                          className="absolute top-1 right-1 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition shadow cursor-pointer z-10"
                          title="Remove this photo"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Newly Selected Local Image Files Preview */}
              {selectedImageFiles.length > 0 && (
                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                  <div className="text-xs font-bold text-amber-900 mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Check size={14} className="text-green-600" />
                      <span>Ready to Upload ({selectedImageFiles.length} new photos)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedImageFiles([])}
                      className="text-[10px] font-bold text-red-600 hover:underline"
                    >
                      Clear All New
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {selectedImageFiles.map((file, idx) => {
                      const previewUrl = URL.createObjectURL(file);
                      const sizeKb = Math.round(file.size / 1024);
                      return (
                        <div key={idx} className="relative group rounded-lg overflow-hidden border border-amber-300 aspect-video bg-white shadow-sm">
                          <img src={previewUrl} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-x-0 bottom-0 bg-black/70 text-white text-[9px] px-1 py-0.5 truncate">
                            {file.name} ({sizeKb}KB)
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveSelectedImageFile(idx)}
                            className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition shadow cursor-pointer z-10"
                            title="Remove file"
                          >
                            <X size={11} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add More Images Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Upload Local Image Files */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-3.5 text-center hover:border-[#901C25] transition bg-stone-50/50">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center justify-center gap-1.5 cursor-pointer">
                    <UploadCloud size={14} className="text-[#901C25]" />
                    <span>Choose Multiple Photos</span>
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      handleAppendImageFiles(e.target.files);
                      e.target.value = '';
                    }}
                    className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#901C25] file:text-white hover:file:bg-[#72151c] cursor-pointer"
                  />
                  <p className="text-[10px] text-gray-400 mt-1.5">
                    Select one or multiple photos (JPG, PNG, WebP).
                  </p>
                </div>

                {/* Add Image by URL */}
                <div className="border border-gray-200 rounded-xl p-3.5 bg-stone-50/50 flex flex-col justify-between">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Link size={13} className="text-[#901C25]" />
                      <span>Or Paste Image URL</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://.../uploads/images/photo.jpg"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddImageUrl(); } }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="px-3 py-1.5 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded-lg transition shrink-0"
                      >
                        + Add URL
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5">
                    Paste existing uploaded image path to append immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. VIDEOS SECTION */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                  <Film size={15} className="text-[#901C25]" />
                  <span>Videos (Optional)</span>
                </label>
                <span className="text-[11px] font-semibold text-gray-500">
                  Total Videos: {existingVideos.length + selectedVideoFiles.length}
                </span>
              </div>

              {/* Current Videos Preview */}
              {existingVideos.length > 0 && (
                <div className="bg-stone-50 p-4 rounded-xl border border-gray-200">
                  <div className="text-xs font-bold text-gray-700 mb-2.5 flex items-center justify-between">
                    <span>Saved Videos ({existingVideos.length})</span>
                    <span className="text-[10px] text-gray-500">Click red trash to remove</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {existingVideos.map((vidUrl, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-300 bg-black aspect-video flex items-center justify-center shadow-sm">
                        <video src={vidUrl} controls preload="none" className="w-full h-full object-contain" />
                        <span className="absolute bottom-1 left-1 bg-black/75 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          Video #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingVideo(idx)}
                          className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition shadow z-10 cursor-pointer"
                          title="Remove video"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Newly Selected Video Files Preview */}
              {selectedVideoFiles.length > 0 && (
                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                  <div className="text-xs font-bold text-amber-900 mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Check size={14} className="text-green-600" />
                      <span>Ready to Upload ({selectedVideoFiles.length} new videos)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedVideoFiles([])}
                      className="text-[10px] font-bold text-red-600 hover:underline"
                    >
                      Clear All New
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedVideoFiles.map((file, idx) => {
                      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
                      return (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-amber-200 text-xs">
                          <div className="flex items-center gap-2 truncate">
                            <Film size={16} className="text-red-700 shrink-0" />
                            <span className="font-semibold truncate">{file.name}</span>
                            <span className="text-gray-400 text-[10px]">({sizeMb} MB)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveSelectedVideoFile(idx)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition shrink-0"
                            title="Remove video"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add More Videos Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Upload Local Video Files */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-3.5 text-center hover:border-[#901C25] transition bg-stone-50/50">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center justify-center gap-1.5 cursor-pointer">
                    <UploadCloud size={14} className="text-[#901C25]" />
                    <span>Choose Video Files</span>
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={(e) => {
                      handleAppendVideoFiles(e.target.files);
                      e.target.value = '';
                    }}
                    className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#901C25] file:text-white hover:file:bg-[#72151c] cursor-pointer"
                  />
                  <p className="text-[10px] text-gray-400 mt-1.5">
                    Upload MP4, WebM files (saved to <code className="text-[#901C25]">/uploads/videos</code>).
                  </p>
                </div>

                {/* Add Video by URL */}
                <div className="border border-gray-200 rounded-xl p-3.5 bg-stone-50/50 flex flex-col justify-between">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Link size={13} className="text-[#901C25]" />
                      <span>Or Paste Video URL / Path</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://.../uploads/videos/v1.mp4"
                        value={videoUrlInput}
                        onChange={(e) => setVideoUrlInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddVideoUrl(); } }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddVideoUrl}
                        className="px-3 py-1.5 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded-lg transition shrink-0"
                      >
                        + Add URL
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5">
                    Paste direct URL or video link to append to this entry.
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar Display when Submitting */}
            {submitting && (
              <div className="bg-stone-50 p-4 rounded-xl border border-gray-200 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-700 flex items-center gap-1.5">
                    <RefreshCw size={13} className="animate-spin text-[#901C25]" />
                    <span>Uploading media &amp; saving to database...</span>
                  </span>
                  <span className="text-[#901C25] font-mono text-sm font-black">
                    {uploadProgress}%
                  </span>
                </div>
                {/* Progress Bar Track */}
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#901C25] to-[#E48A2D] transition-all duration-200 rounded-full"
                    style={{ width: `${Math.max(uploadProgress, 4)}%` }}
                  />
                </div>
                <p className="text-[11px] text-gray-500 flex items-center justify-between">
                  <span>Storing files in <code className="text-[#901C25]">/uploads</code> and linking to MariaDB</span>
                  <span className="font-semibold">{uploadProgress === 100 ? 'Finalizing record...' : `${uploadProgress}% completed`}</span>
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={resetForm}
                disabled={submitting}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-[#901C25] text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#72151c] transition shadow-md disabled:opacity-75 min-w-[190px] justify-center"
              >
                {submitting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Storing in DB ({uploadProgress}%)</span>
                  </>
                ) : (
                  <>
                    <Upload size={14} />
                    <span>{editingId ? 'Update Activity Entry' : 'Upload & Link to DB'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List of Existing Entries for this sub-category */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Documented Entries for {currentCategoryObj.name}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700 flex items-center gap-1.5">
              <span>{displayItems.length} items</span>
              {isRefreshing && <RefreshCw size={11} className="animate-spin text-amber-600" title="Syncing with database..." />}
            </span>
          </div>
        </div>

        {loading && displayItems.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-xs flex items-center justify-center gap-2">
            <RefreshCw size={16} className="animate-spin" />
            <span>Loading entries from database...</span>
          </div>
        ) : displayItems.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
            <ImageIcon size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-xs font-bold text-gray-700">No entries found for this category.</p>
            <p className="text-[11px] text-gray-400 mt-1">
              Click the "Add New Entry" button above to upload photos, videos, and add activity details.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayItems.map((item, index) => {
              let itemImages = [];
              if (Array.isArray(item.images)) {
                itemImages = item.images;
              } else if (typeof item.images === 'string') {
                try { itemImages = JSON.parse(item.images); } catch (e) { itemImages = [item.images]; }
              }
              if (!Array.isArray(itemImages)) itemImages = [];

              let itemVideos = [];
              if (Array.isArray(item.videos)) {
                itemVideos = item.videos;
              } else if (typeof item.videos === 'string') {
                try { itemVideos = JSON.parse(item.videos); } catch (e) { itemVideos = [item.videos]; }
              }
              if (!Array.isArray(itemVideos)) itemVideos = [];

              const imageCount = itemImages.length;
              const videoCount = itemVideos.length;
              const previewImg = imageCount > 0 ? itemImages[0] : null;

              return (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition bg-stone-50/40 gap-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden shrink-0 border border-gray-300 flex items-center justify-center">
                      {previewImg ? (
                        <img src={previewImg} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={20} className="text-gray-400" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          #{index + 1}
                        </span>
                        <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                      </div>

                      {item.content && (
                        <p className="text-[11px] text-gray-500 line-clamp-1 mb-1.5">{item.content}</p>
                      )}

                      <div className="flex items-center gap-3 text-[10px] text-gray-500 font-medium">
                        <span className="flex items-center gap-1 text-[#901C25]">
                          <ImageIcon size={12} />
                          {imageCount} {imageCount === 1 ? 'Photo' : 'Photos'}
                        </span>
                        <span className="flex items-center gap-1 text-blue-700">
                          <Video size={12} />
                          {videoCount} {videoCount === 1 ? 'Video' : 'Videos'}
                        </span>
                        <span className="text-gray-400">
                          Saved: {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    <button
                      onClick={() => handleStartEdit(item)}
                      className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-bold hover:bg-white hover:border-[#901C25] hover:text-[#901C25] transition flex items-center gap-1.5"
                    >
                      <Edit2 size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-700 hover:bg-red-50 transition"
                      title="Delete entry"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
