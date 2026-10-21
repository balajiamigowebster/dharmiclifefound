import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Heart, Lock } from 'lucide-react';

export default function Header({
  currentPage = 'home',
  onNavigate,
  onOpenDonation,
  onOpenContact,
  onSelectActivity
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [activitiesDropdown, setActivitiesDropdown] = useState(false);
  const [awardsDropdown, setAwardsDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activitiesList = [
    { name: 'Annadhanam', slug: 'annadhanam' },
    { name: 'Unclaimed Souls', slug: 'unclaimed-souls' },
    { name: 'Spreading the Dharmic way of life', slug: 'spreading-the-dharmic-way-of-life' },
    { name: 'Educational Support', slug: 'education-support' },
    { name: 'Women Empowerment', slug: 'women-empowerment' },
    { name: 'Caring for Homeless People', slug: 'caring-for-homeless-people' },
    { name: 'Other Additional Activities', slug: 'other-additional-activities' }
  ];

  const activitySlugs = [
    'annadhanam',
    'unclaimed-souls',
    'spreading-the-dharmic-way-of-life',
    'education-support',
    'women-empowerment',
    'caring-for-homeless-people',
    'other-additional-activities'
  ];

  const handleNavClick = (targetId) => {
    setMobileMenuOpen(false);
    setAboutDropdown(false);
    setActivitiesDropdown(false);
    setAwardsDropdown(false);

    if (targetId === 'admin') {
      if (onNavigate) onNavigate('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'trustees') {
      if (onNavigate) onNavigate('trustees');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'trust') {
      if (onNavigate) onNavigate('trust');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'contact') {
      if (onNavigate) onNavigate('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'testimonials') {
      if (onNavigate) onNavigate('testimonials');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'gallery') {
      if (onNavigate) onNavigate('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'events') {
      if (onNavigate) onNavigate('events');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'activities') {
      if (onNavigate) onNavigate('activities');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (activitySlugs.includes(targetId)) {
      if (onNavigate) onNavigate(targetId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'home') {
      if (onNavigate) onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Navigating to a section on home
    if (currentPage !== 'home') {
      if (onNavigate) onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`bg-white sticky top-0 z-40 transition-shadow duration-300 ${scrolled ? 'shadow-md py-2' : 'py-3.5'} border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between lg:justify-center">
          
          {/* Desktop Left Nav Menu (Balanced 50% flex-1 column) */}
          <nav className="hidden lg:flex flex-1 items-center justify-end mr-4 xl:mr-7">
            <ul className="flex items-center space-x-5 xl:space-x-7 whitespace-nowrap">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('home');
                  }}
                  className={`font-bold text-[14.5px] xl:text-[15px] nav-link whitespace-nowrap transition ${
                    currentPage === 'home' ? 'text-[#901C25] active font-extrabold' : 'text-[#901C25]'
                  }`}
                >
                  Home
                </a>
              </li>

              {/* About Us Dropdown (Containing Trust & Trustees) */}
              <li
                className="relative py-2 group"
                onMouseEnter={() => setAboutDropdown(true)}
                onMouseLeave={() => setAboutDropdown(false)}
              >
                <a
                  href="/trust"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('trust');
                  }}
                  className={`font-bold text-[14.5px] xl:text-[15px] nav-link whitespace-nowrap flex items-center gap-1 transition ${
                    currentPage === 'trust' || currentPage === 'trustees' ? 'text-[#901C25] active font-extrabold' : 'text-[#901C25]'
                  }`}
                >
                  <span>About Us</span>
                  <ChevronDown size={14} className="opacity-70 transition-transform group-hover:rotate-180" />
                </a>
                
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-xl rounded-md border border-gray-100 py-1 z-50 transition-all duration-200 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 ${
                  aboutDropdown
                    ? 'opacity-100 visible pointer-events-auto'
                    : 'opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto'
                }`}>
                  <a
                    href="/trust"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('trust');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium dropdown-item border-b border-gray-50 flex items-center justify-between block transition hover:bg-stone-50 ${
                      currentPage === 'trust' ? 'text-[#E48A2D] font-bold bg-amber-50/50' : 'text-[#901C25]'
                    }`}
                  >
                    <span>Trust</span>
                    {currentPage === 'trust' && <span className="w-1.5 h-1.5 rounded-full bg-[#E48A2D]"></span>}
                  </a>
                  <a
                    href="/trustees"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('trustees');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium dropdown-item flex items-center justify-between block transition hover:bg-stone-50 ${
                      currentPage === 'trustees' ? 'text-[#E48A2D] font-bold bg-amber-50/50' : 'text-[#901C25]'
                    }`}
                  >
                    <span>Trustees</span>
                    {currentPage === 'trustees' && <span className="w-1.5 h-1.5 rounded-full bg-[#E48A2D]"></span>}
                  </a>
                </div>
              </li>

              {/* Activities Dropdown */}
              <li
                className="relative py-2 group"
                onMouseEnter={() => setActivitiesDropdown(true)}
                onMouseLeave={() => setActivitiesDropdown(false)}
              >
                <a
                  href="/activities"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('activities');
                  }}
                  className={`font-bold text-[14.5px] xl:text-[15px] nav-link whitespace-nowrap flex items-center gap-1 transition ${
                    currentPage === 'activities' || activitySlugs.includes(currentPage) ? 'text-[#901C25] active font-extrabold' : 'text-[#901C25]'
                  }`}
                >
                  <span>Activities</span>
                  <ChevronDown size={14} className="opacity-70 transition-transform group-hover:rotate-180" />
                </a>
                
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white shadow-xl rounded-md border border-gray-100 py-1 z-50 transition-all duration-200 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 ${
                  activitiesDropdown
                    ? 'opacity-100 visible pointer-events-auto'
                    : 'opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto'
                }`}>
                  {activitiesList.map((act) => (
                    <a
                      key={act.slug}
                      href={`/${act.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(act.slug);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[13.5px] font-medium dropdown-item border-b border-gray-50 truncate block transition hover:bg-stone-50 ${
                        currentPage === act.slug ? 'text-[#E48A2D] font-bold bg-amber-50/50' : 'text-[#901C25]'
                      }`}
                    >
                      {act.name}
                    </a>
                  ))}
                </div>
              </li>

              {/* Awards Dropdown */}
              <li
                className="relative py-2 group"
                onMouseEnter={() => setAwardsDropdown(true)}
                onMouseLeave={() => setAwardsDropdown(false)}
              >
                <button
                  onClick={() => handleNavClick('events')}
                  className="text-[#901C25] font-bold text-[14.5px] xl:text-[15px] nav-link whitespace-nowrap flex items-center gap-1 transition"
                >
                  <span>Awards</span>
                  <ChevronDown size={14} className="opacity-70 transition-transform group-hover:rotate-180" />
                </button>
                
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-52 bg-white shadow-xl rounded-md border border-gray-100 py-1 z-50 transition-all duration-200 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 ${
                  awardsDropdown
                    ? 'opacity-100 visible pointer-events-auto'
                    : 'opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto'
                }`}>
                  <a
                    href="/event-page"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('events');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[#901C25] font-medium dropdown-item border-b border-gray-50 block transition hover:bg-stone-50"
                  >
                    Srowtha Rathana Award
                  </a>
                  <a
                    href="/event-page"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('events');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[#901C25] font-medium dropdown-item block transition hover:bg-stone-50"
                  >
                    Dharma Shri Award
                  </a>
                </div>
              </li>
            </ul>
          </nav>

          {/* Center Logo (Exact 50% Horizontal Center) */}
          <div className="flex-shrink-0 mx-auto lg:mx-0 py-1 flex items-center justify-center">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="block focus:outline-none"
              aria-label="Dharmic Life Foundation Home"
            >
              <img
                src="/images/logo.jpeg"
                alt="Dharmic Life Foundation Logo"
                className="h-20 sm:h-24 lg:h-28 w-auto object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm"
              />
            </a>
          </div>

          {/* Desktop Right Nav Menu (Balanced 50% flex-1 column) */}
          <nav className="hidden lg:flex flex-1 items-center justify-start ml-4 xl:ml-7">
            <ul className="flex items-center space-x-3.5 xl:space-x-5 whitespace-nowrap">
              <li className="flex-shrink-0">
                <a
                  href="/event-page"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('events');
                  }}
                  className={`font-bold text-[14.5px] xl:text-[15px] nav-link whitespace-nowrap transition ${
                    currentPage === 'events' ? 'text-[#901C25] active font-extrabold' : 'text-[#901C25]'
                  }`}
                >
                  Upcoming Events
                </a>
              </li>
              <li className="flex-shrink-0">
                <a
                  href="/gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('gallery');
                  }}
                  className={`font-bold text-[14.5px] xl:text-[15px] nav-link whitespace-nowrap transition ${
                    currentPage === 'gallery' ? 'text-[#901C25] active font-extrabold' : 'text-[#901C25]'
                  }`}
                >
                  Gallery
                </a>
              </li>
              <li className="flex-shrink-0">
                <a
                  href="/testimonials"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('testimonials');
                  }}
                  className={`font-bold text-[14.5px] xl:text-[15px] nav-link whitespace-nowrap transition ${
                    currentPage === 'testimonials' ? 'text-[#901C25] active font-extrabold' : 'text-[#901C25]'
                  }`}
                >
                  Testimonials
                </a>
              </li>
              <li className="flex-shrink-0">
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('contact');
                  }}
                  className={`font-bold text-[14.5px] xl:text-[15px] nav-link whitespace-nowrap transition ${
                    currentPage === 'contact' ? 'text-[#901C25] active font-extrabold' : 'text-[#901C25]'
                  }`}
                >
                  Contact
                </a>
              </li>
              <li className="flex-shrink-0">
                <a
                  href="/admin"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('admin');
                  }}
                  className={`font-bold text-[13px] xl:text-[13.5px] px-2.5 py-1 rounded-md border border-[#901C25]/25 hover:bg-[#901C25] hover:text-white whitespace-nowrap transition flex items-center gap-1.5 ${
                    currentPage === 'admin' ? 'bg-[#901C25] text-white shadow-sm' : 'text-[#901C25] hover:border-[#901C25]'
                  }`}
                  title="Admin Portal"
                >
                  <Lock size={12} />
                  <span>Admin</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#901C25] hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 shadow-xl animate-fadeIn space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left py-2 px-3 font-bold rounded ${
              currentPage === 'home' ? 'bg-red-50 text-[#901C25]' : 'text-gray-800'
            }`}
          >
            Home
          </button>

          {/* About Us Submenu Accordion */}
          <div className="space-y-1">
            <div className="w-full text-left py-2 px-3 text-[#901C25] font-bold rounded flex items-center justify-between bg-gray-50">
              <span>About Us</span>
            </div>
            <div className="pl-4 space-y-1 pt-1">
              <a
                href="/trust"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('trust');
                }}
                className={`w-full text-left py-2 px-3 text-sm font-semibold rounded flex items-center justify-between block ${
                  currentPage === 'trust' ? 'bg-amber-100 text-[#901C25]' : 'text-gray-700 hover:text-[#901C25]'
                }`}
              >
                <span>&bull; Trust</span>
                {currentPage === 'trust' && <span className="text-xs text-[#E48A2D] font-bold">Active</span>}
              </a>
              <a
                href="/trustees"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('trustees');
                }}
                className={`w-full text-left py-2 px-3 text-sm font-semibold rounded flex items-center justify-between block ${
                  currentPage === 'trustees' ? 'bg-amber-100 text-[#901C25]' : 'text-gray-700 hover:text-[#901C25]'
                }`}
              >
                <span>&bull; Trustees</span>
                {currentPage === 'trustees' && <span className="text-xs text-[#E48A2D] font-bold">Active</span>}
              </a>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('activities')}
            className="w-full text-left py-2 px-3 text-[#901C25] font-bold rounded hover:bg-red-50"
          >
            Activities
          </button>
          <div className="pl-4 space-y-1">
            {activitiesList.map((a) => (
              <button
                key={a.slug}
                onClick={() => handleNavClick(a.slug)}
                className={`w-full text-left py-1 text-sm truncate ${
                  currentPage === a.slug ? 'text-[#E48A2D] font-bold' : 'text-gray-700 hover:text-[#901C25]'
                }`}
              >
                - {a.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavClick('events')}
            className={`w-full text-left py-2 px-3 font-bold rounded ${
              currentPage === 'events' ? 'bg-red-50 text-[#901C25]' : 'text-gray-800'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`w-full text-left py-2 px-3 font-bold rounded ${
              currentPage === 'gallery' ? 'bg-red-50 text-[#901C25]' : 'text-gray-800'
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => handleNavClick('testimonials')}
            className={`w-full text-left py-2 px-3 font-bold rounded ${
              currentPage === 'testimonials' ? 'bg-red-50 text-[#901C25]' : 'text-gray-800'
            }`}
          >
            Testimonials
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left py-2 px-3 font-bold rounded ${
              currentPage === 'contact' ? 'bg-red-50 text-[#901C25]' : 'text-gray-800'
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className={`w-full text-left py-2 px-3 font-bold rounded flex items-center gap-2 border-t border-gray-100 pt-3 mt-1 ${
              currentPage === 'admin' ? 'bg-red-50 text-[#901C25]' : 'text-[#901C25] hover:bg-stone-50'
            }`}
          >
            <Lock size={15} className="text-[#901C25]" />
            <span>Admin Portal</span>
          </button>
        </div>
      )}
    </header>
  );
}
