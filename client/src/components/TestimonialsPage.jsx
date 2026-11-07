import React, { useState, useEffect } from 'react';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Home,
  ChevronRight as BreadcrumbArrow,
  Sparkles,
  ArrowRight,
  Heart,
  Video,
  Film,
  Play,
  User,
  MapPin,
  Clock,
  BookOpen,
  Brain,
  Activity,
  Calendar
} from 'lucide-react';
import { fetchTestimonialVideos } from '../api';
import { getMediaUrl } from '../config';

export const TESTIMONIAL_CATEGORIES = [
  {
    slug: 'udaliyal-dharmam-classes',
    name: 'Udaliyal Dharmam Classes',
    subtitle: 'Natural Laws Governing the Physical Body',
    desc: 'Heartfelt reflections and experiences from students who transformed their health, vitality, and lifestyle discipline through Udaliyal Dharmam teachings.',
    icon: Activity
  },
  {
    slug: 'manoviyal-dharmam-classes',
    name: 'Manoviyal Dharmam Classes',
    subtitle: 'Natural Laws Governing the Mind',
    desc: 'Personal journeys of mental well-being, mindfulness, inner tranquility, and emotional resilience shared by practitioners of Manoviyal Dharmam.',
    icon: Brain
  }
];

// Helper to sort videos in ascending order: first uploaded video appears first, next appears second
function sortVideosChronologically(list) {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => {
    const diffOrder = (Number(a.orderIndex) || 0) - (Number(b.orderIndex) || 0);
    if (diffOrder !== 0) return diffOrder;
    if (a.createdAt && b.createdAt) {
      const diffTime = new Date(a.createdAt) - new Date(b.createdAt);
      if (diffTime !== 0) return diffTime;
    }
    return (Number(a.id) || 0) - (Number(b.id) || 0);
  });
}

