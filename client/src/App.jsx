import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import AboutUs from './components/AboutUs';
import CoreActivities from './components/CoreActivities';

import VolunteerSection from './components/VolunteerSection';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';

// Pages
import TrustPage from './components/TrustPage';
import TrusteesPage from './components/TrusteesPage';
import ContactPage from './components/ContactPage';
import TestimonialsPage from './components/TestimonialsPage';
import GalleryPage from './components/GalleryPage';
import EventPage from './components/EventPage';
import ActivitiesPage from './components/ActivitiesPage';
import ActivityDetailPage from './components/ActivityDetailPage';
import AnnadhanamPage from './components/AnnadhanamPage';
import UnclaimedSoulsPage from './components/UnclaimedSoulsPage';
import SpreadingDharmicWayPage from './components/SpreadingDharmicWayPage';
import EducationSupportPage from './components/EducationSupportPage';
import WomenEmpowermentPage from './components/WomenEmpowermentPage';
import CaringForHomelessPage from './components/CaringForHomelessPage';
import OtherActivitiesPage from './components/OtherActivitiesPage';
import SrowthaRathanaAwardPage from './components/SrowthaRathanaAwardPage';
import DharmaShriAwardPage from './components/DharmaShriAwardPage';

// Modals
import DonationModal from './components/Modals/DonationModal';
import VolunteerModal from './components/Modals/VolunteerModal';
import ActivityModal from './components/Modals/ActivityModal';
import ContactModal from './components/Modals/ContactModal';

// Admin Panel
import AdminPanel from './components/Admin/AdminPanel';

// API
import {
  fetchActivities,
  fetchEvents,
  fetchTestimonials,
  fetchBlogPosts,
  fetchTeam,
  fetchGallery,
  fetchHomepageContent
} from './api';

