import React, { useState, useEffect } from 'react';
import { Home, ChevronRight, ZoomIn } from 'lucide-react';
import { fetchAwardItems, syncAwardItems } from '../api';
import { defaultDharmaShriAwards } from '../data/awardsData';
import { getMediaUrl } from '../config';

export default function DharmaShriAwardPage({ onNavigate }) {
  const [awards, setAwards] = useState(defaultDharmaShriAwards);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAwards() {
      try {
        const remoteData = await fetchAwardItems('dharma-shri-award');
        if (isMounted) {
          if (remoteData && remoteData.length > 0) {
            setAwards(remoteData);
          } else {
            syncAwardItems('dharma-shri-award', defaultDharmaShriAwards)
              .then((res) => {
                if (res?.data && isMounted) setAwards(res.data);
              })
              .catch(() => {});
          }
        }
      } catch (err) {
        console.error('Failed to load Dharma Shri awards:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAwards();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="bg-[#FAF7F2] min-h-screen animate-fadeIn font-sans pb-20">
      {/* 1. Page Title & Breadcrumb Banner (Matching GalleryPage Design) */}
      <div className="bg-stone-900 text-white py-12 border-b-4 border-[#901C25] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E48A2D_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-wide">
                Dharma Shri Award
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 font-sans">
                Honoring Individuals of High Character, Conduct & Righteousness
              </p>
            </div>

            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <button
                onClick={() => onNavigate && onNavigate('home')}
                className="hover:text-[#E48A2D] transition flex items-center gap-1 text-white"
              >
                <Home size={14} />
                <span>Home</span>
              </button>
              <ChevronRight size={14} className="text-gray-500" />
              <span className="text-gray-400">Awards</span>
              <ChevronRight size={14} className="text-gray-500" />
              <span className="text-[#E48A2D] font-bold">Dharma Shri Award</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Intro Top Box */}
        <section className="bg-white rounded-2xl border border-[#ebd9c8] shadow-md overflow-hidden mb-12">
          {/* Header Bar */}
          <div className="bg-[#A43B14] p-8 sm:p-9 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFDA79] tracking-wide mb-2">
              Dharma Shri Award
            </h2>
            <p className="text-sm sm:text-base italic text-[#FFEEDE] max-w-2xl mx-auto leading-relaxed">
              Honoring individuals who live according to the principles of Dharma and set a positive example through character and conduct.
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-9 space-y-6">
            {/* Highlight quote box */}
            <div className="bg-[#FFF6ED] border-l-4 border-[#B84318] p-5 rounded-r-xl text-gray-800 text-sm sm:text-base leading-relaxed">
              The <strong className="text-[#8B2613]">Dharma Shri Award</strong> was initially introduced to encourage students of the Dharmic Life Foundation. The Trustee Committee later extended this recognition to any individual in society who sincerely follows the path of Dharma and serves as an inspiring example to others.
            </div>

            {/* Award Honor & Token of Respect card */}
            <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-xl p-5 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold font-serif text-[#8B2613] flex items-center gap-2 mb-2">
                <span>🪙</span>
                <span>Award Honor & Token of Respect</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 mb-2">
                The <strong>Dharma Shri Award</strong> consists of:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-1 ml-2">
                <li>A <strong>20-gram silver coin</strong> engraved with the recipient’s name and the Trust’s logo</li>
                <li>An official <strong>Appreciation Certificate</strong></li>
              </ul>
            </div>

            {/* Inspiring Righteousness & Service card */}
            <div className="bg-[#FAF4EB] border border-[#E5D2C1] rounded-xl p-5 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold font-serif text-[#5C1D12] flex items-center gap-2 mb-2">
                <span>✨</span>
                <span>Inspiring Righteousness & Service</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                This award serves as a mark of respect and encouragement for those who dedicate themselves to living a Dharmic life. It has inspired many awardees to deepen their commitment to Dharma and continue their journey on the path of righteousness and selfless service to society.
              </p>
            </div>
          </div>

          {/* Footer Values */}
          <div className="bg-[#F4ECE1] border-t border-[#EEDAC5] py-3.5 px-6 text-center text-xs sm:text-sm font-bold text-[#611A0D] tracking-wider uppercase">
            CHARACTER • CONDUCT • RIGHTEOUSNESS • DHARMIC LIVING
          </div>
        </section>

        {/* Editions Loop: Exactly 1 Card Per Year Edition */}
        <div className="space-y-12">
          {awards.map((item, idx) => {
            const images = Array.isArray(item.images) ? item.images : [];
            const primaryContent = item.content || '';
            const secondaryTribute = item.tributeText || '';

            return (
              <div
                key={item.id || idx}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Year Title Bar on Top of the Card */}
                <div className="bg-gradient-to-r from-stone-900 via-[#701c22] to-stone-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-stone-200">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E48A2D]"></span>
                    <h2 className="text-lg sm:text-xl font-bold font-serif tracking-wide text-white">
                      {item.title}
                    </h2>
                  </div>
                  {item.year && (
                    <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-300/30 text-xs font-bold rounded-full">
                      Year {item.year}
                    </span>
                  )}
                </div>

                {/* Card Body: Images Grid & Narrative Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Images Area: 1 or 2 photos side-by-side with full visibility (object-contain / natural portrait framing) */}
                  {images.length > 0 && (
                    <div
                      className={`grid gap-4 ${
                        images.length === 1
                          ? 'grid-cols-1 max-w-md mx-auto'
                          : 'grid-cols-1 sm:grid-cols-2'
                      }`}
                    >
                      {images.map((imgSrc, imgIdx) => (
                        <div
                          key={imgIdx}
                          className="relative rounded-xl overflow-hidden shadow-sm border border-stone-200/80 bg-stone-50 group cursor-pointer h-72 sm:h-80 flex items-center justify-center p-2"
                          onClick={() => setSelectedImage(getMediaUrl(imgSrc))}
                        >
                          <img
                            src={getMediaUrl(imgSrc)}
                            alt={`${item.title} Photo ${imgIdx + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                            <span className="bg-white/95 text-stone-900 text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                              <ZoomIn size={14} className="text-[#901C25]" />
                              <span>View Full Photo</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Recognition & Felicitation Details */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold rounded-full">
                        🪙 20-Gram Pure Silver Coin Recipient
                      </span>
                      <span className="px-3 py-1 bg-stone-100 text-stone-700 border border-stone-200 text-xs font-medium rounded-full">
                        📜 Official Appreciation Certificate
                      </span>
                      {item.location && (
                        <span className="px-3 py-1 bg-rose-50 text-rose-900 border border-rose-200 text-xs font-medium rounded-full">
                          📍 {item.location}
                        </span>
                      )}
                    </div>

                    {/* Section 1: Spiritual Guidance & Excellence */}
                    {primaryContent && (
                      <div className="bg-[#FAF7F2] p-5 rounded-xl border border-stone-200/70 space-y-2">
                        <h3 className="text-base sm:text-lg font-bold font-serif text-[#8B2613] flex items-center gap-2">
                          <span>✦</span>
                          <span>Excellence in Spiritual Guidance Award</span>
                        </h3>
                        <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans text-justify">
                          {primaryContent}
                        </p>
                      </div>
                    )}

                    {/* Section 2: Dharma Shri Award Honour */}
                    {secondaryTribute && (
                      <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
                        <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
                          <span>✦</span>
                          <span>Dharma Shri Award Citation</span>
                        </h3>
                        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans text-justify">
                          {secondaryTribute}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-[#901C25] text-white flex items-center justify-center font-bold shadow-lg hover:bg-black transition border-2 border-white"
              aria-label="Close"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Expanded awardee view"
              className="max-h-[85vh] w-auto max-w-full rounded-xl shadow-2xl object-contain border border-white/20"
            />
          </div>
        </div>
      )}
    </div>
  );
}
