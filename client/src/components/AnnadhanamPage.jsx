import React, { useState, useMemo, useEffect } from 'react';
import {
  Home,
  ChevronRight,
  Calendar,
  MapPin,
  Play,
  Volume2,
  VolumeX,
  X,
  ArrowRight,
  Filter,
  Film,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { annadhanamDrives } from '../data/annadhanamDrives';
import { fetchActivityItems } from '../api';
import ActivityMediaViewer from './ActivityMediaViewer';

function AnnadhanamDriveCard({ drive, onOpenLightbox }) {
  const hasVideo = drive.videos && drive.videos.length > 0;
  const hasImages = drive.images && drive.images.length > 0;
  const firstImage = hasImages ? drive.images[0] : '/images/act-annadhanam.jpg';
  const firstVideo = hasVideo ? drive.videos[0] : null;

  const [activeImage, setActiveImage] = useState(firstImage);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Drive Title Bar */}
      <div className="bg-[#FAF8F5] border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-base sm:text-lg font-bold font-serif text-gray-900 leading-snug">
          {drive.title}
        </h3>
        <div className="flex items-center gap-3 shrink-0">
          {hasVideo && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
              <Film size={12} />
              <span>Video</span>
            </span>
          )}
          {hasImages && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              <ImageIcon size={12} />
              <span>{drive.images.length} {drive.images.length === 1 ? 'Photo' : 'Photos'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Responsive Media Container with Manual Arrow Slider */}
      <div className="p-6">
        <ActivityMediaViewer
          images={drive.images}
          videos={drive.videos}
          title={drive.title}
          defaultFallback="/images/act-annadhanam.jpg"
          onOpenLightbox={(imgs, idx) => onOpenLightbox(imgs[idx])}
        />
      </div>

    </div>
  );
}

