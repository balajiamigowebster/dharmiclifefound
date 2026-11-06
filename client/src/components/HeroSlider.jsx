import { getMediaUrl } from '../config';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function HeroSlider({ onNavigate, onOpenDonation, content }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSlides = [
    {
      id: 1,
      image: '/images/hospital-home.jpeg',
      badge: 'Serving Humanity, Preserving Dharma',
      titlePrefix: 'Humanity is',
      titleMiddle: 'the Mother of',
      titleHighlight: 'Dharma',
      description: 'Restoring dignity to the forgotten, feeding the hungry, and bringing eternal peace to departed souls in Pondicherry.'
    },
    {
      id: 2,
      image: '/images/hero-2.jpg',
      badge: 'Compassion In Action',
      titlePrefix: 'Humanity is',
      titleMiddle: 'the Mother of',
      titleHighlight: 'Dharma',
      description: 'Join hands with Dharmic Life Foundation to empower students, care for homeless families, and preserve timeless sacred traditions.'
    }
  ];

  const slides = (content && content.slides && content.slides.length > 0)
    ? content.slides
    : defaultSlides;

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
            {/* Background image container with subtle ken-burns zoom */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={`w-full h-full bg-cover bg-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                style={{ backgroundImage: `url(${getMediaUrl(slide.image)})` }}
              />
            </div>

            {/* Subtle Gradient Overlay for enhanced image visibility and readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/10 pointer-events-none"></div>

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
                  className={`text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white leading-tight drop-shadow-md transition-all duration-700 delay-200 ${
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
                  className={`text-sm sm:text-base lg:text-lg text-white/95 drop-shadow leading-relaxed max-w-xl transition-all duration-700 delay-300 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
                  }`}
                >
                  {slide.description}
                </p>

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
