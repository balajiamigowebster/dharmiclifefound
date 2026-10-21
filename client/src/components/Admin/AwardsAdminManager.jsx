import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  RefreshCw,
  X,
  Award,
  Database
} from 'lucide-react';
import {
  fetchAwardItems,
  saveAwardItem,
  deleteAwardItem,
  syncAwardItems
} from '../../api';
import { getMediaUrl } from '../../config';
import {
  defaultSrowthaRathanaAwards,
  defaultDharmaShriAwards
} from '../../data/awardsData';

export const AWARDS_MENU_LIST = [
  {
    slug: 'srowtha-rathana-award',
    name: 'Srowtha Rathana Award',
    desc: 'Honoring Agnihotris with Srowtha Ratnam title, cash prize & sacred Agnihotra tribute'
  },
  {
    slug: 'dharma-shri-award',
    name: 'Dharma Shri Award',
    desc: 'Felicitation with Pure Silver Coin & Appreciation Certificate for exemplary Dharmic service'
  }
];

export default function AwardsAdminManager() {
  const [selectedAwardType, setSelectedAwardType] = useState('srowtha-rathana-award');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form state
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [awardName, setAwardName] = useState('Srowtha Ratnam Award');
  const [subtitle, setSubtitle] = useState('Honouring Lifelong Dedication to Dharma and Vedic Traditions');
  const [recipient, setRecipient] = useState('');
  const [location, setLocation] = useState('');
  const [cashPrize, setCashPrize] = useState('₹10,000');
  const [recognition, setRecognition] = useState('Vedic Dharma');
  const [content, setContent] = useState('');
  const [tributeText, setTributeText] = useState('');
  const [existingImages, setExistingImages] = useState([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Load items
  const loadAwardItems = async (type) => {
    setLoading(true);
    const data = await fetchAwardItems(type);
    if (data && data.length > 0) {
      setItems(data);
    } else {
      // Auto-populate from default data if DB table has no rows
      const fallback = type === 'srowtha-rathana-award'
        ? defaultSrowthaRathanaAwards
        : defaultDharmaShriAwards;
      setItems(fallback);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAwardItems(selectedAwardType);
    resetForm();
  }, [selectedAwardType]);

  const resetForm = () => {
    setEditingId(null);
    setYear('');
    setTitle('');
    setAwardName(selectedAwardType === 'srowtha-rathana-award' ? 'Srowth Ratnam Award' : 'Dharma Shri Award');
    setSubtitle(
      selectedAwardType === 'srowtha-rathana-award'
        ? 'Honouring Lifelong Dedication to Dharma and Vedic Traditions'
        : 'Recognizing Exemplary Service, Community Upliftment, and Dharmic Values'
    );
    setRecipient('');
    setLocation('');
    setCashPrize(selectedAwardType === 'srowtha-rathana-award' ? '₹10,000' : 'Silver Coin & Certificate');
    setRecognition(selectedAwardType === 'srowtha-rathana-award' ? 'Vedic Dharma' : 'Dharmic Seva');
    setContent('');
    setTributeText('');
    setExistingImages([]);
    setSelectedImageFiles([]);
    setShowAddForm(false);
    setUploadProgress(0);
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setYear(item.year || '');
    setTitle(item.title || '');
    setAwardName(item.awardName || '');
    setSubtitle(item.subtitle || '');
    setRecipient(item.recipient || '');
    setLocation(item.location || '');
    setCashPrize(item.cashPrize || '');
    setRecognition(item.recognition || '');
    setContent(item.content || '');
    setTributeText(item.tributeText || '');
    setExistingImages(Array.isArray(item.images) ? item.images : []);
    setSelectedImageFiles([]);
    setShowAddForm(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleRemoveExistingImage = (idx) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleImageFileChange = (e) => {
    if (e.target.files) {
      setSelectedImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!title.trim() || !recipient.trim()) {
      setMessage({ type: 'error', text: 'Please fill in both the Title and Recipient name.' });
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    const itemData = {
      awardType: selectedAwardType,
      year: year.trim(),
      title: title.trim(),
      awardName: awardName.trim(),
      subtitle: subtitle.trim(),
      recipient: recipient.trim(),
      location: location.trim(),
      cashPrize: cashPrize.trim(),
      recognition: recognition.trim(),
      content: content.trim(),
      tributeText: tributeText.trim(),
      existingImages
    };

    const files = {
      imageFiles: selectedImageFiles
    };

    try {
      const isUpdate = !!editingId;
      const res = await saveAwardItem(
        itemData,
        files,
        isUpdate,
        editingId,
        (progress) => setUploadProgress(progress)
      );

      if (res && res.success) {
        setMessage({
          type: 'success',
          text: isUpdate ? 'Award updated successfully!' : 'New award entry created and linked to DB!'
        });
        resetForm();
        loadAwardItems(selectedAwardType);
      } else {
        setMessage({
          type: 'error',
          text: res?.message || 'Server error occurred while saving award.'
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
    if (!window.confirm(`Are you sure you want to delete "${itemTitle}"? This will delete it from database.`)) {
      return;
    }

    try {
      const res = await deleteAwardItem(id);
      if (res && res.success) {
        setMessage({ type: 'success', text: `Deleted "${itemTitle}" successfully.` });
        loadAwardItems(selectedAwardType);
      } else {
        setMessage({ type: 'error', text: res?.message || 'Failed to delete from database.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error deleting award.' });
    }
  };

  const handleSyncDefaultsToDB = async () => {
    const defaultData = selectedAwardType === 'srowtha-rathana-award'
      ? defaultSrowthaRathanaAwards
      : defaultDharmaShriAwards;

    if (!window.confirm(`Synchronize ${defaultData.length} award editions into the MariaDB database table?`)) {
      return;
    }

    setSyncing(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await syncAwardItems(selectedAwardType, defaultData);
      if (res && res.success) {
        setMessage({
          type: 'success',
          text: res.message || 'Award items synchronized successfully into the database!'
        });
        loadAwardItems(selectedAwardType);
      } else {
        setMessage({ type: 'error', text: res?.message || 'Failed to sync to database.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error connecting to database sync endpoint.' });
    } finally {
      setSyncing(false);
    }
  };

  const activeCategory = AWARDS_MENU_LIST.find((a) => a.slug === selectedAwardType);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-[#901C25] to-[#781820] text-white p-6 sm:p-7 rounded-2xl shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-2">
              <Award size={14} className="text-[#E48A2D]" />
              <span>Awards Management</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">Awards Dashboard</h2>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-2xl">
              Manage awards, yearly editions, recipients, citations, cash prizes, and photo galleries stored in the database.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSyncDefaultsToDB}
              disabled={syncing}
              className="px-4 py-2 bg-[#E48A2D] hover:bg-[#c9741f] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2 shrink-0 disabled:opacity-50"
              title="Ensure all 6 Srowtha Ratnam editions / 5 Dharma Shri awards are saved in DB"
            >
              {syncing ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Syncing DB...</span>
                </>
              ) : (
                <>
                  <Database size={14} />
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
              className="px-4 py-2 bg-white text-[#901C25] hover:bg-stone-100 text-xs font-bold rounded-xl shadow transition flex items-center gap-2 shrink-0"
            >
              {showAddForm ? (
                <>
                  <X size={14} />
                  <span>Close Form</span>
                </>
              ) : (
                <>
                  <Plus size={14} />
                  <span>Add New Award</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Status Alert */}
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
          <span>{message.text}</span>
          <button
            onClick={() => setMessage({ type: '', text: '' })}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Award Selector Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-2">
        {AWARDS_MENU_LIST.map((award) => {
          const isActive = selectedAwardType === award.slug;
          return (
            <button
              key={award.slug}
              onClick={() => setSelectedAwardType(award.slug)}
              className={`flex-1 p-3.5 rounded-xl text-left transition flex items-center justify-between border ${
                isActive
                  ? 'bg-amber-50/70 border-[#E48A2D] shadow-sm'
                  : 'bg-white border-transparent hover:bg-stone-50'
              }`}
            >
              <div>
                <h4 className={`text-sm font-bold ${isActive ? 'text-[#901C25]' : 'text-gray-800'}`}>
                  {award.name}
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{award.desc}</p>
              </div>
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isActive ? 'bg-[#901C25]' : 'bg-gray-200'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Add / Edit Form Modal or Inline */}
      {showAddForm && (
        <form
          onSubmit={handleSubmitForm}
          className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm space-y-5 animate-fadeIn"
        >
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-serif">
                {editingId ? 'Edit Award Edition' : 'Create New Award Edition'}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Category: <strong>{activeCategory?.name}</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-stone-100"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Year */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Award Year *
              </label>
              <input
                type="text"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2026"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#901C25] text-sm"
              />
            </div>

            {/* Section Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Heading / Edition Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 6. 2026 AWARD FUNCTION"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#901C25] text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Recipient */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Honoured Recipient *
              </label>
              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Brahmashri R. Sundararama Vajapeyayaji"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#901C25] text-sm"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Srirangam, Tamil Nadu"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#901C25] text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Cash Prize / Felicitation */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Cash Prize / Felicitation
              </label>
              <input
                type="text"
                value={cashPrize}
                onChange={(e) => setCashPrize(e.target.value)}
                placeholder="e.g. ₹15,000 or Silver Coin"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#901C25] text-sm"
              />
            </div>

            {/* Recognition field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Recognition Category
              </label>
              <input
                type="text"
                value={recognition}
                onChange={(e) => setRecognition(e.target.value)}
                placeholder="e.g. Vedic Dharma or Dharmic Seva"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#901C25] text-sm"
              />
            </div>

            {/* Award Certificate Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Award Name On Card
              </label>
              <input
                type="text"
                value={awardName}
                onChange={(e) => setAwardName(e.target.value)}
                placeholder="e.g. Srowtha Ratnam Award"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#901C25] text-sm"
              />
            </div>
          </div>

          {/* Description Content */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Awardee Biography & Details
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Detailed description of the recipient's dedication, ritual history, and foundation honours..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#901C25] text-sm"
            />
          </div>

          {/* Tribute Box Citation */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Citation / Tribute Text
            </label>
            <input
              type="text"
              value={tributeText}
              onChange={(e) => setTributeText(e.target.value)}
              placeholder="e.g. Recognising a lifetime of devotion to Agni, Dharma, and sacred Vedic rituals..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#901C25] text-sm"
            />
          </div>

          {/* Existing Photos */}
          {existingImages.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Attached Images ({existingImages.length})
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {existingImages.map((imgSrc, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden border border-gray-200 group bg-stone-100 aspect-video">
                    <img
                      src={getMediaUrl(imgSrc)}
                      alt="Award"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(idx)}
                      className="absolute top-1.5 right-1.5 bg-red-600 text-white p-1 rounded-md opacity-80 group-hover:opacity-100 transition shadow"
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload New Photos */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Upload Award Photos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:bg-stone-50 transition cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
                id="award-images-upload"
              />
              <label htmlFor="award-images-upload" className="cursor-pointer block">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <span className="text-xs font-bold text-[#901C25] hover:underline">
                  Click to select images
                </span>
                <span className="text-xs text-gray-500 block mt-1">
                  Supports multiple JPG, PNG, WebP (will be saved in server uploads & database)
                </span>
              </label>
              {selectedImageFiles.length > 0 && (
                <div className="mt-3 text-xs font-semibold text-green-700">
                  ✓ {selectedImageFiles.length} new image file(s) selected
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#901C25] h-2 transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-bold rounded-xl hover:bg-stone-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-[#901C25] hover:bg-[#781820] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Saving to Database...</span>
                </>
              ) : (
                <>
                  <Check size={14} />
                  <span>{editingId ? 'Update Award' : 'Save to DB'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* List of Awards in Active Category */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 font-serif">
            {activeCategory?.name} Editions ({items.length})
          </h3>
          <span className="text-xs text-gray-500 font-medium">
            Stored in <code>award_items</code> table
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 shadow-sm">
            <RefreshCw size={24} className="animate-spin mx-auto text-[#901C25] mb-2" />
            <p className="text-xs font-semibold text-gray-500">Loading awards from database...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-300">
            <Award size={32} className="mx-auto text-gray-400 mb-2" />
            <h4 className="text-sm font-bold text-gray-700">No Award Editions in Database</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
              Click "Sync to DB" above to import the default awards from the live website, or "Add New Award" to create one.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, idx) => {
              const images = Array.isArray(item.images) ? item.images : [];
              return (
                <div
                  key={item.id || idx}
                  className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row gap-5 items-start"
                >
                  {/* Thumbnail */}
                  <div className="w-full md:w-48 shrink-0">
                    {images.length > 0 ? (
                      <div className="aspect-video rounded-xl overflow-hidden bg-stone-100 border border-gray-200 relative">
                        <img
                          src={getMediaUrl(images[0])}
                          alt={item.recipient}
                          className="w-full h-full object-cover"
                        />
                        {images.length > 1 && (
                          <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            +{images.length - 1} photos
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-video rounded-xl bg-amber-50/60 border border-amber-200 flex items-center justify-center text-amber-800 text-xs font-bold">
                        <ImageIcon size={20} className="mr-1.5 opacity-60" />
                        <span>No Photo</span>
                      </div>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {item.year && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#901C25] text-white">
                          Year {item.year}
                        </span>
                      )}
                      {item.cashPrize && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          {item.cashPrize}
                        </span>
                      )}
                      {item.location && (
                        <span className="text-xs text-gray-500 font-medium">
                          📍 {item.location}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-gray-900 font-serif">
                      {item.title}
                    </h4>

                    <div className="text-xs font-semibold text-[#901C25] mt-0.5">
                      Recipient: <strong>{item.recipient}</strong>
                    </div>

                    {item.content && (
                      <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                        {item.content}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => handleStartEdit(item)}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold rounded-lg border border-amber-200 transition flex items-center gap-1.5"
                    >
                      <Edit2 size={13} />
                      <span>Edit</span>
                    </button>
                    {item.id && (
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-lg border border-red-200 transition flex items-center gap-1.5"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    )}
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
