import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSlider({ onNavigate, onOpenDonation }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/1-17.jpg',
      badge: 'Serving Humanity, Preserving Dharma',
      titlePrefix: 'Humanity is',
      titleMiddle: 'the Mother of',
      titleHighlight: 'Dharma',
      description: 'Restoring dignity to the forgotten, feeding the hungry, and bringing eternal peace to departed souls in Pondicherry.',
      ctaText: 'Explore Activities',
      ctaTarget: 'activities',
      secondaryText: 'About Us',
      secondaryTarget: 'trust'
    },
    {
      id: 2,
      image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/4-13.jpg',
      badge: 'Compassion In Action',
      titlePrefix: 'Humanity is',
      titleMiddle: 'the Mother of',
      titleHighlight: 'Dharma',
      description: 'Join hands with Dharmic Life Foundation to empower students, care for homeless families, and preserve timeless sacred traditions.',
      ctaText: 'Our Activities',
      ctaTarget: 'activities',
      secondaryText: 'Trustees & Leadership',
      secondaryTarget: 'trustees'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleCtaClick = (target) => {
    if (onNavigate) {
      onNavigate(target);
    } else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative w-full h-[540px] sm:h-[620px] lg:h-[720px] bg-stone-950 overflow-hidden select-none">
      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background image with subtle ken-burns zoom */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark Gradient Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35"></div>
            </div>

            {/* Slide Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-2xl sm:max-w-3xl space-y-4 sm:space-y-6">
                
                {/* Badge */}
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E48A2D]/25 border border-[#E48A2D]/40 text-[#E48A2D] text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-sm transition-all duration-700 delay-100 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                  }`}
                >
                  <Sparkles size={14} className="text-[#FFD700]" />
                  <span>{slide.badge}</span>
                </div>

                {/* Main Headline */}
                <h1
                  className={`text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white leading-tight transition-all duration-700 delay-200 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
                  }`}
                >
                  <span>{slide.titlePrefix}</span> <br className="hidden sm:inline" />
                  <span>{slide.titleMiddle}</span>{' '}
                  <span className="text-[#E48A2D] underline decoration-[#901C25] decoration-4 underline-offset-8">
                    {slide.titleHighlight}
                  </span>
                </h1>

                {/* Description */}
                <p
                  className={`text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed max-w-xl transition-all duration-700 delay-300 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
                  }`}
                >
                  {slide.description}
                </p>

                {/* Call To Action Buttons */}
                <div
                  className={`flex flex-wrap items-center gap-4 pt-2 transition-all duration-700 delay-500 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <button
                    onClick={() => handleCtaClick(slide.ctaTarget)}
                    className="px-6 sm:px-8 py-3.5 bg-[#901C25] hover:bg-[#78171f] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-xl shadow-red-950/40 transition transform active:scale-95 flex items-center gap-2 group"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleCtaClick(slide.secondaryTarget)}
                    className="px-6 sm:px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg border border-white/20 backdrop-blur-sm transition"
                  >
                    {slide.secondaryText}
                  </button>
                </div>

              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-[#901C25] text-white flex items-center justify-center transition border border-white/15 backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-[#901C25] text-white flex items-center justify-center transition border border-white/15 backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? 'w-8 h-2.5 bg-[#E48A2D]'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
