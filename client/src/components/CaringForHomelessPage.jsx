import React, { useState, useEffect } from 'react';
import {
  Home,
  ChevronRight,
  Film,
  Image as ImageIcon,
  Sparkles,
  Heart,
  X,
  ArrowRight,
  Calendar,
  MapPin,
  ShieldCheck,
  ChevronLeft,
  Users
} from 'lucide-react';
import { homelessDrives } from '../data/homelessDrives';
import { fetchActivityItems } from '../api';
import ActivityMediaViewer from './ActivityMediaViewer';

export default function CaringForHomelessPage({ onNavigate }) {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);
  const [dbItems, setDbItems] = useState([]);

  useEffect(() => {
    async function loadData() {
      const items = await fetchActivityItems('caring-for-homeless-people');
      if (items && items.length > 0) {
        setDbItems(items);
      }
    }
    loadData();
  }, []);

  const allDrives = (() => {
    if (!dbItems || dbItems.length === 0) return homelessDrives;
    if (dbItems.length >= homelessDrives.length) return dbItems;
    const dbMap = new Map();
    dbItems.forEach((it) => { if (it.title) dbMap.set(it.title.trim().toLowerCase(), it); });
    const merged = homelessDrives.map((item) => {
      const m = dbMap.get((item.title || '').trim().toLowerCase());
      if (m) { dbMap.delete((item.title || '').trim().toLowerCase()); return m; }
      return item;
    });
    return [...merged, ...Array.from(dbMap.values())];
  })();

  const openLightbox = (images, index) => {
    setCurrentGalleryImages(images);
    setLightboxIndex(index);
    setLightboxImage(images[index]);
  };

  const nextLightboxImage = (e) => {
    e.stopPropagation();
    if (!currentGalleryImages.length) return;
    const nextIdx = (lightboxIndex + 1) % currentGalleryImages.length;
    setLightboxIndex(nextIdx);
    setLightboxImage(currentGalleryImages[nextIdx]);
  };

  const prevLightboxImage = (e) => {
    e.stopPropagation();
    if (!currentGalleryImages.length) return;
    const prevIdx = (lightboxIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    setLightboxIndex(prevIdx);
    setLightboxImage(currentGalleryImages[prevIdx]);
  };

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
              Caring for Homeless People
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
            <span className="text-[#E48A2D] font-bold">Caring for Homeless</span>
          </div>
        </div>
      </div>

      {/* 2. Intro Section with Heading & Exact .homeless-widget */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* Main Heading matching live site */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900 leading-tight">
            Compassion Begins with Caring for Homeless People
          </h2>
          <div className="w-20 h-1 bg-[#901C25] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Authentic .homeless-widget */}
        <div className="homeless-widget bg-[#FFFDF9] border border-[#EEDAC5] rounded-xl shadow-lg overflow-hidden font-serif">
          
          {/* Hero Banner / Quote Section */}
          <div className="bg-gradient-to-r from-[#8B2613] to-[#B84318] text-white p-8 sm:p-10 text-center">
            <div className="text-xl sm:text-2xl font-bold text-[#FFD700] tracking-wide mb-2.5">
              Supporting Homeless and Vulnerable People
            </div>
            <p className="text-base sm:text-lg italic text-[#F8EBE1] font-sans max-w-2xl mx-auto leading-relaxed">
              “No person should ever be ignored because they are poor or homeless.”
            </p>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-6 font-sans text-gray-700 leading-relaxed text-base">
            
            <div className="bg-[#FFF6ED] border-l-4 border-[#B84318] p-5 rounded-r-lg font-medium text-gray-800 text-sm sm:text-base">
              <strong>Dharmic Life Foundation</strong> extends its full support to vulnerable people in society. We believe that every human being deserves <strong>dignity, respect, compassion, and a safe place to live</strong>.
            </div>

            <p>
              Supporting homeless people is not only about providing food, clothing, or shelter. It is also about giving them <strong>hope, confidence, and the belief that they are not alone</strong>. A small act of kindness can bring a big change to someone's life.
            </p>

            {/* Support Actions Card */}
            <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-lg p-6 space-y-2">
              <h3 className="text-[#8B2613] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                <span>🤝</span>
                <span>Rebuilding Lives with Hope</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-800">
                We want to support people in difficult situations and help them move towards a better and more secure future. Wherever possible, we aim to provide essential support, encourage self-confidence, and connect people with opportunities that can help them rebuild their lives.
              </p>
            </div>

            {/* Long-term Vision Card */}
            <div className="bg-[#FAF4EB] border border-[#E5D2C1] rounded-lg p-6 space-y-3 mt-4">
              <h3 className="text-[#5C1D12] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                <span>🌟</span>
                <span>Our Commitment &amp; Vision</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                Every individual has value, talent, and the ability to contribute to society when given the right support and opportunity.
              </p>
              <p className="text-sm sm:text-base text-gray-800 pt-1 leading-relaxed">
                Dharmic Life Foundation is committed to standing beside vulnerable and homeless people with <strong>compassion, dignity, and humanity</strong>. Our vision is to build a society where everyone has the opportunity to live with hope, self-respect, and a sense of belonging.
              </p>
            </div>

          </div>

          {/* Footer Values */}
          <div className="bg-[#F4ECE1] py-4 px-6 text-center border-t border-[#EEDAC5]">
            <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#611A0D]">
              Compassion • Dignity • Humanity • A Sense of Belonging
            </div>
          </div>

        </div>
      </div>

      {/* 3. Documented Drives Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="border-b border-gray-200 pb-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E48A2D]">
            <Sparkles size={15} />
            <span>Documented Field Seva Drives</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 mt-1">
            Care &amp; Relief Drives for Vulnerable Communities ({allDrives.length} Documented Events)
          </h3>
        </div>
      </div>

      {/* 4. Documented Drives List - Video & Image Media Containers */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {allDrives.map((drive) => {
          const hasVideo = drive.videos && drive.videos.length > 0;
          const hasImages = drive.images && drive.images.length > 0;

          // Badges based on drive title
          const isPuducherry = drive.title.includes('Puducherry');
          const isChennai = drive.title.includes('Chennai');
          const location = isPuducherry ? 'Puducherry' : isChennai ? 'Chennai' : 'Tamil Nadu';

          return (
            <div
              key={drive.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Drive Header Bar */}
              <div className="bg-[#FAF8F5] border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#901C25] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {drive.id}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-gray-900 leading-snug">
                    {drive.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {hasVideo && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                      <Film size={12} />
                      <span>Video Available</span>
                    </span>
                  )}
                  {hasImages && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      <ImageIcon size={12} />
                      <span>{drive.images.length} Photos</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-700 bg-stone-100 px-2.5 py-0.5 rounded-full">
                    <MapPin size={12} className="text-[#901C25]" />
                    <span>{location}</span>
                  </span>
                </div>
              </div>

              {/* Media Content */}
              <div className="p-6">
                <ActivityMediaViewer
                  images={drive.images}
                  videos={drive.videos}
                  title={drive.title}
                  defaultPlaceholder="/images/act-homeless.jpg"
                  onOpenLightbox={(img) => {
                    const idx = (drive.images || []).indexOf(img);
                    openLightbox(drive.images, idx >= 0 ? idx : 0);
                  }}
                />
              </div>

            </div>
          );
        })}
      </div>

      {/* 5. Full-Screen Lightbox Modal with Next/Previous Controls */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition shadow-lg"
            >
              <X size={20} />
            </button>

            {/* Navigation Arrows if multiple images */}
            {currentGalleryImages.length > 1 && (
              <>
                <button
                  onClick={prevLightboxImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition shadow-lg"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={nextLightboxImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition shadow-lg"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            {/* Lightbox Image */}
            <div className="flex items-center justify-center p-2 bg-stone-900">
              <img
                src={lightboxImage}
                alt="Field Drive Photo"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>

            {/* Caption / Counter Bar */}
            {currentGalleryImages.length > 0 && (
              <div className="bg-stone-950 text-white/80 py-2.5 px-4 text-xs flex items-center justify-between border-t border-white/10">
                <span>Dharmic Life Foundation Seva Archive</span>
                <span className="font-bold text-amber-400">
                  {lightboxIndex + 1} / {currentGalleryImages.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. Activity Cross-Navigation Links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#FAF8F5] border border-[#EEDAC5] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold font-serif text-[#901C25]">
              Explore Other Core Activities
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Discover our initiatives in Women Empowerment and Other Additional Activities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('women-empowerment')}
              className="px-4 py-2 text-xs font-bold uppercase rounded-lg border border-[#901C25] text-[#901C25] hover:bg-[#901C25] hover:text-white transition"
            >
              ← Women Empowerment
            </button>
            <button
              onClick={() => onNavigate('other-additional-activities')}
              className="px-4 py-2 text-xs font-bold uppercase rounded-lg bg-[#901C25] text-white hover:bg-[#7a181f] transition"
            >
              Other Activities →
            </button>
          </div>
        </div>
      </div>

      {/* 7. Bottom Call-To-Action Banner */}
      <section className="bg-gradient-to-r from-[#901C25] via-[#7d1820] to-[#901C25] text-white py-14 border-t-4 border-[#E48A2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-[#E48A2D] text-white text-xs font-bold uppercase rounded-full tracking-wider mb-1">
                Compassion in Action
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                No Person Should Be Ignored
              </h3>
              <p className="text-white/80 text-sm">
                Ready to contribute blankets, festive clothing, or support vulnerable communities? Join our mission.
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