export default function TestimonialsPage({ onNavigate, onOpenDonation, onOpenContact }) {
  const [selectedCategory, setSelectedCategory] = useState('udaliyal-dharmam-classes');
  const [videosByCategory, setVideosByCategory] = useState({
    'udaliyal-dharmam-classes': [],
    'manoviyal-dharmam-classes': []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllVideos() {
      setLoading(true);
      try {
        const [udaliyalVideos, manoviyalVideos] = await Promise.all([
          fetchTestimonialVideos('udaliyal-dharmam-classes'),
          fetchTestimonialVideos('manoviyal-dharmam-classes')
        ]);
        setVideosByCategory({
          'udaliyal-dharmam-classes': sortVideosChronologically(udaliyalVideos),
          'manoviyal-dharmam-classes': sortVideosChronologically(manoviyalVideos)
        });
      } catch (err) {
        console.warn('Error loading testimonial videos:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAllVideos();
  }, []);

  const currentCategoryObj = TESTIMONIAL_CATEGORIES.find((c) => c.slug === selectedCategory) || TESTIMONIAL_CATEGORIES[0];
  const activeVideos = videosByCategory[selectedCategory] || [];

  return (
    <div className="bg-white min-h-screen animate-fadeIn font-sans">
      
      {/* 1. Page Title & Breadcrumb Banner */}
      <div className="bg-stone-900 text-white py-12 border-b-4 border-[#901C25] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E48A2D_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-wide">
                Testimonials
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 font-sans">
                Community Reflections &bull; Voices of Our Students and Beneficiaries
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
              <BreadcrumbArrow size={14} className="text-gray-500" />
              <span className="text-[#E48A2D] font-bold">Testimonials</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Voices of Our Community Intro Widget */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="bg-[#FFFDF9] border border-[#EEDAC5] rounded-2xl shadow-xl overflow-hidden font-serif">
          
          {/* Hero Quote Header */}
          <div className="bg-gradient-to-r from-[#8B2613] to-[#B84318] text-white p-8 sm:p-10 text-center relative">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-wider text-[#FFD700] mb-2 font-serif">
              Testimonials
            </h2>
            <p className="text-base sm:text-lg italic text-[#F8EBE1] font-sans max-w-2xl mx-auto leading-relaxed">
              Discover how lives are touched, transformed, and guided by our initiatives.
            </p>
          </div>

          {/* Body Content */}
          <div className="p-8 sm:p-10 space-y-6 text-gray-700 font-sans">
            
            {/* Highlight Box */}
            <div className="bg-[#FFF6ED] border-l-4 border-[#B84318] p-5 rounded-r-xl font-medium text-gray-800 text-sm sm:text-base leading-relaxed">
              Discover inspiring personal stories, reflections, and feedback from students and community members empowered by <strong className="text-[#8B2613]">Dharmic Life Foundation</strong>.
            </div>

            {/* Category Highlights Card */}
            <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-[#8B2613] flex items-center gap-2 mb-4">
                <span>💬</span>
                <span>Voices of Our Community</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-[#FFFDF9] p-4 rounded-lg border border-[#EEDAC5] text-sm sm:text-[15px] leading-relaxed">
                  <span className="text-xl shrink-0">📖</span>
                  <div>
                    <strong className="text-gray-900 font-semibold">Student Reflections:</strong> Experiences and key takeaways from participants who have completed the <em className="text-[#8B2613] font-serif">Udaliyal Dharmam</em> and <em className="text-[#8B2613] font-serif">Manoviyal Dharmam</em> courses.
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#FFFDF9] p-4 rounded-lg border border-[#EEDAC5] text-sm sm:text-[15px] leading-relaxed">
                  <span className="text-xl shrink-0">🤝</span>
                  <div>
                    <strong className="text-gray-900 font-semibold">Beneficiary Stories:</strong> Heartfelt words from individuals, families, and communities supported through our various humanitarian initiatives.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Values */}
          <div className="bg-[#F4ECE1] py-4 px-6 text-center border-t border-[#EEDAC5]">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#611A0D]">
              Transformation &bull; Learning &bull; Gratitude &bull; Impact
            </span>
          </div>

        </div>
      </div>

      {/* 3. VIDEO TESTIMONIALS SECTION */}
      <section className="py-12 pb-20 bg-stone-50/70 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-2">
              <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
              <Film size={14} className="text-[#901C25]" />
              <span>Video Reflections</span>
              <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 leading-tight">
              Student Video Testimonials
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Hear directly from students who have completed our life-transforming courses on physical well-being and mental harmony.
            </p>
          </div>

          {/* Two Category Tabs */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {TESTIMONIAL_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              const IconComp = cat.icon;
              const count = (videosByCategory[cat.slug] || []).length;

              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`p-5 rounded-2xl transition-all duration-300 text-left border relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#901C25] to-[#781820] text-white border-[#901C25] shadow-lg transform -translate-y-0.5'
                      : 'bg-white text-gray-800 border-gray-200 hover:border-red-300 hover:bg-stone-50 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-white/15 text-[#FFD700]' : 'bg-red-50 text-[#901C25]'
                      }`}
                    >
                      <IconComp size={20} />
                    </div>
                    {count > 0 && (
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isSelected ? 'bg-[#E48A2D] text-white' : 'bg-stone-100 text-gray-700'
                        }`}
                      >
                        {count} {count === 1 ? 'Video' : 'Videos'}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3
                      className={`text-base sm:text-lg font-bold font-serif ${
                        isSelected ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {cat.name}
                    </h3>
                    <p
                      className={`text-xs mt-1 ${
                        isSelected ? 'text-white/80' : 'text-gray-500'
                      }`}
                    >
                      {cat.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Category Banner Description */}
          <div className="max-w-4xl mx-auto mb-10 bg-white p-5 rounded-2xl border border-[#EEDAC5] shadow-sm text-center">
            <p className="text-xs sm:text-sm text-gray-700 italic">
              "{currentCategoryObj.desc}"
            </p>
          </div>

          {/* Video Cards Grid */}
          {loading ? (
            <div className="py-16 text-center">
              <div className="w-10 h-10 border-4 border-[#901C25] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm text-gray-500 font-medium">Loading testimonials...</p>
            </div>
          ) : activeVideos.length === 0 ? (
            /* Elegant Empty State when no videos uploaded yet */
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 sm:p-14 border-2 border-dashed border-[#D3A17E]/60 text-center shadow-sm">
              <div className="w-20 h-20 rounded-2xl bg-[#FFF6ED] text-[#901C25] flex items-center justify-center mx-auto mb-5 border border-[#EEDAC5]">
                <Film size={36} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 mb-2">
                Videos Coming Soon
              </h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto leading-relaxed">
                We are curating and compiling authentic video reflections from students of{' '}
                <strong className="text-[#901C25]">{currentCategoryObj.name}</strong>.
                Videos will appear here shortly as they are published.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#8B2613] bg-[#FFF6ED] px-4 py-2 rounded-full border border-[#EEDAC5]">
                <Sparkles size={14} className="text-[#E48A2D]" />
                <span>Stay tuned for inspiring student journeys</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Video Player */}
                  <div className="bg-black aspect-video relative overflow-hidden">
                    <video
                      src={getMediaUrl(video.videoUrl)}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Content Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <h4 className="text-base sm:text-lg font-bold font-serif text-gray-900 leading-snug group-hover:text-[#901C25] transition flex items-center gap-1.5">
                            <User size={16} className="text-[#901C25] shrink-0" />
                            <span>{video.name || video.speakerName || video.title || 'Student Testimonial'}</span>
                          </h4>
                          {video.location && (
                            <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                              <MapPin size={12} className="text-[#E48A2D] shrink-0" />
                              <span>{video.location}</span>
                            </p>
                          )}
                        </div>
                        {video.duration && (
                          <span className="shrink-0 px-2 py-0.5 rounded-full bg-stone-100 text-gray-600 text-[10px] font-bold flex items-center gap-1">
                            <Clock size={11} />
                            <span>{video.duration}</span>
                          </span>
                        )}
                      </div>

                      {video.description && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                          {video.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                      <span>{currentCategoryObj.name}</span>
                      <span className="flex items-center gap-1 text-[#E48A2D] font-semibold">
                        <Play size={10} className="fill-[#E48A2D]" />
                        <span>Student Video</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 4. Bottom Support CTA */}
      {/* <section className="bg-gradient-to-r from-[#901C25] via-[#73161d] to-[#901C25] text-white py-12 border-t-4 border-[#E48A2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-[#E48A2D] text-white text-xs font-bold uppercase rounded-full tracking-wider">
                Dharmic Living &bull; Community
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Learn Udaliyal &amp; Manoviyal Dharmam
              </h3>
              <p className="text-white/80 text-xs sm:text-sm">
                Join our free awareness sessions and experience natural physical health and mental peace.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => onOpenContact ? onOpenContact() : onNavigate('contact')}
                className="px-6 py-3 bg-white text-[#901C25] hover:bg-stone-100 font-bold text-xs sm:text-sm rounded-full shadow-lg transition transform active:scale-95 flex items-center gap-2"
              >
                <span>Contact Us</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => onOpenDonation('Testimonials Movement')}
                className="px-6 py-3 bg-[#E48A2D] hover:bg-[#c9751e] text-white font-bold text-xs sm:text-sm rounded-full shadow-lg transition transform active:scale-95 flex items-center gap-2"
              >
                <Heart size={15} className="fill-white" />
                <span>Support Seva</span>
              </button>
            </div>
          </div>
        </div>
      </section> */}

    </div>
  );
}