export default function App() {
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [team, setTeam] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [homeContent, setHomeContent] = useState(null);

  // Activity Slugs matching live site
  const activitySlugs = [
    'annadhanam',
    'unclaimed-souls',
    'spreading-the-dharmic-way-of-life',
    'education-support',
    'women-empowerment',
    'caring-for-homeless-people',
    'other-additional-activities'
  ];

  // Page routing state
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('admin') || hash.includes('admin')) return 'admin';
      if (path.includes('trustees') || hash.includes('trustees')) return 'trustees';
      if (path.includes('trust') || hash.includes('trust')) return 'trust';
      if (path.includes('contact') || hash.includes('contact')) return 'contact';
      if (path.includes('testimonials') || hash.includes('testimonials')) return 'testimonials';
      if (path.includes('gallery') || hash.includes('gallery')) return 'gallery';
      if (path.includes('srowtha') || hash.includes('srowtha')) return 'srowtha-rathana-award';
      if (path.includes('dharma-shri') || hash.includes('dharma-shri')) return 'dharma-shri-award';
      if (path.includes('event') || hash.includes('event')) return 'events';
      if (path === '/activities' || path === '/activities/' || hash.includes('activities')) return 'activities';

      const matchedActivity = activitySlugs.find(s => path.includes(s) || hash.includes(s));
      if (matchedActivity) return matchedActivity;
    }
    return 'home';
  });

  // Modals state
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [donationCause, setDonationCause] = useState('General Seva');
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    async function loadData() {
      const [acts, evs, tests, blogs, tm, gal, hpContent] = await Promise.all([
        fetchActivities(),
        fetchEvents(),
        fetchTestimonials(),
        fetchBlogPosts(),
        fetchTeam(),
        fetchGallery(),
        fetchHomepageContent()
      ]);

      if (acts && acts.length > 0) setActivities(acts);
      if (evs && evs.length > 0) setEvents(evs);
      if (tests && tests.length > 0) setTestimonials(tests);
      if (blogs && blogs.length > 0) setBlogPosts(blogs);
      if (tm && tm.length > 0) setTeam(tm);
      if (gal && gal.length > 0) setGallery(gal);
      if (hpContent) setHomeContent(hpContent);
    }
    loadData();
  }, []);

  // Browser navigation popstate listener
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('admin') || hash.includes('admin')) {
        setCurrentPage('admin');
      } else if (path.includes('trustees') || hash.includes('trustees')) {
        setCurrentPage('trustees');
      } else if (path.includes('trust') || hash.includes('trust')) {
        setCurrentPage('trust');
      } else if (path.includes('contact') || hash.includes('contact')) {
        setCurrentPage('contact');
      } else if (path.includes('testimonials') || hash.includes('testimonials')) {
        setCurrentPage('testimonials');
      } else if (path.includes('gallery') || hash.includes('gallery')) {
        setCurrentPage('gallery');
      } else if (path.includes('srowtha') || hash.includes('srowtha')) {
        setCurrentPage('srowtha-rathana-award');
      } else if (path.includes('dharma-shri') || hash.includes('dharma-shri')) {
        setCurrentPage('dharma-shri-award');
      } else if (path.includes('event') || hash.includes('event')) {
        setCurrentPage('events');
      } else if (path === '/activities' || path === '/activities/' || hash.includes('activities')) {
        setCurrentPage('activities');
      } else {
        const foundSlug = activitySlugs.find(s => path.includes(s) || hash.includes(s));
        if (foundSlug) {
          setCurrentPage(foundSlug);
        } else {
          setCurrentPage('home');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'admin') {
      window.history.pushState({ page: 'admin' }, '', '/admin');
    } else if (page === 'trust') {
      window.history.pushState({ page: 'trust' }, '', '/trust');
    } else if (page === 'trustees') {
      window.history.pushState({ page: 'trustees' }, '', '/trustees');
    } else if (page === 'contact') {
      window.history.pushState({ page: 'contact' }, '', '/contact');
    } else if (page === 'testimonials') {
      window.history.pushState({ page: 'testimonials' }, '', '/testimonials');
    } else if (page === 'gallery') {
      window.history.pushState({ page: 'gallery' }, '', '/gallery');
    } else if (page === 'events') {
      window.history.pushState({ page: 'events' }, '', '/event-page');
    } else if (page === 'srowtha-rathana-award') {
      window.history.pushState({ page: 'srowtha-rathana-award' }, '', '/srowtha-rathana-award');
    } else if (page === 'dharma-shri-award') {
      window.history.pushState({ page: 'dharma-shri-award' }, '', '/dharma-shri-award');
    } else if (page === 'activities') {
      window.history.pushState({ page: 'activities' }, '', '/activities');
    } else if (activitySlugs.includes(page)) {
      window.history.pushState({ page }, '', `/${page}`);
    } else {
      window.history.pushState({ page: 'home' }, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDonation = (cause = 'General Seva') => {
    setDonationCause(cause);
    setDonationModalOpen(true);
  };

  const handleSelectActivity = (actOrSlug) => {
    if (typeof actOrSlug === 'object') {
      const slug = actOrSlug.slug;
      if (slug && activitySlugs.includes(slug)) {
        handleNavigate(slug);
        return;
      }
      setSelectedActivity(actOrSlug);
    } else if (activitySlugs.includes(actOrSlug)) {
      handleNavigate(actOrSlug);
    } else {
      const found = activities.find(a => a.slug === actOrSlug || String(a.id) === String(actOrSlug));
      if (found) {
        if (activitySlugs.includes(found.slug)) {
          handleNavigate(found.slug);
        } else {
          setSelectedActivity(found);
        }
      }
    }
  };

  if (currentPage === 'admin') {
    return (
      <AdminPanel
        onNavigate={handleNavigate}
        onContentUpdated={(updated) => setHomeContent(updated)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#901C25] selection:text-white">
      {/* Top Header Information Bar */}
      <TopBar siteInfo={homeContent?.siteInfo} />

      {/* Main Unified Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenDonation={() => handleOpenDonation('General Seva')}
        onOpenContact={() => setContactModalOpen(true)}
        onSelectActivity={handleSelectActivity}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'trust' ? (
          <TrustPage
            onNavigate={handleNavigate}
            onOpenDonation={(cause) => handleOpenDonation(cause || 'Trust Support')}
            onOpenVolunteer={() => setVolunteerModalOpen(true)}
          />
        ) : currentPage === 'trustees' ? (
          <TrusteesPage
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'contact' ? (
          <ContactPage
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'testimonials' ? (
          <TestimonialsPage
            onNavigate={handleNavigate}
            onOpenDonation={(cause) => handleOpenDonation(cause || 'Testimonials Support')}
            onOpenContact={() => setContactModalOpen(true)}
          />
        ) : currentPage === 'gallery' ? (
          <GalleryPage
            onNavigate={handleNavigate}
            onOpenDonation={(cause) => handleOpenDonation(cause || 'Gallery Support')}
            galleryItems={homeContent?.gallerySection?.items}
          />
        ) : currentPage === 'events' ? (
          <EventPage
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'srowtha-rathana-award' ? (
          <SrowthaRathanaAwardPage onNavigate={handleNavigate} />
        ) : currentPage === 'dharma-shri-award' ? (
          <DharmaShriAwardPage onNavigate={handleNavigate} />
        ) : currentPage === 'activities' ? (
          <ActivitiesPage
            onNavigate={handleNavigate}
            onSelectActivity={(slug) => handleNavigate(slug)}
          />
        ) : currentPage === 'annadhanam' ? (
          <AnnadhanamPage
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'unclaimed-souls' ? (
          <UnclaimedSoulsPage
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'spreading-the-dharmic-way-of-life' ? (
          <SpreadingDharmicWayPage
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'education-support' ? (
          <EducationSupportPage
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'women-empowerment' ? (
          <WomenEmpowermentPage
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'caring-for-homeless-people' ? (
          <CaringForHomelessPage
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'other-additional-activities' ? (
          <OtherActivitiesPage
            onNavigate={handleNavigate}
          />
        ) : activitySlugs.includes(currentPage) ? (
          <ActivityDetailPage
            activitySlug={currentPage}
            onNavigate={handleNavigate}
          />
        ) : (
          <>
            {/* Hero Slider */}
            <HeroSlider
              content={homeContent?.hero}
              onNavigate={handleNavigate}
              onOpenDonation={() => handleOpenDonation('General Seva')}
            />

            {/* About Us Section */}
            <AboutUs
              content={homeContent?.about}
              onNavigate={handleNavigate}
              onOpenDonation={() => handleOpenDonation('About Us Support')}
              onOpenVolunteer={() => setVolunteerModalOpen(true)}
            />

            {/* Our Core Activities */}
            <CoreActivities
              content={homeContent?.coreActivities}
              activities={activities}
              onSelectActivity={handleSelectActivity}
              onNavigate={handleNavigate}
            />

            {/* Volunteer & Impact Metrics */}
            <VolunteerSection
              content={homeContent?.stats}
              onNavigate={handleNavigate}
              onOpenVolunteer={() => setVolunteerModalOpen(true)}
            />

            {/* Dharmic Impact Across the Map / Events */}
            <EventsSection
              content={homeContent?.eventsSection}
              events={events}
              onNavigate={handleNavigate}
              onOpenDonation={() => handleOpenDonation('Community Event & Rites Fund')}
            />

            {/* Visual Gallery Grid with Lightbox */}
            <GallerySection
              content={homeContent?.gallerySection}
              gallery={gallery}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        siteInfo={homeContent?.siteInfo}
        onNavigate={handleNavigate}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Interactive Modals */}
      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        initialCause={donationCause}
      />

      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />

      <ActivityModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