export default function AnnadhanamPage({ onNavigate }) {
  const [selectedYear, setSelectedYear] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [dbItems, setDbItems] = useState([]);

  useEffect(() => {
    async function loadData() {
      const items = await fetchActivityItems('annadhanam');
      if (items && items.length > 0) {
        setDbItems(items);
      }
    }
    loadData();
  }, []);

  // Old historical uploads first, new uploads shown in last
  const allDrivesList = useMemo(() => {
    if (!dbItems || dbItems.length === 0) return annadhanamDrives;
    if (dbItems.length >= annadhanamDrives.length) return dbItems;
    const dbMap = new Map();
    dbItems.forEach((it) => { if (it.title) dbMap.set(it.title.trim().toLowerCase(), it); });
    const merged = annadhanamDrives.map((item) => {
      const m = dbMap.get((item.title || '').trim().toLowerCase());
      if (m) { dbMap.delete((item.title || '').trim().toLowerCase()); return m; }
      return item;
    });
    return [...merged, ...Array.from(dbMap.values())];
  }, [dbItems]);

  // Filter drives by year
  const filteredDrives = useMemo(() => {
    if (selectedYear === 'All') return allDrivesList;
    return allDrivesList.filter(d => (d.title || '').includes(selectedYear));
  }, [selectedYear, allDrivesList]);

  return (
    <div className="bg-white min-h-screen animate-fadeIn font-sans text-gray-800">
      
      {/* 1. Page Title & Breadcrumb Banner */}
      <div className="bg-[#1f1e1d] text-white py-12 relative overflow-hidden border-b-4 border-[#901C25]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-1 block">
              Our Core Activities
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white tracking-wide">
              Annadhanam
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium bg-black/40 px-4 py-2 rounded-full border border-white/10">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#E48A2D] transition flex items-center gap-1.5 text-white"
            >
              <Home size={14} />
              <span>Home</span>
            </button>
            <ChevronRight size={14} className="text-gray-400" />
            <button
              onClick={() => onNavigate('activities')}
              className="hover:text-[#E48A2D] transition text-gray-300"
            >
              Activities
            </button>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#E48A2D] font-bold">Annadhanam</span>
          </div>
        </div>
      </div>

      {/* 2. Top "Annadhanam" Intro Widget (Exact Original HTML & Design) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* Sub-Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900">
            Annadhanam (When Hunger ends, Dharma begins)
          </h2>
          <div className="w-16 h-1 bg-[#901C25] mx-auto mt-2.5 rounded-full"></div>
        </div>

        <div className="annadhanam-widget bg-[#FFFDF9] border border-[#EEDAC5] rounded-xl shadow-lg overflow-hidden font-serif">
          
          {/* Hero Banner / Sacred Quote */}
          <div className="bg-gradient-to-r from-[#8B2613] to-[#B84318] text-white p-8 sm:p-10 text-center">
            <div className="text-2xl sm:text-3xl font-bold tracking-wide text-[#FFD700] mb-2 font-serif">
              "Annam Parabrahma Swaroopam"
            </div>
            <p className="text-base sm:text-lg italic text-[#F8EBE1] font-sans max-w-2xl mx-auto leading-relaxed">
              Food is a form of God. Feeding the hungry and needy with love and devotion is equal to worshipping the Divine.
            </p>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-5 font-sans text-gray-700 leading-relaxed text-base">
            
            <div className="bg-[#FFF6ED] border-l-4 border-[#B84318] p-5 rounded-r-lg font-medium text-gray-800 text-sm sm:text-base">
              <strong>Annadhanam</strong> is deeply rooted in Indian culture and respected as <em>Mahadanam</em>—the greatest of all charities—because food sustains life itself.
            </div>

            <p>
              This sacred act promotes social equality and unity while bringing spiritual merit and divine grace. When performed with the blessings and remembrance of our forefathers, Annadhanam brings deep spiritual benefits to those who offer it.
            </p>

            <p>
              When offered selflessly, it transforms the giver—helping us let go of pride and cultivate true humility, compassion, and kindness toward all beings.
            </p>

            {/* Special Focus Card */}
            <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-lg p-6 space-y-2 mt-4">
              <h3 className="text-[#8B2613] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                <span className="text-[#B84318]">♥</span>
                <span>Service at Rajiv Gandhi Government Hospital</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-800">
                At <strong>Dharmic Life Foundation</strong>, Annadhanam is one of our core activities. We frequently serve healthy, nourishing meals with care and respect to pregnant women and their attendants at Rajiv Gandhi Government Hospital, Puducherry.
              </p>
              <p className="text-sm sm:text-base text-gray-800 pt-1">
                Serving pregnant mothers is especially meaningful, as it nourishes both the mother and the precious new life growing within her.
              </p>
            </div>

          </div>

          {/* Footer Values */}
          <div className="bg-[#F4ECE1] py-4 px-6 text-center border-t border-[#EEDAC5]">
            <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#611A0D]">
              Upholding Dharma • Seva • Annadhanam
            </div>
          </div>

        </div>
      </div>

      {/* 3. Documented Drives Filter Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E48A2D]">
              <Sparkles size={15} />
              <span>Documented Seva Records</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 mt-1">
              Field Seva Drives ({filteredDrives.length} Recorded)
            </h3>
          </div>

          {/* Year Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', '2026', '2025', '2024', '2023', '2022'].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-sm ${
                  selectedYear === year
                    ? 'bg-[#901C25] text-white shadow'
                    : 'bg-stone-100 text-gray-700 hover:bg-stone-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. All Drives List - Smooth scrolling without load more button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {filteredDrives.map((drive) => (
          <AnnadhanamDriveCard
            key={drive.id}
            drive={drive}
            onOpenLightbox={(img) => setLightboxImage(img)}
          />
        ))}
      </div>

      {/* 5. Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition"
            >
              <X size={18} />
            </button>
            <img
              src={lightboxImage}
              alt="Drive Photo"
              className="w-full h-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}

      {/* 6. Bottom Call-To-Action Banner */}
      <section className="bg-gradient-to-r from-[#901C25] via-[#7d1820] to-[#901C25] text-white py-14 border-t-4 border-[#E48A2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-[#E48A2D] text-white text-xs font-bold uppercase rounded-full tracking-wider mb-1">
                Results in few seconds
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Your story starts from here
              </h3>
              <p className="text-white/80 text-sm">
                Ready to contribute or sponsor meals for pregnant mothers? Join our compassionate movement.
              </p>
            </div>

            <div>
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-3.5 bg-white text-[#901C25] hover:bg-stone-100 font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg transition transform active:scale-95 flex items-center gap-2 group"
              >
                <span>Make it Happen</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
