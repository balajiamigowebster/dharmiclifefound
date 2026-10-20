import React, { useState } from 'react';
import { Home, ChevronRight, ZoomIn, X, ChevronLeft, ArrowRight, Heart } from 'lucide-react';

export default function GalleryPage({ onNavigate, onOpenDonation }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'aarthi', name: 'Aarthi Relief Fund' },
    { id: 'clothes', name: 'Clothes Distribution' },
    { id: 'annadhanam', name: 'Annadhanam' },
    { id: 'award', name: 'Dharma Shri Award' },
    { id: 'diwali', name: 'Diwali Sweets & Clothes' }
  ];

  // Comprehensive gallery collection representing all albums
  const galleryItems = [
    // Aarthi Relief Fund
    { id: 1, category: 'aarthi', title: 'Aarthi Relief Fund - Medical Assistance', image: '/images/gallery-1.jpg' },
    { id: 2, category: 'aarthi', title: 'Emergency Aid Disbursement', image: '/images/gallery-4.jpg' },
    { id: 3, category: 'aarthi', title: 'Community Medical Support Camp', image: '/images/event-1.jpg' },
    { id: 4, category: 'aarthi', title: 'Relief Provisions Distribution', image: '/images/gallery-6.jpg' },

    // Clothes Distribution
    { id: 5, category: 'clothes', title: 'Dressing with Dignity - Clothes Drive', image: '/images/event-5.jpg' },
    { id: 6, category: 'clothes', title: 'Warm Clothing Distribution for Elders', image: '/images/gallery-2.jpg' },
    { id: 7, category: 'clothes', title: 'Winter Blanket & Dress Support', image: '/images/volunteer-bg.jpg' },
    { id: 8, category: 'clothes', title: 'Street Dweller Care & Essentials', image: '/images/act-homeless.jpg' },

    // Annadhanam
    { id: 9, category: 'annadhanam', title: 'Mega Annadhanam Camp Pondicherry', image: '/images/act-annadhanam.jpg' },
    { id: 10, category: 'annadhanam', title: 'Nutritious Hot Meals for Needy', image: '/images/event-2.jpg' },
    { id: 11, category: 'annadhanam', title: 'Daily Food Seva for Destitute', image: '/images/gallery-3.jpg' },
    { id: 12, category: 'annadhanam', title: 'Prasadam Distribution Drive', image: '/images/hero-1.jpg' },

    // Dharma Shri Award
    { id: 13, category: 'award', title: 'Dharma Shri Award Ceremony', image: '/images/event-4.jpg' },
    { id: 14, category: 'award', title: 'Honoring Exemplary Social Guardians', image: '/images/team-1.jpg' },
    { id: 15, category: 'award', title: 'Sacred Vedic Honors & Felicitation', image: '/images/act-dharmic.jpg' },
    { id: 16, category: 'award', title: 'Srowtha Rathana Award Gathering', image: '/images/team-3.jpg' },

    // Diwali Sweets & Clothes
    { id: 17, category: 'diwali', title: 'Diwali Festive Sweets Distribution', image: '/images/gallery-5.jpg' },
    { id: 18, category: 'diwali', title: 'Bringing Festive Joy to Children', image: '/images/event-3.jpg' },
    { id: 19, category: 'diwali', title: 'Festive Attire & Gift Hampers', image: '/images/act-women.jpg' },
    { id: 20, category: 'diwali', title: 'Spreading Smiles Across Families', image: '/images/hero-2.jpg' },
    { id: 21, category: 'diwali', title: 'Diwali Celebration with Homeless Families', image: '/images/about.jpg' }
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="bg-white min-h-screen animate-fadeIn font-sans">
      
      {/* 1. Page Title & Breadcrumb Banner */}
      <div className="bg-stone-900 text-white py-12 border-b-4 border-[#901C25] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E48A2D_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-wide">
                Gallery
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 font-sans">
                Moments of Compassion &bull; Selfless Service in Action
              </p>
            </div>

            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-[#E48A2D] transition flex items-center gap-1 text-white"
              >
                <Home size={14} />
                <span>Home</span>
              </button>
              <ChevronRight size={14} className="text-gray-500" />
              <span className="text-[#E48A2D] font-bold">Gallery</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top "Highlights of Our Journey" Widget (Matching exact design) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">
        <div className="bg-[#FFFDF9] border border-[#EEDAC5] rounded-2xl shadow-xl overflow-hidden font-serif">
          
          {/* Hero Quote Header */}
          <div className="bg-gradient-to-r from-[#8B2613] to-[#B84318] text-white p-8 sm:p-10 text-center relative">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-wider text-[#FFD700] mb-2 font-serif">
              📸 Highlights of Our Journey
            </h2>
            <p className="text-base sm:text-lg italic text-[#F8EBE1] font-sans max-w-2xl mx-auto leading-relaxed">
              A visual chronicle of our selfless seva, cultural celebrations, and social transformation.
            </p>
          </div>

          {/* Body Content */}
          <div className="p-8 sm:p-10 space-y-6 text-gray-700 font-sans">
            
            {/* Highlight Box */}
            <div className="bg-[#FFF6ED] border-l-4 border-[#B84318] p-5 rounded-r-xl font-medium text-gray-800 text-sm sm:text-base leading-relaxed">
              Explore a curated collection of photographs and videos from <strong className="text-[#8B2613]">Dharmic Life Foundation</strong>, capturing moments of compassion, tradition, and selfless service in action.
            </div>

            {/* Showcase Highlights Card */}
            <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-[#8B2613] flex items-center gap-2 mb-4">
                <span>🌟</span>
                <span>Our Key Service Dimensions</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3.5 rounded-lg border border-[#EEDAC5] text-sm leading-relaxed">
                  <span className="text-xl shrink-0">🤝</span>
                  <div>
                    <strong className="text-gray-900 font-semibold">Service Initiatives:</strong> Moments from our humanitarian and community support drives.
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3.5 rounded-lg border border-[#EEDAC5] text-sm leading-relaxed">
                  <span className="text-xl shrink-0">🛕</span>
                  <div>
                    <strong className="text-gray-900 font-semibold">Cultural &amp; Sacred Events:</strong> Preserving ancient traditions, rituals, and honors.
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3.5 rounded-lg border border-[#EEDAC5] text-sm leading-relaxed">
                  <span className="text-xl shrink-0">🏆</span>
                  <div>
                    <strong className="text-gray-900 font-semibold">Award Ceremonies:</strong> Recognizing exemplary lives dedicated to Dharma and society.
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3.5 rounded-lg border border-[#EEDAC5] text-sm leading-relaxed">
                  <span className="text-xl shrink-0">🌱</span>
                  <div>
                    <strong className="text-gray-900 font-semibold">Programmes &amp; Workshops:</strong> Inspiring learning, student growth, and youth engagement.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Values */}
          <div className="bg-[#F4ECE1] py-4 px-6 text-center border-t border-[#EEDAC5]">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#611A0D]">
              Memories &bull; Service In Action &bull; Community &bull; Heritage
            </span>
          </div>

        </div>
      </div>

      {/* 3. Filter Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-[#901C25] text-white shadow-md scale-105'
                  : 'bg-stone-100 hover:bg-stone-200 text-gray-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Photo Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-100 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Dark Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                  <ZoomIn size={20} className="text-white" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E48A2D] mb-1">
                  {categories.find(c => c.id === item.category)?.name || 'Dharmic Life'}
                </span>
                <h4 className="font-serif font-bold text-sm sm:text-base leading-snug drop-shadow line-clamp-2">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Bottom Call-To-Action Banner */}
      <section className="bg-gradient-to-r from-[#901C25] via-[#73161d] to-[#901C25] text-white py-14 border-t-4 border-[#E48A2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-[#E48A2D] text-white text-xs font-bold uppercase rounded-full tracking-wider">
                Support Our Mission
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Be Part of Our Next Story of Hope
              </h3>
              <p className="text-white/80 text-sm max-w-xl">
                Every picture represents hundreds of warm meals served, students educated, and forgotten souls honored.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-3.5 bg-[#E48A2D] hover:bg-[#c9751e] text-white font-bold text-sm rounded-full shadow-lg transition transform active:scale-95 flex items-center gap-2"
              >
                <span>Get in Touch</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Full-Screen Interactive Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition z-50"
          >
            <X size={28} />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous Image"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition z-50"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next Image"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition z-50"
          >
            <ChevronRight size={36} />
          </button>

          {/* Image & Caption Card */}
          <div
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightboxIndex]?.image}
              alt={filteredItems[lightboxIndex]?.title}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/15"
            />
            
            <div className="mt-4 text-center">
              <span className="text-xs uppercase tracking-widest text-[#E48A2D] font-bold block mb-1">
                {lightboxIndex + 1} of {filteredItems.length} &bull; {categories.find(c => c.id === filteredItems[lightboxIndex]?.category)?.name}
              </span>
              <p className="text-white text-base sm:text-lg font-serif font-medium">
                {filteredItems[lightboxIndex]?.title}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
