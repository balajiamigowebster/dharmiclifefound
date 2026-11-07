import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Upload,
  Video,
  Film,
  Check,
  AlertCircle,
  RefreshCw,
  X,
  Play,
  User,
  MapPin,
  Clock,
  ExternalLink,
  MessageSquareQuote,
  Database
} from 'lucide-react';
import {
  fetchTestimonialVideos,
  saveTestimonialVideo,
  deleteTestimonialVideo,
  syncTestimonialVideosTable
} from '../../api';
import { getMediaUrl } from '../../config';

export const TESTIMONIAL_CATEGORIES = [
  {
    slug: 'udaliyal-dharmam-classes',
    name: 'Udaliyal Dharmam Classes',
    desc: 'Student reflections, physical health transformations & lifestyle discipline testimonials'
  },
  {
    slug: 'manoviyal-dharmam-classes',
    name: 'Manoviyal Dharmam Classes',
    desc: 'Mental peace, psychological well-being, mindfulness & inner balance testimonials'
  }
];

export default function TestimonialsDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('udaliyal-dharmam-classes');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [existingVideoUrl, setExistingVideoUrl] = useState('');
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);

  // Load videos from DB
  const loadVideos = async (cat) => {
    setLoading(true);
    try {
      const data = await fetchTestimonialVideos(cat);
      const list = Array.isArray(data) ? data : [];
      // Sort chronologically: first uploaded video appears first, next appears second
      list.sort((a, b) => {
        const diffOrder = (Number(a.orderIndex) || 0) - (Number(b.orderIndex) || 0);
        if (diffOrder !== 0) return diffOrder;
        if (a.createdAt && b.createdAt) {
          const diffTime = new Date(a.createdAt) - new Date(b.createdAt);
          if (diffTime !== 0) return diffTime;
        }
        return (Number(a.id) || 0) - (Number(b.id) || 0);
      });
      setVideos(list);
    } catch (err) {
      console.error('Error loading videos:', err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncTable = async () => {
    setSyncing(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await syncTestimonialVideosTable();
      if (res && res.success) {
        setMessage({
          type: 'success',
          text: 'Table "testimonial_videos" synchronized successfully in MySQL database!'
        });
        loadVideos(selectedCategory);
      } else {
        setMessage({
          type: 'error',
          text: res?.message || 'Auto-creation failed. Please execute the SQL script in phpMyAdmin.'
        });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error connecting to database sync endpoint.' });
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    loadVideos(selectedCategory);
    resetForm();
  }, [selectedCategory]);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setLocation('');
    setDescription('');
    setDuration('');
    setExistingVideoUrl('');
    setSelectedVideoFile(null);
    setShowAddForm(false);
    setUploadProgress(0);
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setName(item.name || item.speakerName || item.title || '');
    setLocation(item.location || '');
    setDescription(item.description || '');
    setDuration(item.duration || '');
    setExistingVideoUrl(item.videoUrl || '');
    setSelectedVideoFile(null);
    setShowAddForm(true);
    window.scrollTo({ top: 250, behavior: 'smooth' });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('video/')) {
        setMessage({ type: 'error', text: 'Please select a valid video file (.mp4, .webm, .mov, etc.)' });
        return;
      }
      setSelectedVideoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Please enter the Student / Person Name.' });
      return;
    }

    if (!editingId && !selectedVideoFile && !existingVideoUrl) {
      setMessage({ type: 'error', text: 'Please select a video file to upload.' });
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    const activeCatObj = TESTIMONIAL_CATEGORIES.find((c) => c.slug === selectedCategory);
    const videoData = {
      category: selectedCategory,
      categoryName: activeCatObj ? activeCatObj.name : 'Udaliyal Dharmam Classes',
      title: name.trim(),
      name: name.trim(),
      speakerName: name.trim(),
      location: location.trim(),
      description: description.trim(),
      duration: duration.trim(),
      videoUrl: existingVideoUrl
    };

    const files = {};
    if (selectedVideoFile) {
      files.videoFile = selectedVideoFile;
    }

    try {
      const isUpdate = !!editingId;
      const res = await saveTestimonialVideo(
        videoData,
        files,
        isUpdate,
        editingId,
        (progress) => setUploadProgress(progress)
      );

      if (res && res.success) {
        setMessage({
          type: 'success',
          text: isUpdate
            ? 'Testimonial video updated successfully in MySQL!'
            : 'New video testimonial uploaded and recorded in database!'
        });
        resetForm();
        loadVideos(selectedCategory);
      } else {
        setMessage({
          type: 'error',
          text: res?.message || 'Failed to save testimonial video.'
        });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Error communicating with backend' });
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id, itemTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${itemTitle}"? This will delete the video file and its MySQL database record.`)) {
      return;
    }

    try {
      const res = await deleteTestimonialVideo(id);
      if (res && res.success) {
        setMessage({ type: 'success', text: `Deleted "${itemTitle}" successfully.` });
        loadVideos(selectedCategory);
      } else {
        setMessage({ type: 'error', text: res?.message || 'Failed to delete video from database.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error deleting video.' });
    }
  };

  const activeCategory = TESTIMONIAL_CATEGORIES.find((c) => c.slug === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-[#901C25] to-[#781820] text-white p-6 sm:p-7 rounded-2xl shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-2">
              <Film size={14} className="text-[#E48A2D]" />
              <span>Testimonials Management</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">Testimonials Dashboard</h2>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Upload and manage student video reflections for <strong>Udaliyal Dharmam</strong> &amp; <strong>Manoviyal Dharmam</strong> classes.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
            <button
              onClick={handleSyncTable}
              disabled={syncing}
              className="px-3.5 py-2 bg-[#E48A2D] hover:bg-[#c9741f] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 shrink-0 whitespace-nowrap disabled:opacity-50"
              title="Ensure testimonial_videos table is created in MySQL DB"
            >
              {syncing ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  <span>Syncing DB...</span>
                </>
              ) : (
                <>
                  <Database size={13} />
                  <span>Sync to DB</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                if (showAddForm) resetForm();
                else {
                  resetForm();
                  setShowAddForm(true);
                }
              }}
              className="px-3.5 py-2 bg-white text-[#901C25] hover:bg-stone-100 text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 shrink-0 whitespace-nowrap"
            >
              {showAddForm ? (
                <>
                  <X size={14} />
                  <span>Close Form</span>
                </>
              ) : (
                <>
                  <Plus size={14} />
                  <span>Add New Video</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {message.text && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-xs sm:text-sm font-semibold transition ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <Check size={18} className="shrink-0 text-green-600" />
          ) : (
            <AlertCircle size={18} className="shrink-0 text-red-600" />
          )}
          <span className="flex-1">{message.text}</span>
          <button
            onClick={() => setMessage({ type: '', text: '' })}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Category Selection Tabs */}
      <div className="bg-white p-2.5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3">
        {TESTIMONIAL_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`flex-1 text-left p-4 rounded-xl transition border relative ${
                isSelected
                  ? 'border-[#901C25] bg-[#FFFBF7] shadow-sm'
                  : 'border-transparent hover:bg-stone-50 text-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm sm:text-base font-bold font-serif ${
                    isSelected ? 'text-[#901C25]' : 'text-gray-800'
                  }`}
                >
                  {cat.name}
                </span>
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#901C25] animate-pulse"></span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1 line-clamp-1">
                {cat.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Add / Edit Video Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#901C25]/20 shadow-lg space-y-6 animate-fadeIn"
        >
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-gray-900 flex items-center gap-2">
                <Video size={20} className="text-[#901C25]" />
                <span>{editingId ? 'Edit Video Testimonial' : 'Upload New Video Testimonial'}</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Target Category: <strong className="text-[#901C25]">{activeCategory?.name}</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Student / Person Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. S. Ramanathan"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#901C25] focus:ring-1 focus:ring-[#901C25] outline-none text-sm transition"
                />
                <User size={16} className="absolute left-3.5 top-3 text-gray-400" />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Location / City
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Puducherry, Chennai, Bangalore"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#901C25] focus:ring-1 focus:ring-[#901C25] outline-none text-sm transition"
                />
                <MapPin size={16} className="absolute left-3.5 top-3 text-[#E48A2D]" />
              </div>
            </div>

            {/* Duration */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Duration (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 04:30 or 5 mins"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#901C25] focus:ring-1 focus:ring-[#901C25] outline-none text-sm transition"
                />
                <Clock size={16} className="absolute left-3.5 top-3 text-gray-400" />
              </div>
            </div>

            {/* Description / Feedback Notes */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Key Experience / Reflection Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of what the student shares in this testimonial video..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#901C25] focus:ring-1 focus:ring-[#901C25] outline-none text-sm transition"
              />
            </div>

            {/* Video File Upload */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Upload Video File * <span className="text-gray-400 font-normal lowercase">(saved in uploads/videos)</span>
              </label>

              <div className="border-2 border-dashed border-gray-300 hover:border-[#901C25] rounded-2xl p-6 text-center bg-stone-50/60 transition group relative">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center pointer-events-none">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#901C25] flex items-center justify-center mb-3 group-hover:scale-105 transition">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-bold text-gray-700">
                    {selectedVideoFile
                      ? selectedVideoFile.name
                      : 'Drag and drop video here, or click to browse'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedVideoFile
                      ? `Size: ${(selectedVideoFile.size / (1024 * 1024)).toFixed(1)} MB`
                      : 'Supports MP4, WebM, MOV, and AVI (Up to 250MB)'}
                  </p>
                </div>
              </div>

              {/* Existing Video Preview (if editing) */}
              {existingVideoUrl && (
                <div className="mt-3 p-3 bg-stone-100 rounded-xl flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-2 truncate">
                    <Video size={15} className="text-[#901C25] shrink-0" />
                    <span className="truncate">Current Video Link: <strong>{existingVideoUrl}</strong></span>
                  </span>
                  <a
                    href={getMediaUrl(existingVideoUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#901C25] hover:underline flex items-center gap-1 shrink-0 font-bold ml-2"
                  >
                    <span>View Video</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}

              {/* Progress Bar */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                    <span>Uploading Video to Server...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#901C25] transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-stone-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-[#901C25] hover:bg-[#73161d] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  <span>Saving Video to DB...</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>{editingId ? 'Update Video' : 'Save to DB'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Video Items List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold font-serif text-gray-900">
            {activeCategory?.name} ({videos.length})
          </h3>
          <span className="text-xs text-gray-500">Stored in MySQL table: <code className="text-[#901C25]">testimonial_videos</code></span>
        </div>

        {loading ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
            <RefreshCw size={24} className="animate-spin text-[#901C25] mx-auto mb-2" />
            <p className="text-xs text-gray-500 font-medium">Loading video testimonials from database...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#901C25] flex items-center justify-center mx-auto mb-3">
              <Film size={28} />
            </div>
            <h4 className="text-base font-bold font-serif text-gray-800">No Videos Added Yet</h4>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md mx-auto">
              There are currently no video testimonials in <strong>{activeCategory?.name}</strong>. Click "+ Add New Video" above to upload student reflections with Name and Location.
            </p>
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
              className="mt-4 px-4 py-2 bg-[#901C25] text-white text-xs font-bold rounded-xl shadow hover:bg-[#73161d] transition inline-flex items-center gap-2"
            >
              <Plus size={14} />
              <span>Add First Video</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition flex flex-col justify-between"
              >
                {/* Video Player */}
                <div className="bg-black h-[320px] sm:h-[380px] w-full relative group overflow-hidden flex items-center justify-center">
                  <video
                    src={getMediaUrl(item.videoUrl)}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info Card */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base sm:text-lg font-bold font-serif text-gray-900 leading-snug flex items-center gap-1.5">
                          <User size={16} className="text-[#901C25] shrink-0" />
                          <span>{item.name || item.speakerName || item.title || 'Student Testimonial'}</span>
                        </h4>
                        {item.location && (
                          <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                            <MapPin size={12} className="text-[#E48A2D] shrink-0" />
                            <span>{item.location}</span>
                          </p>
                        )}
                      </div>
                      {item.duration && (
                        <span className="shrink-0 px-2 py-0.5 rounded-full bg-stone-100 text-gray-600 text-[10px] font-bold">
                          {item.duration}
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-xs text-gray-600 mt-2.5 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Footer & Actions */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-gray-400 font-mono truncate max-w-[180px]">
                      {item.videoUrl}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-stone-50 transition flex items-center gap-1.5"
                      >
                        <Edit2 size={13} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="px-3 py-1.5 rounded-lg border border-red-200 text-xs font-semibold text-red-700 hover:bg-red-50 transition flex items-center gap-1.5"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
