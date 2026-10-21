import React, { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsSection({ testimonials = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const fallbackTestimonials = [
    {
      id: 1,
      author_name: 'Christine Eve',
      author_role: 'Founder & Community Patron',
      quote: 'The selfless dedication of Dharmic Life Foundation in providing dignity in death to unclaimed souls is something deeply noble. Their transparency and heartfelt commitment make them a true pillar of light in Pondicherry.',
      rating: 5,
      avatar: '/images/team-3.jpg'
    },
    {
      id: 2,
      author_name: 'David Hardson',
      author_role: 'Education Volunteer',
      quote: 'Volunteering with the educational support team opened my eyes to the incredible potential in government schools. When provided with tuition fees, uniforms, and study books, these children blossom beyond imagination.',
      rating: 5,
      avatar: '/images/team-4.jpg'
    },
    {
      id: 3,
      author_name: 'Jessica Brown',
      author_role: 'Social Worker & Supporter',
      quote: 'Annadhanam is not just giving food; it is restoring human connection and respect. The warm smiles on hungry elders’ faces remind us every single day that compassion is truly the heart of Dharma.',
      rating: 5,
      avatar: '/images/team-1.jpg'
    }
  ];

  const items = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const current = items[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-2">
            <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
            <span>Our testimonials</span>
            <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gray-900 leading-tight">
            What They’re Talking About Welowe
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto bg-stone-50 rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl relative">
          {/* Large decorative quote mark */}
          <div className="absolute top-6 right-8 text-[#901C25]/10">
            <Quote size={80} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="shrink-0 text-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#E48A2D] shadow-lg mx-auto">
                <img
                  src={current.avatar}
                  alt={current.author_name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Testimonial Text */}
            <div className="flex-1 text-center md:text-left space-y-4">
              {/* Star Rating */}
              <div className="flex items-center justify-center md:justify-start gap-1">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#E48A2D] text-[#E48A2D]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-base sm:text-lg italic leading-relaxed font-sans">
                "{current.quote}"
              </p>

              {/* Author */}
              <div>
                <h4 className="text-xl font-bold font-serif text-gray-900">{current.author_name}</h4>
                <p className="text-xs sm:text-sm text-[#901C25] font-semibold">{current.author_role}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#901C25] hover:bg-[#901C25] hover:text-white flex items-center justify-center transition"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-6 bg-[#901C25]' : 'w-2.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#901C25] hover:bg-[#901C25] hover:text-white flex items-center justify-center transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
