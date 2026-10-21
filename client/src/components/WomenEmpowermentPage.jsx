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
  Gift,
  Newspaper,
  ShieldCheck
} from 'lucide-react';
import { womenEmpowermentDrives } from '../data/womenEmpowermentDrives';
import { fetchActivityItems } from '../api';
import ActivityMediaViewer from './ActivityMediaViewer';

export default function WomenEmpowermentPage({ onNavigate }) {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [dbItems, setDbItems] = useState([]);

  useEffect(() => {
    async function loadData() {
      const items = await fetchActivityItems('women-empowerment');
      if (items && items.length > 0) {
        setDbItems(items);
      }
    }
    loadData();
  }, []);

  const allDrives = [...womenEmpowermentDrives, ...dbItems];

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
              Women Empowerment
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
            <span className="text-[#E48A2D] font-bold">Women Empowerment</span>
          </div>
        </div>
      </div>

      {/* 2. Top "Women Empowerment" Intro Widget (Exact Original HTML & Design) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* Sub-Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900 leading-tight">
            Women Empowerment (Every Woman Deserves Opportunity, Respect and Dignity)
          </h2>
          <div className="w-16 h-1 bg-[#901C25] mx-auto mt-2.5 rounded-full"></div>
        </div>

        <div className="women-widget bg-[#FFFDF9] border border-[#EEDAC5] rounded-xl shadow-lg overflow-hidden font-serif">
          
          {/* Hero Banner / Quote Section */}
          <div className="bg-gradient-to-r from-[#8B2613] to-[#B84318] text-white p-8 sm:p-10 text-center">
            <p className="text-lg sm:text-xl italic text-[#FFD700] font-sans max-w-2xl mx-auto leading-relaxed mb-3">
              “There is no tool for development more effective than the empowerment of women.”
            </p>
            <div className="text-sm font-bold text-[#F8EBE1] tracking-wider uppercase">
              — Dr. A. P. J. Abdul Kalam
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-6 font-sans text-gray-700 leading-relaxed text-base">
            
            <div className="bg-[#FFF6ED] border-l-4 border-[#B84318] p-5 rounded-r-lg font-medium text-gray-800 text-sm sm:text-base">
              <strong>Dharmic Life Foundation</strong> continuously strives to celebrate women in every walk of life. No human life can exist without the love, care, and strength of women.
            </div>

            <p>
              When a woman gives birth to a child, she becomes a symbol of love, courage, sacrifice, and strength. Motherhood is one of the greatest gifts of life, and every human being should respect and celebrate it with equal dignity. Women are not only the strength of a family but also a vital backbone of society.
            </p>

            {/* Long-term Vision Card */}
            <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-lg p-6 space-y-2">
              <h3 className="text-[#8B2613] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                <span>🌺</span>
                <span>Empowering Womanhood &amp; Leadership</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-800">
                Our long-term vision is to support and empower women in every possible way. We contribute toward creating a society where every woman has the opportunity to learn, grow, work, lead, and live with utmost dignity.
              </p>
              <p className="text-sm sm:text-base text-gray-800 pt-1">
                Women’s empowerment is not about giving women a place in society—it is about recognizing the place they already deserve. We encourage women to believe in themselves, develop their talents, become financially independent, and confidently shape a better future.
              </p>
            </div>

            {/* Ripple Effect Card */}
            <div className="bg-[#FAF4EB] border border-[#E5D2C1] rounded-lg p-6 space-y-2 mt-4">
              <h3 className="text-[#5C1D12] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                <span>✨</span>
                <span>The Ripple Effect of Empowerment</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                When women grow, families grow. When women are empowered, communities become stronger. And when women are respected, society becomes better.
              </p>
              <p className="text-sm sm:text-base text-gray-800 pt-1 leading-relaxed">
                Dharmic Life Foundation is committed to standing alongside women, celebrating their achievements, supporting their dreams, and working towards a future where every woman is respected, valued, and empowered.
              </p>
            </div>

          </div>

          {/* Footer Values */}
          <div className="bg-[#F4ECE1] py-4 px-6 text-center border-t border-[#EEDAC5]">
            <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#611A0D]">
              Celebrating Motherhood • Dignity • Empowerment for All
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
            Women’s Day Celebrations &amp; Maternal Support ({allDrives.length} Documented Events)
          </h3>
        </div>
      </div>

      {/* 4. Documented Drives List - Video & Image Media Containers */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {allDrives.map((drive) => {
          const hasVideo = drive.videos && drive.videos.length > 0;
          const hasImages = drive.images && drive.images.length > 0;

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
                      <span>{drive.images.length} Photos</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 bg-stone-100 px-2.5 py-0.5 rounded-full">
                    <Heart size={12} className="text-[#901C25]" />
                    <span>Motherhood Seva</span>
                  </span>
                </div>
              </div>

              {/* Media Content */}
              <div className="p-6">
                <ActivityMediaViewer
                  images={drive.images}
                  videos={drive.videos}
                  title={drive.title}
                  defaultPlaceholder="/images/act-women.jpg"
                  onOpenLightbox={(img) => setLightboxImage(img)}
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
              alt="Women Empowerment Drive Photo"
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
                Ready to contribute or support maternal health and women empowerment? Join our compassionate movement.
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
