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
  Database
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
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Load items when sub-category changes
  const loadCategoryItems = async (slug) => {
    setLoading(true);
    const data = await fetchActivityItems(slug);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
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
    setShowAddForm(true);
    setUploadProgress(0);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleRemoveExistingImage = (indexToRemove) => {
    setExistingImages(existingImages.filter((_, idx) => idx !== indexToRemove));
  };

  const handleRemoveExistingVideo = (indexToRemove) => {
    setExistingVideos(existingVideos.filter((_, idx) => idx !== indexToRemove));
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
        resetForm();
        await loadCategoryItems(selectedSubmenu);
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

    try {
      const res = await deleteActivityItem(id);
      if (res && res.success) {
        setMessage({ type: 'success', text: 'Activity item deleted successfully.' });
        await loadCategoryItems(selectedSubmenu);
        setTimeout(() => setMessage({ type: '', text: '' }), 4000);
      } else {
        setMessage({ type: 'error', text: res.message || 'Could not delete item.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error deleting activity item.' });
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
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. 1. Offline Class 26th October 2020 at chennai or Food Distribution Drive"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#901C25] focus:outline-none"
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

            {/* Existing Images Gallery Preview (Do not remove old data) */}
            {existingImages.length > 0 && (
              <div className="bg-stone-50 p-4 rounded-xl border border-gray-200">
                <div className="text-xs font-bold text-gray-700 mb-2 flex items-center justify-between">
                  <span>Current Images ({existingImages.length})</span>
                  <span className="text-[10px] text-gray-400 font-normal">Click trash to remove if desired</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {existingImages.map((imgUrl, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-video bg-gray-100">
                      <img src={imgUrl} alt={`gallery-${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition shadow"
                        title="Remove image"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Images */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Add Images (Uploads to <code className="text-[#901C25] bg-red-50 px-1 py-0.5 rounded">/uploads/images</code>)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-[#901C25] transition cursor-pointer bg-stone-50/50">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setSelectedImageFiles(Array.from(e.target.files))}
                  className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#901C25] file:text-white hover:file:bg-[#72151c] cursor-pointer"
                />
                <p className="text-[11px] text-gray-400 mt-2">
                  Select multiple photos for this activity's gallery. Linked directly into the DB.
                </p>
                {selectedImageFiles.length > 0 && (
                  <p className="text-xs font-bold text-green-700 mt-1">
                    ✓ {selectedImageFiles.length} new image(s) ready to upload
                  </p>
                )}
              </div>
            </div>

            {/* Existing Videos Preview */}
            {existingVideos.length > 0 && (
              <div className="bg-stone-50 p-4 rounded-xl border border-gray-200">
                <div className="text-xs font-bold text-gray-700 mb-2 flex items-center justify-between">
                  <span>Current Videos ({existingVideos.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {existingVideos.map((vidUrl, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200 bg-black aspect-video flex items-center justify-center">
                      <video src={vidUrl} controls className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingVideo(idx)}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-md opacity-90 hover:opacity-100 transition shadow"
                        title="Remove video"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Videos */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Add Videos (Optional - Uploads to <code className="text-[#901C25] bg-red-50 px-1 py-0.5 rounded">/uploads/videos</code>)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-[#901C25] transition cursor-pointer bg-stone-50/50">
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => setSelectedVideoFiles(Array.from(e.target.files))}
                  className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#901C25] file:text-white hover:file:bg-[#72151c] cursor-pointer"
                />
                <p className="text-[11px] text-gray-400 mt-2">
                  Upload MP4, WebM, etc. Automatically linked to the database table.
                </p>
                {selectedVideoFiles.length > 0 && (
                  <p className="text-xs font-bold text-green-700 mt-1">
                    ✓ {selectedVideoFiles.length} video(s) ready to upload
                  </p>
                )}
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
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">
              {displayItems.length} items
            </span>
            {items.length === 0 && staticItemsForCurrent.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                Frontend Data (Click "Save to DB" to link)
              </span>
            )}
          </div>
        </div>

        {loading ? (
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
