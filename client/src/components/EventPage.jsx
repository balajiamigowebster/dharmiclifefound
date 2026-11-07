import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  Calendar,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Maximize2,
  X,
  Heart,
  BookOpen,
  Info
} from 'lucide-react';

export default function EventPage({ onNavigate }) {
  const [isPosterOpen, setIsPosterOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen animate-fadeIn font-sans text-gray-800 pb-20">
      
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
              onClick={() => onNavigate && onNavigate('home')}
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

      {/* 2. Top "Purpose of Our Programmes" Intro Widget */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="events-intro-widget bg-[#FFFDF9] border border-[#EEDAC5] rounded-2xl shadow-lg overflow-hidden font-serif">
          
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
              <strong className="font-bold text-[#8B2613]">Dharmic Life Foundation</strong> regularly conducts events, monthly Satsangs, and educational awareness programmes designed to bring our community together in service, learning, and celebration of timeless values.
            </div>

            {/* Objectives Card */}
            <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-xl p-6">
              <h3 className="text-[#8B2613] font-serif font-bold text-lg sm:text-xl flex items-center gap-2 mb-4">
                <span>🌟 Purpose of Our Programmes</span>
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3 sm:p-3.5 rounded-lg border border-[#EEDAC5] text-sm">
                  <span className="text-[#B84318] text-lg shrink-0">🛕</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900 font-semibold">Promote Dharma:</strong> Spreading awareness about living in harmony with nature and moral duties.
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3 sm:p-3.5 rounded-lg border border-[#EEDAC5] text-sm">
                  <span className="text-[#B84318] text-lg shrink-0">📜</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900 font-semibold">Preserve Traditions:</strong> Safeguarding and honoring our rich ancient heritage and practices.
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3 sm:p-3.5 rounded-lg border border-[#EEDAC5] text-sm">
                  <span className="text-[#B84318] text-lg shrink-0">🏆</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900 font-semibold">Recognize Excellence:</strong> Honoring dedicated individuals who embody selfless service and character.
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3 sm:p-3.5 rounded-lg border border-[#EEDAC5] text-sm">
                  <span className="text-[#B84318] text-lg shrink-0">🌱</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900 font-semibold">Inspire Youth:</strong> Encouraging the younger generation to embrace a Dharmic way of life.
                  </span>
                </div>
              </div>
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

      {/* 3. Featured Upcoming Event: 23rd Monthly Satsang */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border-2 border-[#901C25]/20 rounded-3xl shadow-xl overflow-hidden">
          
          {/* Top Banner Tag */}
          <div className="bg-gradient-to-r from-[#901C25] via-[#a3222d] to-[#74151c] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#E48A2D] text-white text-[11px] font-bold uppercase tracking-wider">
                Upcoming Gathering
              </span>
              <span className="text-white/90 text-xs sm:text-sm font-medium">
                Dharmic Life Foundation Official Programme
              </span>
            </div>
            {/* <div className="flex items-center gap-2 text-xs font-semibold text-[#FFD700]">
              <Sparkles size={14} />
              <span>Sathyam Vadha &bull; Dharmam Chara</span>
            </div> */}
          </div>

          {/* Main Grid: Poster Image & Detailed Content */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Event Poster */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                onClick={() => setIsPosterOpen(true)}
                className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-[#FFF6ED] cursor-pointer group bg-stone-100 max-w-sm w-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
              >
                <img
                  src="/images/upcoming-events.jpeg"
                  alt="23rd Monthly Satsang - Dharmic Life Foundation"
                  className="w-full h-auto object-cover block"
                />
                
                {/* Overlay on hover to expand */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-bold">
                  <Maximize2 size={18} />
                  <span>Click to view full poster</span>
                </div>
              </div>

              <button
                onClick={() => setIsPosterOpen(true)}
                className="mt-3 text-xs text-[#901C25] hover:text-[#74151c] font-bold flex items-center gap-1.5 transition"
              >
                <Maximize2 size={13} />
                <span>Enlarge Poster</span>
              </button>
            </div>

            {/* Right Column: Event Narrative & Schedule */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <span className="text-xs font-bold text-[#E48A2D] uppercase tracking-widest block mb-1">
                  Monthly Spiritual Gathering
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900 leading-tight">
                  23<sup>rd</sup> Monthly Satsang
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1 font-medium">
                  Deepening the Practice of Udaliyal Dharmam &amp; Manoviyal Dharmam
                </p>
              </div>

              {/* Key Event Details Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                <div className="flex items-start gap-3 bg-[#FFFDF9] p-3.5 rounded-xl border border-[#EEDAC5]">
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-[#901C25] flex items-center justify-center shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">Date</span>
                    <strong className="text-sm text-gray-900 font-bold">29<sup>th</sup> November 2026</strong>
                    <span className="text-xs text-gray-600 block">(Sunday)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#FFFDF9] p-3.5 rounded-xl border border-[#EEDAC5]">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-[#E48A2D] flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">Timing</span>
                    <strong className="text-sm text-gray-900 font-bold">7:00 PM – 8:30 PM</strong>
                    <span className="text-xs text-gray-600 block">(Evening Session)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#FFFDF9] p-3.5 rounded-xl border border-[#EEDAC5] sm:col-span-2">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Users size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">Eligibility</span>
                    <strong className="text-sm text-[#901C25] font-bold">
                      Exclusively for Old Students Only
                    </strong>
                    <span className="text-xs text-gray-600 block">
                      Dedicated to participants who have completed foundational Dharmam courses
                    </span>
                  </div>
                </div>

              </div>

              {/* Event Description */}
              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                <p>
                  The <strong>Monthly Satsang</strong> is a cornerstone tradition of the Dharmic Life Foundation, conducted under the guidance of our Founder and Managing Trustee, <strong>Mr. A. Balaji</strong>. It serves as an ongoing sanctum for existing students to stay anchored in the universal laws of nature governing the body and mind.
                </p>
                <p>
                  In this 23<sup>rd</sup> edition, participants will reconnect with fellow sadhakas, share real-life practical breakthroughs in physical and mental well-being, clarify doubts on daily lifestyle discipline, and reinforce their commitment to righteous, purposeful living.
                </p>
              </div>

              {/* Highlights List */}
              {/* <div className="bg-[#FFF8F0] p-4 sm:p-5 rounded-2xl border border-[#EEDAC5] space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B2613] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#E48A2D]" />
                  <span>What the Satsang Encompasses</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#901C25] shrink-0 mt-0.5" />
                    <span><strong>Continuous Guidance:</strong> Deep dive into healthy lifestyle practices and natural living principles.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#901C25] shrink-0 mt-0.5" />
                    <span><strong>Experience Sharing:</strong> Real-life testimonials and personal transformations shared by fellow students.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#901C25] shrink-0 mt-0.5" />
                    <span><strong>Mind-Body Equilibrium:</strong> Practical insights on overcoming everyday stresses through Manoviyal Dharmam.</span>
                  </li>
                </ul>
              </div> */}

              {/* Important Instruction Notice */}
              {/* <div className="p-4 bg-[#FFF6ED] rounded-xl border-l-4 border-[#901C25] text-xs text-gray-700 leading-relaxed flex items-start gap-2.5">
                <Info size={16} className="text-[#901C25] shrink-0 mt-0.5" />
                <div>
                  <strong>Student Access Note:</strong> Joining links and access details will be shared directly with registered old students through their respective official batch communication groups.
                </div>
              </div> */}

            </div>

          </div>

          {/* Card Footer Banner */}
          <div className="bg-[#F8F4EE] px-6 py-3.5 border-t border-gray-200 text-center text-xs text-gray-600 font-medium">
            For any queries or updates regarding Satsang schedules, please reach out via our official student channels or visit the{' '}
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="text-[#901C25] font-bold hover:underline"
            >
              Contact Page
            </button>.
          </div>

        </div>
      </div>

      {/* Poster Lightbox Modal */}
      {isPosterOpen && (
        <div
          onClick={() => setIsPosterOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-scaleUp"
          >
            <div className="flex items-center justify-between p-4 bg-[#901C25] text-white">
              <span className="font-serif font-bold text-sm">23rd Monthly Satsang Poster</span>
              <button
                onClick={() => setIsPosterOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 text-white transition"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-3 bg-stone-900 flex justify-center">
              <img
                src="/images/upcoming-events.jpeg"
                alt="23rd Monthly Satsang Poster"
                className="max-h-[80vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
