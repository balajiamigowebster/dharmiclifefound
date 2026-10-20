import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Home, ChevronRight as BreadcrumbArrow, Sparkles, ArrowRight, Heart } from 'lucide-react';

export default function TestimonialsPage({ onNavigate, onOpenDonation, onOpenContact }) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const featuredReviews = [
    {
      id: 1,
      name: 'Christine Eve',
      role: 'Founder & CEO',
      quote: 'posuere luctus orci. Donec vitae mattis quam, vitae tempor arcu. Aenean non odio porttitor, convallis erat sit amet. Being a survivor now, I realized I was not educated or aware about what breast cancer actually was and how it impacted and affected people.',
      rating: 5,
      avatar: '/images/testimonial.jpg'
    },
    {
      id: 2,
      name: 'Kevin Smith',
      role: 'Crowd Company Founder',
      quote: 'posuere luctus orci. Donec vitae mattis quam, vitae tempor arcu. Aenean non odio porttitor, convallis erat sit amet. Being a survivor now, I realized I was not educated or aware about what breast cancer actually was and how it impacted and affected people.',
      rating: 5,
      avatar: '/images/team-2.jpg'
    },
    {
      id: 3,
      name: 'Jessica Brown',
      role: 'Founder & CEO',
      quote: 'posuere luctus orci. Donec vitae mattis quam, vitae tempor arcu. Aenean non odio porttitor, convallis erat sit amet. Being a survivor now, I realized I was not educated or aware about what breast cancer actually was and how it impacted and affected people.',
      rating: 5,
      avatar: '/images/team-1.jpg'
    },
    {
      id: 4,
      name: 'David Anderson',
      role: 'Customer',
      quote: 'posuere luctus orci. Donec vitae mattis quam, vitae tempor arcu. Aenean non odio porttitor, convallis erat sit amet. Being a survivor now, I realized I was not educated or aware about what breast cancer actually was and how it impacted and affected people.',
      rating: 5,
      avatar: '/images/team-4.jpg'
    },
    {
      id: 5,
      name: 'Susan Neill',
      role: 'Founder & CEO',
      quote: 'posuere luctus orci. Donec vitae mattis quam, vitae tempor arcu. Aenean non odio porttitor, convallis erat sit amet. Being a survivor now, I realized I was not educated or aware about what breast cancer actually was and how it impacted and affected people.',
      rating: 5,
      avatar: '/images/team-3.jpg'
    }
  ];

  const gridReviews = [
    {
      id: 1,
      name: 'Alexsia Jorgina',
      location: 'From USA',
      quote: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula.',
      avatar: '/images/testimonial.jpg',
      rating: 5
    },
    {
      id: 2,
      name: 'Alexsia Jorgina',
      location: 'From USA',
      quote: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula.',
      avatar: '/images/testimonial.jpg',
      rating: 5
    },
    {
      id: 3,
      name: 'Jessica Brown',
      location: 'From USA',
      quote: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula.',
      avatar: '/images/team-1.jpg',
      rating: 5
    },
    {
      id: 4,
      name: 'Alexsia Jorgina',
      location: 'From USA',
      quote: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula.',
      avatar: '/images/testimonial.jpg',
      rating: 5
    }
  ];

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % featuredReviews.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + featuredReviews.length) % featuredReviews.length);
  };

  const currentFeatured = featuredReviews[carouselIndex];

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
                Community Reflections &bull; Voices of Our Patrons and Beneficiaries
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

      {/* 2. Voices of Our Community Intro Widget (Matching exact design) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
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

      {/* 3. Featured Carousel Section ("What they’re talking about welowe") */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-2">
              <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
              <span>Our testimonials</span>
              <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gray-900 leading-tight">
              What they’re talking about welowe
            </h2>
          </div>

          {/* Carousel Slider Card */}
          <div className="max-w-4xl mx-auto bg-stone-50 rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl relative">
            <div className="absolute top-6 right-8 text-[#901C25]/10">
              <Quote size={80} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="shrink-0 text-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#E48A2D] shadow-lg mx-auto bg-gray-100">
                  <img
                    src={currentFeatured.avatar}
                    alt={currentFeatured.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 text-center md:text-left space-y-4">
                {/* Rating */}
                <div className="flex items-center justify-center md:justify-start gap-1">
                  {[...Array(currentFeatured.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#E48A2D] text-[#E48A2D]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-base sm:text-lg italic leading-relaxed font-sans">
                  "{currentFeatured.quote}"
                </p>

                {/* Author */}
                <div>
                  <h4 className="text-xl font-bold font-serif text-gray-900">{currentFeatured.name}</h4>
                  <p className="text-xs sm:text-sm text-[#901C25] font-semibold">{currentFeatured.role}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#901C25] hover:bg-[#901C25] hover:text-white flex items-center justify-center transition"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                {featuredReviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === carouselIndex ? 'w-6 bg-[#901C25]' : 'w-2.5 bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#901C25] hover:bg-[#901C25] hover:text-white flex items-center justify-center transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Grid Review Section ("People’s talk about us") */}
      <section className="py-16 bg-stone-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-2">
              <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
              <span>Our testimonial</span>
              <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gray-900 leading-tight">
              People’s talk about us
            </h2>
          </div>

          {/* 4-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {gridReviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-[#E48A2D]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-[#E48A2D]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic">
                    "{review.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 shrink-0">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 font-serif text-base">{review.name}</h4>
                    <span className="text-xs text-gray-500 font-semibold">{review.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Bottom CTA Banner ("Your story starts from here") */}
      <section className="bg-gradient-to-r from-[#901C25] via-[#73161d] to-[#901C25] text-white py-14 border-t-4 border-[#E48A2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-[#E48A2D] text-white text-xs font-bold uppercase rounded-full tracking-wider">
                Results in few seconds
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Your story starts from here
              </h3>
              <p className="text-white/80 text-sm">
                Ready to raise funds for idea? Join our compassionate movement.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => onOpenContact ? onOpenContact() : onNavigate('contact')}
                className="px-8 py-3.5 bg-white text-[#901C25] hover:bg-stone-100 font-bold text-sm rounded-full shadow-lg transition transform active:scale-95 flex items-center gap-2"
              >
                <span>Make it Happen</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onOpenDonation('Testimonials Giving')}
                className="px-8 py-3.5 bg-[#E48A2D] hover:bg-[#c9751e] text-white font-bold text-sm rounded-full shadow-lg transition transform active:scale-95 flex items-center gap-2"
              >
                <Heart size={16} className="fill-white" />
                <span>Support Us</span>
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
