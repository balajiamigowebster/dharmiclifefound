import React from 'react';
import { ChevronRight, Heart, Users, Home, ArrowLeft } from 'lucide-react';

export default function TrustPage({ onNavigate, onOpenDonation, onOpenVolunteer }) {
  return (
    <div className="bg-white min-h-screen animate-fadeIn">
      
      {/* 1. Page Title & Breadcrumb Banner */}
      <div className="bg-stone-900 text-white py-12 border-b-4 border-[#901C25] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E48A2D_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-wide">
                Trust
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 font-sans">
                About Us &bull; Dharmic Life Foundation Charitable Trust
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
              <span className="text-gray-300">About Us</span>
              <ChevronRight size={14} className="text-gray-500" />
              <span className="text-[#E48A2D] font-bold">Trust</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Full Width Hero Banner (Matching exact dlf-hero) */}
      <div className="bg-gradient-to-br from-[#7A0A0A] to-[#580303] text-white py-14 px-4 text-center border-b-4 border-[#D4A017] shadow-inner">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-block bg-[#D4A017]/20 border border-[#D4A017] text-[#FFDF00] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
            Est. October 2021
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight drop-shadow-md">
            Dharmic Life Foundation
          </h2>
          <p className="text-[#FEE180] text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Transforming Lives Through Righteous Conduct &amp; Universal Harmony
          </p>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        
        {/* 1. Our History */}
        <section className="space-y-5">
          <div className="relative pb-3 border-b-2 border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#7A0A0A]">
              Our History
            </h2>
            <div className="absolute -bottom-0.5 left-0 w-16 h-1 bg-[#D4A017] rounded-full"></div>
          </div>

          <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed">
            Dharmic Life Foundation was established by transforming an institution known as the <strong className="text-gray-900 font-bold">Academy of Dharmic Life</strong>. The Academy was started in October 2020 with the noble vision of educating people from all walks of life on how to face the challenges of the COVID-19 pandemic through a Dharmic way of living. All classes and awareness programmes were offered completely free of cost.
          </p>

          <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed">
            The organisation was formally registered as a Trust in Puducherry on <strong className="text-gray-900 font-bold">15 October 2021</strong>, on the auspicious occasion of <em className="text-[#7A0A0A] font-serif font-bold not-italic">Vijayadashami</em>. It was founded by <strong className="text-gray-900 font-bold">Mr. A. Balaji, Founder and Managing Trustee</strong>, along with his parents, <strong className="text-gray-900 font-bold">Mr. V. Anbalagan @ Rajagopal</strong> and <strong className="text-gray-900 font-bold">Mrs. N. Gomathi</strong>, who joined as the founding trustees.
          </p>

          {/* Founding Trustees Highlight Box */}
          <div className="mt-6 p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8] border-l-4 border-l-[#7A0A0A] shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4A017] mb-2">
              Founding Trustees &bull; Puducherry
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 font-medium">Founder &amp; Managing Trustee</p>
                <p className="text-base font-bold text-gray-900 font-serif">Mr. A. Balaji</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 font-medium">Founding Trustee</p>
                <p className="text-base font-bold text-gray-900 font-serif">Mr. V. Anbalagan @ Rajagopal</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 font-medium">Founding Trustee</p>
                <p className="text-base font-bold text-gray-900 font-serif">Mrs. N. Gomathi</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Our Philosophy */}
        <section className="space-y-5">
          <div className="relative pb-3 border-b-2 border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#7A0A0A]">
              Our Philosophy
            </h2>
            <div className="absolute -bottom-0.5 left-0 w-16 h-1 bg-[#D4A017] rounded-full"></div>
          </div>

          <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed">
            Lifestyle reflects the way a person thinks, lives and behaves. In Indian tradition, the principles of <strong className="text-gray-900 font-bold">Karma (action) and Dharma (righteous conduct)</strong> form the foundation of a balanced and meaningful life.
          </p>

          <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed">
            An unhealthy lifestyle can directly affect a person's health, happiness and longevity. We believe that understanding and following the laws of nature is essential for leading a healthy and peaceful life.
          </p>

          <div className="p-5 rounded-xl bg-[#FFF9F5] border-l-4 border-[#D4A017] border border-[#F1E4D5] shadow-sm">
            <p className="text-gray-800 text-base sm:text-[17px] leading-relaxed">
              Through regular awareness programmes and educational classes, we strive to help individuals understand and practise <strong className="text-[#7A0A0A] font-bold">Udaliyal Dharmam (the natural laws governing the body) and Manoviyal Dharmam (the natural laws governing the mind)</strong>.
            </p>
          </div>

          <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed">
            Our aim is to reconnect people with traditional values and universal laws of nature, helping them lead healthier, happier and more meaningful lives.
          </p>
        </section>

        {/* 3. Our Primary Mission */}
        <section className="space-y-5">
          <div className="relative pb-3 border-b-2 border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#7A0A0A]">
              Our Primary Mission
            </h2>
            <div className="absolute -bottom-0.5 left-0 w-16 h-1 bg-[#D4A017] rounded-full"></div>
          </div>

          <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed">
            The foremost mission of Dharmic Life Foundation is to educate people about the importance of a healthy and righteous lifestyle. The Trust is wholly dedicated to this noble cause.
          </p>

          <div className="bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl p-5 sm:p-6 space-y-2">
            <h3 className="text-[#7A0A0A] font-serif font-bold text-lg flex items-center gap-2">
              <span>🌿</span>
              <span>Classes &amp; Satsang Gatherings</span>
            </h3>
            <p className="text-gray-700 text-base sm:text-[16.5px] leading-relaxed">
              We regularly conduct <strong className="text-gray-900 font-bold">Udaliyal Dharmam and Manoviyal Dharmam classes</strong> for new students and organise monthly <strong className="text-gray-900 font-bold">Satsang gatherings</strong> for existing students. These gatherings help them deepen their knowledge, share their experiences and strengthen their practice of Dharmic living.
            </p>
          </div>
        </section>

        {/* 4. Our Social Activities */}
        <section className="space-y-6">
          <div className="relative pb-3 border-b-2 border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#7A0A0A]">
              Our Social Activities
            </h2>
            <div className="absolute -bottom-0.5 left-0 w-16 h-1 bg-[#D4A017] rounded-full"></div>
          </div>

          <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed">
            Along with our primary mission of spreading lifestyle awareness, the Trust is actively involved in various social welfare activities:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="bg-white p-5 rounded-xl border border-[#EAE2D8] hover:border-[#D4A017] hover:shadow-md transition duration-200">
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A0A0A] mt-2 shrink-0"></span>
                <div>
                  <h4 className="text-base font-bold text-[#7A0A0A] font-serif">Annadhanam</h4>
                  <p className="text-sm text-gray-700 leading-relaxed mt-1">Providing food to needy people and those facing difficult circumstances.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#EAE2D8] hover:border-[#D4A017] hover:shadow-md transition duration-200">
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A0A0A] mt-2 shrink-0"></span>
                <div>
                  <h4 className="text-base font-bold text-[#7A0A0A] font-serif">Dignified Last Rites</h4>
                  <p className="text-sm text-gray-700 leading-relaxed mt-1">Honouring unclaimed souls by ensuring they receive respectful and dignified last rites.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#EAE2D8] hover:border-[#D4A017] hover:shadow-md transition duration-200">
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A0A0A] mt-2 shrink-0"></span>
                <div>
                  <h4 className="text-base font-bold text-[#7A0A0A] font-serif">Educational Support</h4>
                  <p className="text-sm text-gray-700 leading-relaxed mt-1">Extending support to Government educational institutions and encouraging the growth of education.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#EAE2D8] hover:border-[#D4A017] hover:shadow-md transition duration-200">
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A0A0A] mt-2 shrink-0"></span>
                <div>
                  <h4 className="text-base font-bold text-[#7A0A0A] font-serif">Women Empowerment</h4>
                  <p className="text-sm text-gray-700 leading-relaxed mt-1">Celebrating motherhood and promoting the dignity, welfare and empowerment of women.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#EAE2D8] hover:border-[#D4A017] hover:shadow-md transition duration-200">
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A0A0A] mt-2 shrink-0"></span>
                <div>
                  <h4 className="text-base font-bold text-[#7A0A0A] font-serif">Care for the Homeless</h4>
                  <p className="text-sm text-gray-700 leading-relaxed mt-1">Providing care, support and assistance to homeless and underprivileged people.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#EAE2D8] hover:border-[#D4A017] hover:shadow-md transition duration-200">
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A0A0A] mt-2 shrink-0"></span>
                <div>
                  <h4 className="text-base font-bold text-[#7A0A0A] font-serif">Emergency Assistance</h4>
                  <p className="text-sm text-gray-700 leading-relaxed mt-1">Extending timely help to individuals and families facing unexpected difficulties and emergencies.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Our Long-Term Vision */}
        <section className="space-y-5">
          <div className="relative pb-3 border-b-2 border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#7A0A0A]">
              Our Long-Term Vision
            </h2>
            <div className="absolute -bottom-0.5 left-0 w-16 h-1 bg-[#D4A017] rounded-full"></div>
          </div>

          <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed">
            Our long-term vision is to spread Dharma across the world and create a peaceful universe where every living being can live with dignity, harmony, love and compassion.
          </p>

          <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed">
            We aspire to build a world where people live in harmony with nature, respect one another and care for all living beings.
          </p>

          {/* Golden Highlight Card */}
          <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FFF8EE] to-[#FFF3E0] border border-[#EEDAC5] border-l-4 border-l-[#D4A017] rounded-2xl p-6 sm:p-8 text-center shadow-md">
            <p className="text-lg sm:text-xl font-bold font-serif text-[#7A0A0A] tracking-wide leading-relaxed">
              “Our dream is to make this universe a peaceful home for every living being.”
            </p>
          </div>
        </section>

      </div>

      {/* 5. Statement Banner (Matching exact dlf-footer-banner) */}
      <div className="bg-[#7A0A0A] text-white py-8 px-4 text-center border-t-4 border-[#D4A017]">
        <p className="max-w-4xl mx-auto text-base sm:text-lg font-medium text-[#FEE180] leading-relaxed">
          Through these efforts, Dharmic Life Foundation strives to promote healthy living, moral values, compassion, and social responsibility for the betterment of society.
        </p>
      </div>

    </div>
  );
}
