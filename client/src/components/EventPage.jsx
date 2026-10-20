import React, { useState } from 'react';
import { Home, ChevronRight, ChevronLeft, Calendar, MapPin, Check, ArrowRight, X } from 'lucide-react';

export default function EventPage({ onNavigate }) {
  // Carousel active index
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Grid pagination state (page 1 or page 2)
  const [gridPage, setGridPage] = useState(1);

  // Selected event modal
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  // Complete list of events matching live site
  const allEvents = [
    {
      id: 1,
      title: 'Honoring the Unclaimed Souls',
      date: '08 Sep, 2023',
      location: 'Pondicherry Crematorium',
      category: 'Moksha Seva',
      image: '/images/3-5.jpg',
      summary: 'Solemn traditional cremation rites performed for unclaimed departed individuals with prayers for eternal peace.',
      details: 'In coordination with local hospitals and authorities, our foundation conducts sacred Vedic funeral rites, offering prayers and respectful ceremonies for departed souls who had no one else to claim them.'
    },
    {
      id: 2,
      title: 'Annadhanam',
      date: '11 Sep, 2023',
      location: 'Pondicherry Community Center',
      category: 'Annadhanam',
      image: '/images/photo-2.jpg',
      summary: 'Nutritious meal distribution and prasadam served to over 1,200 homeless and underprivileged individuals.',
      details: 'Daily and mega food distribution drives ensuring nutritious, warm meals are served with dignity, compassion, and respect to hungry street dwellers and struggling families.'
    },
    {
      id: 3,
      title: 'Bridging the Digital Divide: Empowering Students Through Technology',
      date: '11 Aug, 2023',
      location: 'Government High School, Pondicherry',
      category: 'Education',
      image: '/images/7.jpg',
      summary: 'Distribution of digital learning kits, tablets, and educational software to underprivileged students.',
      details: 'Empowering underprivileged youth by sponsoring student tuition fees, educational kits, computers, and digital learning resources to ensure quality education for all.'
    },
    {
      id: 4,
      title: 'Empowering Motherhood and Honoring Womanhood',
      date: '11 Sep, 2023',
      location: 'Women Welfare Center',
      category: 'Women Empowerment',
      image: '/images/9-2.jpg',
      summary: 'Maternal nutrition drive, prenatal wellness kits distribution, and vocational training workshop for mothers.',
      details: 'Conducting skill-building workshops, tailoring courses, and vocational programs helping widowed and underprivileged women achieve financial independence.'
    },
    {
      id: 5,
      title: 'Dressing with Dignity: Providing Warmth to the Homeless',
      date: '09 May, 2023',
      location: 'Beach Road & Bus Terminal Area',
      category: 'Relief Seva',
      image: '/images/22.jpg',
      summary: 'Distribution of new clothing, warm blankets, and hygiene kits to street dwellers and destitute families.',
      details: 'Seasonal outreach drives distributing clean clothes, blankets, and essential personal hygiene kits to homeless persons living on footpaths and public shelters.'
    }
  ];

  // Grid list order as on live page:
  // Page 1: Annadhanam, Empowering Motherhood, Honoring Unclaimed Souls, Bridging Digital Divide
  // Page 2: Dressing with Dignity
  const gridPage1 = [
    allEvents[1], // Annadhanam
    allEvents[3], // Empowering Motherhood
    allEvents[0], // Honoring Unclaimed Souls
    allEvents[2], // Bridging Digital Divide
  ];
  const gridPage2 = [
    allEvents[4], // Dressing with Dignity
  ];

  const currentGridEvents = gridPage === 1 ? gridPage1 : gridPage2;

  // Carousel controls (3 cards visible at a time on desktop)
  const maxCarouselIndex = allEvents.length - 3;
  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev >= maxCarouselIndex ? 0 : prev + 1));
  };
  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev <= 0 ? maxCarouselIndex : prev - 1));
  };

  return (
    <div className="bg-white min-h-screen animate-fadeIn font-sans text-gray-800">
      
      {/* 1. Page Title & Breadcrumb Banner */}
      <div className="bg-[#1f1e1d] text-white py-12 relative overflow-hidden border-b-4 border-[#901C25]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-wide">
              Upcoming Events
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Upcoming Events &bull; Dharmic Life Foundation
            </p>
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
            <span className="text-[#E48A2D] font-bold">Upcoming Events</span>
          </div>
        </div>
      </div>

      {/* 2. Top "Purpose of Our Programmes" Intro Widget (Exact Live HTML & CSS) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="events-intro-widget bg-[#FFFDF9] border border-[#EEDAC5] rounded-xl shadow-lg overflow-hidden font-serif">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#8B2613] to-[#B84318] text-white p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#FFD700] mb-2 font-serif">
              Upcoming Events &amp; Programmes
            </h2>
            <p className="text-base sm:text-lg italic text-[#F8EBE1] font-sans max-w-2xl mx-auto leading-relaxed">
              Promoting Dharma, preserving ancient traditions, and inspiring future generations.
            </p>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-6 font-sans">
            
            {/* Highlight Box */}
            <div className="bg-[#FFF6ED] border-l-4 border-[#B84318] p-5 rounded-r-lg text-sm sm:text-base text-gray-800 leading-relaxed font-normal">
              <strong className="font-bold text-[#8B2613]">Dharmic Life Foundation</strong> is planning several upcoming events and programmes designed to bring our community together in service, learning, and celebration of timeless values.
            </div>

            {/* Objectives Card */}
            <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-lg p-6">
              <h3 className="text-[#8B2613] font-serif font-bold text-lg sm:text-xl flex items-center gap-2 mb-4">
                <span>🌟 Purpose of Our Programmes</span>
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3 sm:p-3.5 rounded border border-[#EEDAC5] text-sm">
                  <span className="text-[#B84318] text-lg shrink-0">🛕</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900 font-semibold">Promote Dharma:</strong> Spreading awareness about living in harmony with nature and moral duties.
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3 sm:p-3.5 rounded border border-[#EEDAC5] text-sm">
                  <span className="text-[#B84318] text-lg shrink-0">📜</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900 font-semibold">Preserve Traditions:</strong> Safeguarding and honoring our rich ancient heritage and practices.
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3 sm:p-3.5 rounded border border-[#EEDAC5] text-sm">
                  <span className="text-[#B84318] text-lg shrink-0">🏆</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900 font-semibold">Recognize Excellence:</strong> Honoring dedicated individuals who embody selfless service and character.
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3 sm:p-3.5 rounded border border-[#EEDAC5] text-sm">
                  <span className="text-[#B84318] text-lg shrink-0">🌱</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900 font-semibold">Inspire Youth:</strong> Encouraging the younger generation to embrace a Dharmic way of life.
                  </span>
                </div>
              </div>
            </div>

            {/* Transition Lead-in */}
            <div className="text-center font-semibold text-[#611A0D] p-3.5 bg-[#FFF6ED] rounded-md text-sm sm:text-base">
              📅 Details of our upcoming events are provided below:
            </div>

          </div>

          {/* Footer Values */}
          <div className="bg-[#F4ECE1] py-4 px-6 text-center border-t border-[#EEDAC5]">
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#611A0D]">
              Heritage &bull; Service &bull; Youth Empowerment &bull; Dharmic Living
            </span>
          </div>

        </div>
      </div>

      {/* 3. "Our Sacred Mission & Community Services" Section */}
      <section className="py-16 bg-white overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Showcase with Decorative Shapes */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative max-w-md w-full">
                {/* Main Image */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
                  <img
                    src="/images/image-14.png"
                    alt="Our Sacred Mission"
                    className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.src = '/images/about.jpg'; }}
                  />
                </div>

                {/* Decorative Shape 1 */}
                <div className="absolute -top-6 -left-6 z-0 w-24 h-24 opacity-80 pointer-events-none hidden sm:block">
                  <img
                    src="/images/image-15.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Decorative Shape 2 */}
                <div className="absolute -bottom-6 -right-6 z-20 w-24 h-24 opacity-90 pointer-events-none hidden sm:block">
                  <img
                    src="/images/image-16.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 leading-tight">
                  Our Sacred Mission &amp; Community Services
                </h2>
                <div className="w-16 h-1 bg-[#901C25] mt-3 rounded-full"></div>
              </div>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Dharmic Life Foundation is a charitable trust dedicated to uplifting humanity and preserving spiritual values through selfless community service. Grounded in the principles of righteousness, compassion, and duty, the foundation works tirelessly to feed the hungry, honor the departed, empower vulnerable groups, and support the homeless. By bridging the gap between those who want to help and those in dire need, the trust strives to create a harmonious society built on mutual respect and dignity.
              </p>

              {/* 2-Column Checkmark List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm font-semibold text-gray-800">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-[#901C25] flex items-center justify-center shrink-0">
                      <Check size={14} className="stroke-[3]" />
                    </span>
                    <span>Annadanam</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-gray-800">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-[#901C25] flex items-center justify-center shrink-0">
                      <Check size={14} className="stroke-[3]" />
                    </span>
                    <span>Unclaimed Souls</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm font-semibold text-gray-800">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-[#901C25] flex items-center justify-center shrink-0">
                      <Check size={14} className="stroke-[3]" />
                    </span>
                    <span>Spreading the Dharmic Way of Life</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-gray-800">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-[#901C25] flex items-center justify-center shrink-0">
                      <Check size={14} className="stroke-[3]" />
                    </span>
                    <span>Educational Support</span>
                  </div>
                </div>
              </div>

              {/* Contact Us Button */}
              <div className="pt-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-3.5 bg-[#901C25] hover:bg-[#73161d] text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2 group"
                >
                  <span>contact us</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Section 1: "Our Events Around the World" Carousel */}
      <section className="py-16 bg-[#FAF8F5] border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row with Tagline and "Read More" button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-1">
                Our events
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900">
                Our Events Around the World
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevCarousel}
                className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-[#901C25] hover:text-white hover:border-[#901C25] flex items-center justify-center transition shadow-sm"
                aria-label="Previous Events"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextCarousel}
                className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-[#901C25] hover:text-white hover:border-[#901C25] flex items-center justify-center transition shadow-sm"
                aria-label="Next Events"
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('events-grid-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-800 hover:bg-[#901C25] hover:text-white hover:border-[#901C25] font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-sm ml-2 hidden sm:block"
              >
                Read More
              </button>
            </div>
          </div>

          {/* Carousel Slider Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
            {allEvents.slice(carouselIndex, carouselIndex + 3).map((ev) => (
              <div
                key={ev.id}
                onClick={() => setSelectedEventModal(ev)}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group"
              >
                {/* Image & Date Badge */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4 bg-[#901C25] text-white px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow">
                    <Calendar size={13} className="text-[#E48A2D]" />
                    <span>{ev.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-gray-900 group-hover:text-[#901C25] transition line-clamp-2 leading-snug">
                      {ev.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                      <MapPin size={13} className="text-[#901C25]" />
                      <span>{ev.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#901C25] group-hover:text-[#E48A2D] flex items-center gap-1">
                      <span>View Details</span>
                      <ArrowRight size={13} />
                    </span>
                    <span className="text-gray-400 font-medium">{ev.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Section 2: "Our Events Around the World" Paginated Grid */}
      <section id="events-grid-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-1">
              Our Events
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900">
              Our Events Around the World
            </h2>
            <div className="w-16 h-1 bg-[#901C25] mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Grid Layout (4 cards on page 1, 1 card on page 2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentGridEvents.map((ev) => (
              <div
                key={`grid-${ev.id}`}
                onClick={() => setSelectedEventModal(ev)}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 bg-[#901C25] text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 shadow">
                    <Calendar size={12} className="text-[#E48A2D]" />
                    <span>{ev.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold font-serif text-gray-900 group-hover:text-[#901C25] transition line-clamp-2 leading-snug">
                      {ev.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                      <MapPin size={12} className="text-[#901C25]" />
                      <span className="truncate">{ev.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#901C25] flex items-center gap-1">
                      <span>Read More</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => setGridPage(1)}
              className={`w-10 h-10 rounded-lg font-bold text-sm transition flex items-center justify-center ${
                gridPage === 1
                  ? 'bg-[#901C25] text-white shadow-md'
                  : 'bg-stone-100 text-gray-700 hover:bg-stone-200'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setGridPage(2)}
              className={`w-10 h-10 rounded-lg font-bold text-sm transition flex items-center justify-center ${
                gridPage === 2
                  ? 'bg-[#901C25] text-white shadow-md'
                  : 'bg-stone-100 text-gray-700 hover:bg-stone-200'
              }`}
            >
              2
            </button>
            {gridPage === 1 && (
              <button
                onClick={() => setGridPage(2)}
                className="w-10 h-10 rounded-lg font-bold text-sm bg-stone-100 text-gray-700 hover:bg-stone-200 transition flex items-center justify-center"
                aria-label="Next Page"
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* 6. Bottom Call-To-Action Banner ("Your story starts from here") */}
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
                Ready to raise funds for idea? Join our compassionate movement.
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

      {/* 7. Event Detail Modal Dialog */}
      {selectedEventModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedEventModal(null)}
        >
          <div
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            <div className="relative h-60 w-full">
              <img
                src={selectedEventModal.image}
                alt={selectedEventModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="inline-block px-2.5 py-0.5 bg-[#E48A2D] text-white text-xs font-bold rounded mb-1">
                  {selectedEventModal.category}
                </span>
                <h3 className="text-xl font-bold font-serif leading-tight">
                  {selectedEventModal.title}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 text-xs text-gray-500 pb-2 border-b border-gray-100">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#901C25]" />
                  <span>{selectedEventModal.date}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#901C25]" />
                  <span>{selectedEventModal.location}</span>
                </span>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {selectedEventModal.details}
              </p>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedEventModal(null)}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-gray-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedEventModal(null);
                    onNavigate('contact');
                  }}
                  className="px-6 py-2.5 bg-[#901C25] hover:bg-[#73161d] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow transition"
                >
                  Contact About This Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
