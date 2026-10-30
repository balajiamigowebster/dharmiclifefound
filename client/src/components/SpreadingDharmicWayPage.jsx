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
  BookOpen,
  Users,
  Compass
} from 'lucide-react';
import { dharmicLifeClasses } from '../data/dharmicLifeClasses';
import { fetchActivityItems } from '../api';
import ActivityMediaViewer from './ActivityMediaViewer';

export default function SpreadingDharmicWayPage({ onNavigate }) {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [dbItems, setDbItems] = useState([]);

  useEffect(() => {
    async function loadData() {
      const items = await fetchActivityItems('spreading-the-dharmic-way-of-life');
      if (items && items.length > 0) {
        setDbItems(items);
      }
    }
    loadData();
  }, []);

  // Old historical uploads first, new uploads shown in last
  const allSessions = (() => {
    if (!dbItems || dbItems.length === 0) return dharmicLifeClasses;
    if (dbItems.length >= dharmicLifeClasses.length) return dbItems;
    const dbMap = new Map();
    dbItems.forEach((it) => { if (it.title) dbMap.set(it.title.trim().toLowerCase(), it); });
    const merged = dharmicLifeClasses.map((item) => {
      const m = dbMap.get((item.title || '').trim().toLowerCase());
      if (m) { dbMap.delete((item.title || '').trim().toLowerCase()); return m; }
      return item;
    });
    return [...merged, ...Array.from(dbMap.values())];
  })();

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
              Spreading the Dharmic Way of Life
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
            <span className="text-[#E48A2D] font-bold">Spreading the Dharmic way of life</span>
          </div>
        </div>
      </div>

      {/* 2. Top "Life Transformation Programme" Intro Widget (Exact Original HTML & Design) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* Sub-Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900 leading-tight">
            Dharmic Life Foundation conducts the Dharmic Way of Living Program in two different streams:
          </h2>
          <div className="w-16 h-1 bg-[#901C25] mx-auto mt-2.5 rounded-full"></div>
        </div>

        <div className="transformation-widget bg-[#FFFDF9] border border-[#EEDAC5] rounded-xl shadow-lg overflow-hidden font-serif">
          
          {/* Hero Banner / Quote */}
          <div className="bg-gradient-to-r from-[#8B2613] to-[#B84318] text-white p-8 sm:p-10 text-center">
            <div className="text-2xl sm:text-3xl font-bold tracking-wide text-[#FFD700] mb-2 font-serif">
              Life Transformation Programme
            </div>
            <p className="text-base sm:text-lg italic text-[#F8EBE1] font-sans max-w-2xl mx-auto leading-relaxed">
              “If we want to change something in the world, the first and foremost change must begin within ourselves.”
            </p>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-6 font-sans text-gray-700 leading-relaxed text-base">
            
            <div className="bg-[#FFF6ED] border-l-4 border-[#B84318] p-5 rounded-r-lg font-medium text-gray-800 text-sm sm:text-base">
              <strong>Dharmic Life Foundation</strong> is working towards life transformation through the Universal Path of Dharma — living in harmony with Nature and understanding the Laws of Nature.
            </div>

            <p>
              True transformation begins with understanding ourselves. Our body and mind function according to certain natural laws. When we understand these laws and learn to live in harmony with them, we can bring meaningful changes to our thoughts, lifestyle, health, relationships, and overall way of life.
            </p>

            {/* Core Classes Container */}
            <div className="space-y-4 pt-1">
              
              {/* Class 1 */}
              <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-lg p-6 space-y-2">
                <h3 className="text-[#8B2613] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                  <span>🌱 1. Udaliyal Dharmam</span>
                </h3>
                <div className="text-xs font-bold text-[#7A2818] uppercase tracking-wider">
                  The Law of Nature in the Body
                </div>
                <p className="text-sm sm:text-base text-gray-800 pt-1">
                  This class focuses on understanding the natural laws and truths governing our body. It helps participants understand how the body functions naturally and how our lifestyle and actions can either support or disturb this natural balance.
                </p>
              </div>

              {/* Class 2 */}
              <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-lg p-6 space-y-2">
                <h3 className="text-[#8B2613] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                  <span>🧠 2. Manoviyal Dharmam</span>
                </h3>
                <div className="text-xs font-bold text-[#7A2818] uppercase tracking-wider">
                  The Law of Nature in the Mind
                </div>
                <p className="text-sm sm:text-base text-gray-800 pt-1">
                  This class focuses on understanding the natural laws of the mind. It explores how thoughts, emotions, perceptions, and mental patterns influence our lives and how understanding the nature of the mind can lead toward greater awareness and transformation.
                </p>
              </div>

            </div>

            {/* Impact & Motto Card */}
            <div className="bg-[#FAF4EB] border border-[#E5D2C1] rounded-lg p-6 space-y-2 mt-4">
              <h3 className="text-[#5C1D12] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                <span>🌟 Impact &amp; Mission</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                More than <strong>300 members</strong> of the general public have already benefited from these programmes. These classes are not merely about acquiring information—they are an opportunity to understand the truth of the body and mind through the Laws of Nature and apply that understanding in everyday life.
              </p>
              <p className="text-sm sm:text-base text-gray-900 font-semibold pt-2 border-t border-amber-200/60">
                <strong>Main Motto:</strong> To create a disease-free world by promoting a healthy and harmonious lifestyle based on the Laws of Nature.
              </p>
            </div>

          </div>

          {/* Footer Values */}
          <div className="bg-[#F4ECE1] py-4 px-6 text-center border-t border-[#EEDAC5]">
            <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#611A0D]">
              Understanding Nature • Understanding Ourselves • Living According to Dharma
            </div>
          </div>

        </div>
      </div>

      {/* 3. Documented Training Classes Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="border-b border-gray-200 pb-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E48A2D]">
            <Sparkles size={15} />
            <span>Documented Training Sessions</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 mt-1">
            Conducted Classes &amp; Educational Workshops ({allSessions.length} Sessions)
          </h3>
        </div>
      </div>

      {/* 4. 13 Classes List - Responsive Media Container with Videos & Photo Collages */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {allSessions.map((item, index) => {
          const hasVideo = item.videos && item.videos.length > 0;
          const hasImages = item.images && item.images.length > 0;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Class Header Bar */}
              <div className="bg-[#FAF8F5] border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#901C25] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {item.id}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-gray-900 leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {hasVideo && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                      <Film size={12} />
                      <span>Video Available</span>
                    </span>
                  )}
                  {hasImages && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      <ImageIcon size={12} />
                      <span>{item.images.length} {item.images.length === 1 ? 'Photo' : 'Photos'}</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 bg-stone-100 px-2.5 py-0.5 rounded-full">
                    <Compass size={12} className="text-[#901C25]" />
                    <span>Dharmic Education</span>
                  </span>
                </div>
              </div>

              {/* Media Content: Interactive Main Image Slider with Left/Right Arrows */}
              <div className="p-6">
                <ActivityMediaViewer
                  images={item.images}
                  videos={item.videos}
                  title={item.title}
                  defaultFallback="/images/act-dharmic.jpg"
                  onOpenLightbox={(imgs, idx) => setLightboxImage(imgs[idx])}
                />
              </div>

            </div>
          );
        })}
      </div>

      {/* 5. Full-Screen Lightbox Modal */}
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
              alt="Class Photograph"
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
                Ready to transform your lifestyle through Udaliyal and Manoviyal Dharmam? Connect with us today.
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
