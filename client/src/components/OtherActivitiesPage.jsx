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
  Globe,
  Coins
} from 'lucide-react';
import { otherActivitiesDrives } from '../data/otherActivitiesDrives';
import { fetchActivityItems } from '../api';
import ActivityMediaViewer from './ActivityMediaViewer';

export default function OtherActivitiesPage({ onNavigate }) {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);
  const [dbItems, setDbItems] = useState([]);

  useEffect(() => {
    async function loadData() {
      const items = await fetchActivityItems('other-additional-activities');
      if (items && items.length > 0) {
        setDbItems(items);
      }
    }
    loadData();
  }, []);

  // Old historical uploads first, new uploads shown in last
  const allDrives = (() => {
    if (!dbItems || dbItems.length === 0) return otherActivitiesDrives;
    if (dbItems.length >= otherActivitiesDrives.length) return dbItems;
    const dbMap = new Map();
    dbItems.forEach((it) => { if (it.title) dbMap.set(it.title.trim().toLowerCase(), it); });
    const merged = otherActivitiesDrives.map((item) => {
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
              Other Additional Activities
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
            <span className="text-[#E48A2D] font-bold">Other Activities</span>
          </div>
        </div>
      </div>

      {/* 2. Top "Service Without Boundaries" Intro Widget (Exact Original HTML & Design) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        <div className="humanitarian-widget bg-[#FFFDF9] border border-[#EEDAC5] rounded-xl shadow-lg overflow-hidden font-serif">
          
          {/* Hero Banner / Quote Section */}
          <div className="bg-gradient-to-r from-[#8B2613] to-[#B84318] text-white p-8 sm:p-10 text-center">
            <div className="text-xl sm:text-2xl font-bold text-[#FFD700] tracking-wide mb-2.5">
              Service Without Boundaries
            </div>
            <p className="text-base sm:text-lg italic text-[#F8EBE1] font-sans max-w-2xl mx-auto leading-relaxed">
              “Humanity begins when we see every person as one of our own.”
            </p>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-6 font-sans text-gray-700 leading-relaxed text-base">
            
            <div className="bg-[#FFF6ED] border-l-4 border-[#B84318] p-5 rounded-r-lg font-medium text-gray-800 text-sm sm:text-base">
              <strong>Dharmic Life Foundation</strong> is committed to supporting humanitarian activities wherever help is needed. Our service is not limited to our hometown or a particular group of people—wherever we have the ability to help, we are ready to extend our support without boundaries.
            </div>

            <p>
              We believe that humanity has no borders, and compassion should reach every person in need. Service is not only about giving material support—sometimes, a helping hand, a kind word, emotional support, or simply standing beside someone during a difficult time can make a meaningful difference.
            </p>

            {/* Relief & Emergency Service Card */}
            <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-lg p-6 space-y-2">
              <h3 className="text-[#8B2613] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                <span>🌍</span>
                <span>Support During Emergencies &amp; Disasters</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-800">
                During difficult times such as natural disasters, emergencies, or other challenging situations, we aim to support affected people with essential assistance, care, and immediate relief.
              </p>
            </div>

            {/* Collaborative Impact Card */}
            <div className="bg-[#FAF4EB] border border-[#E5D2C1] rounded-lg p-6 space-y-3 mt-4">
              <h3 className="text-[#5C1D12] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                <span>🤝</span>
                <span>Collaborative Impact</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                Dharmic Life Foundation welcomes opportunities to work together with individuals, volunteers, organizations, and communities to reach people who need support. When people come together with compassion and a genuine desire to serve, small contributions create a much greater impact.
              </p>
              <p className="text-sm sm:text-base text-gray-800 pt-1 leading-relaxed">
                Our vision is to serve with <strong>kindness, equality, dignity, and responsibility</strong>. Wherever there is a genuine need and wherever we can help, we will strive to be there.
              </p>
            </div>

          </div>

          {/* Footer Values */}
          <div className="bg-[#F4ECE1] py-4 px-6 text-center border-t border-[#EEDAC5]">
            <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#611A0D]">
              Humanity is our common bond • Service is our responsibility
            </div>
          </div>

        </div>
      </div>

      {/* 3. Section Heading Matching Live Site: "Other Activities" */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="border-b border-gray-200 pb-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E48A2D]">
            <Sparkles size={15} />
            <span>Humanitarian Relief &amp; Emergency Seva</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900 mt-1">
            Other Activities
          </h3>
        </div>
      </div>

      {/* 4. Documented Relief Drives */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {allDrives.map((drive) => {
          let driveImages = [];
          if (Array.isArray(drive.images)) {
            driveImages = drive.images;
          } else if (typeof drive.images === 'string') {
            try { driveImages = JSON.parse(drive.images); } catch (e) { driveImages = [drive.images]; }
          }
          if (!Array.isArray(driveImages)) driveImages = [];

          let driveVideos = [];
          if (Array.isArray(drive.videos)) {
            driveVideos = drive.videos;
          } else if (typeof drive.videos === 'string') {
            try { driveVideos = JSON.parse(drive.videos); } catch (e) { driveVideos = [drive.videos]; }
          }
          if (!Array.isArray(driveVideos)) driveVideos = [];

          const hasVideo = driveVideos.length > 0;
          const hasImages = driveImages.length > 0;

          return (
            <div
              key={drive.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Drive Header Bar */}
              <div className="bg-[#FAF8F5] border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#E48A2D]">
                    {drive.tagline}
                  </div>
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
                      <span>{driveImages.length} Photos</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <Coins size={12} className="text-emerald-600" />
                    <span>{drive.contribution}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-700 bg-stone-100 px-2.5 py-0.5 rounded-full">
                    <MapPin size={12} className="text-[#901C25]" />
                    <span>{drive.location}</span>
                  </span>
                </div>
              </div>

              {/* Media Content: Interactive Main Image Slider with Left/Right Arrows */}
              <div className="p-6">
                <ActivityMediaViewer
                  images={driveImages}
                  videos={driveVideos}
                  title={drive.title}
                  defaultFallback="/images/act-other.jpg"
                  onOpenLightbox={(imgs, idx) => openLightbox(imgs, idx)}
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
                alt="Relief Drive Photo"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>

            {/* Caption / Counter Bar */}
            {currentGalleryImages.length > 0 && (
              <div className="bg-stone-950 text-white/80 py-2.5 px-4 text-xs flex items-center justify-between border-t border-white/10">
                <span>Dharmic Life Foundation Humanitarian Archive</span>
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
              Visit our ongoing drives in Caring for Homeless People or browse all initiatives.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('caring-for-homeless-people')}
              className="px-4 py-2 text-xs font-bold uppercase rounded-lg border border-[#901C25] text-[#901C25] hover:bg-[#901C25] hover:text-white transition"
            >
              ← Caring for Homeless
            </button>
            <button
              onClick={() => onNavigate('activities')}
              className="px-4 py-2 text-xs font-bold uppercase rounded-lg bg-[#901C25] text-white hover:bg-[#7a181f] transition"
            >
              All Activities Hub →
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
                Emergency &amp; Humanitarian Seva
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Humanity Has No Borders
              </h3>
              <p className="text-white/80 text-sm">
                Join hands with Dharmic Life Foundation to extend compassionate relief and emergency support where it is needed most.
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
