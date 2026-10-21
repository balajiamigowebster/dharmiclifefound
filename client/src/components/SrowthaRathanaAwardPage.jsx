import React, { useState, useEffect } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { fetchAwardItems, syncAwardItems } from '../api';
import { defaultSrowthaRathanaAwards } from '../data/awardsData';
import { getMediaUrl } from '../config';

export default function SrowthaRathanaAwardPage({ onNavigate }) {
  const [awards, setAwards] = useState(defaultSrowthaRathanaAwards);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAwards() {
      try {
        const remoteData = await fetchAwardItems('srowtha-rathana-award');
        if (isMounted) {
          if (remoteData && remoteData.length > 0) {
            setAwards(remoteData);
          } else {
            // Seed defaults into database if empty
            syncAwardItems('srowtha-rathana-award', defaultSrowthaRathanaAwards)
              .then((res) => {
                if (res?.data && isMounted) setAwards(res.data);
              })
              .catch(() => {});
          }
        }
      } catch (err) {
        console.error('Failed to load Srowtha Rathana awards:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAwards();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="bg-white min-h-screen animate-fadeIn font-sans">
      {/* 1. Page Title & Breadcrumb Banner (Matching GalleryPage Design) */}
      <div className="bg-stone-900 text-white py-12 border-b-4 border-[#901C25] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E48A2D_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-wide">
                Srowtha Ratnam Award
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 font-sans">
                Honoring the Agnihotris of India &bull; Lifelong Dedication to Agnihotra Dharma
              </p>
            </div>

            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <button
                onClick={() => onNavigate && onNavigate('home')}
                className="hover:text-[#E48A2D] transition flex items-center gap-1 text-white"
              >
                <Home size={14} />
                <span>Home</span>
              </button>
              <ChevronRight size={14} className="text-gray-500" />
              <span className="text-gray-400">Awards</span>
              <ChevronRight size={14} className="text-gray-500" />
              <span className="text-[#E48A2D] font-bold">Srowtha Ratnam Award</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="srowtha-container">
        {/* Intro Agnihotra Card (Matching Screenshot exactly) */}
        <section className="srowtha-intro-card">
          <div className="srowtha-intro-header">
            <h2 className="srowtha-intro-title">Srowtha Ratnam Award</h2>
            <p className="srowtha-intro-subtitle">
              Honoring the Agnihotris of India for their lifelong dedication to preserving Agnihotra Dharma.
            </p>
          </div>

          <div className="srowtha-intro-body">
            <div className="srowtha-highlight-box">
              <strong>Agnihotra</strong> is one of the sacred and oldest spiritual practices of India. Agnihotris worship <em>Agni</em> (the God of Fire) for the welfare of the nation, humanity, and all living beings.
            </div>

            <p className="srowtha-intro-text">
              Agnihotris dedicate their entire lives to this practice. From the time of their marriage until the end of their lives, they maintain the sacred fire every day and perform worship in the morning and evening under a disciplined and simple lifestyle bound by strict rules.
            </p>

            <div className="srowtha-tradition-box">
              <h3 className="srowtha-tradition-title">
                <span className="srowtha-icon">🛕</span> Preserving an Ancient Legacy
              </h3>
              <p className="srowtha-tradition-desc">
                Because of these sacred commitments, their lifestyle requires immense sacrifice and offers limited freedom to travel or pursue other livelihoods. Today, <strong>fewer than 150 Agnihotris</strong> are believed to be continuing this tradition in India, making them a precious and declining community.
              </p>
            </div>

            <div className="srowtha-recognition-box">
              <h3 className="srowtha-recognition-title">
                <span className="srowtha-icon">🏆</span> Our Honor: Since 2021
              </h3>
              <p className="srowtha-recognition-desc">
                Dharmic Life Foundation is committed to supporting, recognizing, and helping preserve the Agnihotris and this ancient Vedic tradition.
              </p>
              <p className="srowtha-recognition-desc" style={{ marginTop: '10px' }}>
                Since 2021, the Foundation has been honoring Agnihotris with the <strong>“Srowtha Ratnam”</strong> title along with a cash award, as a mark of respect and appreciation for their lifelong dedication to Agnihotra Dharma.
              </p>
            </div>
          </div>

          <div className="srowtha-intro-footer">
            HONOR • PRESERVATION • AGNIHOTRA DHARMA • VEDIC TRADITION
          </div>
        </section>

        {/* Section Heading: Award Editions */}
        <div className="srowtha-editions-heading">
          <span className="srowtha-editions-eyebrow">HONOURING SACRED EXCELLENCE</span>
          <h2 className="srowtha-editions-title">Annual Srowtha Ratnam Felicitations</h2>
          <div className="srowtha-gold-divider">
            <span></span>
            <i>✦</i>
            <span></span>
          </div>
        </div>

        {/* Editions Loop */}
        <div className="srowtha-editions-list">
          {awards.map((item, idx) => {
            const images = Array.isArray(item.images) ? item.images : [];
            const hasImages = images.length > 0;

            return (
              <div key={item.id || idx} className="srowtha-edition-block">
                {/* Year Header */}
                <div className="srowtha-edition-title-bar">
                  <h2 className="srowtha-edition-heading">{item.title}</h2>
                </div>

                {/* Photo Grid */}
                {hasImages && (
                  <div className={`srowtha-images-grid ${images.length === 1 ? 'single-col' : 'two-col'}`}>
                    {images.map((imgSrc, imgIdx) => (
                      <div
                        key={imgIdx}
                        className="srowtha-image-card"
                        onClick={() => setSelectedImage(getMediaUrl(imgSrc))}
                      >
                        <img
                          src={getMediaUrl(imgSrc)}
                          alt={`${item.recipient} - ${imgIdx + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="srowtha-awardee-img"
                        />
                        <div className="srowtha-img-overlay">
                          <span className="srowtha-zoom-btn">🔍 View Full Image</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Classical Award Certificate Card */}
                <div className="dlf-srowth-award">
                  <div className="dlf-srowth-header">
                    <div className="dlf-srowth-eyebrow">
                      ✦ DHARMIC LIFE FOUNDATION PRESENTS ✦
                    </div>
                    <h2>{item.awardName || 'Srowth Ratnam Award'}</h2>
                    {item.year && <div className="dlf-srowth-year">✦ {item.year} ✦</div>}
                    <p className="dlf-srowth-subtitle">
                      {item.subtitle || 'Honouring Lifelong Dedication to Dharma and Vedic Traditions'}
                    </p>
                  </div>

                  <div className="dlf-srowth-divider">
                    <span></span><i>❖</i><span></span>
                  </div>

                  <div className="dlf-srowth-recipient">
                    <div className="dlf-srowth-recipient-label">
                      ✦ HONOURED RECIPIENT ✦
                    </div>
                    <h3>{item.recipient}</h3>
                    {item.location && <div className="dlf-srowth-location">{item.location}</div>}
                  </div>

                  {/* Fact Pills */}
                  <div className="dlf-srowth-facts">
                    <div className="dlf-srowth-fact">
                      <span className="dlf-srowth-fact-label">AWARD YEAR</span>
                      <strong>{item.year || '—'}</strong>
                    </div>
                    <div className="dlf-srowth-fact">
                      <span className="dlf-srowth-fact-label">CASH PRIZE</span>
                      <strong>{item.cashPrize || '—'}</strong>
                    </div>
                    <div className="dlf-srowth-fact">
                      <span className="dlf-srowth-fact-label">RECOGNITION</span>
                      <strong>{item.recognition || 'Vedic Dharma'}</strong>
                    </div>
                  </div>

                  {/* Narrative Content */}
                  {item.content && (
                    <div className="dlf-srowth-content">
                      <h4>A Lifetime of Sacred Dedication</h4>
                      {item.content.split('\n\n').map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>
                  )}

                  {/* Tribute Box */}
                  {item.tributeText && (
                    <div className="dlf-srowth-honour">
                      <div className="dlf-srowth-honour-heading">
                        ✦ A Tribute to Vedic Heritage
                      </div>
                      <p>{item.tributeText}</p>
                    </div>
                  )}

                  <div className="dlf-srowth-footer">
                    HONOUR • PRESERVATION • AGNIHOTRA DHARMA • VEDIC TRADITION
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="srowtha-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="srowtha-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="srowtha-lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <img src={selectedImage} alt="Expanded Awardee View" className="srowtha-lightbox-img" />
          </div>
        </div>
      )}

      {/* Comprehensive Styles */}
      <style>{`
        .srowtha-page-wrapper {
          background-color: #faf7f2;
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #33231a;
          padding-bottom: 80px;
        }

        /* Hero Banner */
        .srowtha-hero-banner {
          position: relative;
          background: linear-gradient(135deg, rgba(74, 18, 10, 0.92) 0%, rgba(133, 36, 20, 0.85) 100%),
                      url('https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1800&q=80') center/cover no-repeat;
          padding: 85px 20px 75px;
          text-align: center;
          color: #ffffff;
        }

        .srowtha-hero-content {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .srowtha-hero-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          background: rgba(218, 165, 32, 0.2);
          color: #f7d488;
          border: 1px solid rgba(247, 212, 136, 0.4);
          padding: 6px 16px;
          border-radius: 30px;
          margin-bottom: 18px;
        }

        .srowtha-hero-title {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(34px, 4.5vw, 52px);
          font-weight: 700;
          letter-spacing: -0.5px;
          margin: 0 0 16px;
          color: #ffffff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        .srowtha-hero-desc {
          font-size: clamp(16px, 1.8vw, 19px);
          line-height: 1.6;
          color: #fcefe3;
          margin: 0 auto;
          max-width: 720px;
          font-style: italic;
          opacity: 0.95;
        }

        .srowtha-container {
          max-width: 1140px;
          margin: 40px auto 0;
          padding: 0 20px;
          position: relative;
          z-index: 10;
        }

        /* Intro Top Box */
        .srowtha-intro-card {
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(95, 45, 20, 0.08);
          border: 1px solid #ebd9c8;
          overflow: hidden;
          margin-bottom: 50px;
        }

        .srowtha-intro-header {
          background: #8b2613;
          padding: 30px 35px;
          text-align: center;
          color: #ffffff;
        }

        .srowtha-intro-title {
          font-family: Georgia, serif;
          font-size: clamp(26px, 3.2vw, 36px);
          font-weight: 700;
          color: #ffda79;
          margin: 0 0 10px;
        }

        .srowtha-intro-subtitle {
          font-size: 16px;
          color: #ffeede;
          font-style: italic;
          margin: 0;
          line-height: 1.5;
        }

        .srowtha-intro-body {
          padding: 35px 40px;
        }

        .srowtha-highlight-box {
          background-color: #fff6ed;
          border-left: 5px solid #b84318;
          padding: 18px 22px;
          margin-bottom: 22px;
          border-radius: 0 8px 8px 0;
          font-size: 16.5px;
          line-height: 1.65;
          color: #2c2c2c;
        }

        .srowtha-highlight-box strong {
          color: #8b2613;
        }

        .srowtha-intro-text {
          font-size: 16px;
          line-height: 1.7;
          color: #4a4a4a;
          margin-bottom: 24px;
          text-align: justify;
        }

        .srowtha-tradition-box {
          background: #fdf8f2;
          border: 1px dashed #d3a17e;
          border-radius: 10px;
          padding: 22px 25px;
          margin-bottom: 22px;
        }

        .srowtha-tradition-title {
          color: #8b2613;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .srowtha-tradition-desc {
          font-size: 15.5px;
          line-height: 1.65;
          color: #443226;
          margin: 0;
        }

        .srowtha-recognition-box {
          background-color: #faf4eb;
          border: 1px solid #e5d2c1;
          border-radius: 10px;
          padding: 22px 25px;
        }

        .srowtha-recognition-title {
          color: #5c1d12;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .srowtha-recognition-desc {
          font-size: 15.5px;
          line-height: 1.65;
          color: #443226;
          margin: 0;
        }

        .srowtha-intro-footer {
          background-color: #f4ece1;
          padding: 16px 25px;
          text-align: center;
          border-top: 1px solid #eedac5;
          font-size: 13px;
          font-weight: 700;
          color: #611a0d;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* Editions Heading */
        .srowtha-editions-heading {
          text-align: center;
          margin-bottom: 40px;
        }

        .srowtha-editions-eyebrow {
          color: #b88742;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .srowtha-editions-title {
          font-family: Georgia, serif;
          font-size: clamp(26px, 3.2vw, 36px);
          color: #852414;
          margin: 8px 0 12px;
        }

        .srowtha-gold-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          max-width: 280px;
          margin: 0 auto;
        }

        .srowtha-gold-divider span {
          flex: 1;
          height: 1px;
          background: #d3a468;
        }

        .srowtha-gold-divider i {
          color: #b88742;
          font-style: normal;
          font-size: 14px;
        }

        /* Editions List */
        .srowtha-editions-list {
          display: flex;
          flex-direction: column;
          gap: 65px;
        }

        .srowtha-edition-block {
          background: #ffffff;
          border-radius: 16px;
          padding: 35px 35px 40px;
          box-shadow: 0 8px 25px rgba(95, 45, 20, 0.06);
          border: 1px solid #ecdccb;
        }

        .srowtha-edition-title-bar {
          text-align: center;
          margin-bottom: 25px;
        }

        .srowtha-edition-heading {
          font-family: Georgia, serif;
          font-size: clamp(22px, 2.6vw, 30px);
          font-weight: 700;
          color: #172b4d;
          margin: 0;
          position: relative;
          display: inline-block;
          padding-bottom: 10px;
        }

        .srowtha-edition-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: #b88742;
          border-radius: 2px;
        }

        /* Photo Grid */
        .srowtha-images-grid {
          display: grid;
          gap: 20px;
          margin-bottom: 30px;
        }

        .srowtha-images-grid.two-col {
          grid-template-columns: repeat(2, 1fr);
        }

        .srowtha-images-grid.single-col {
          grid-template-columns: 1fr;
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
        }

        .srowtha-image-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          border: 1px solid #ebd7c2;
          background: #000;
          cursor: pointer;
          aspect-ratio: 4 / 3;
        }

        .srowtha-awardee-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .srowtha-image-card:hover .srowtha-awardee-img {
          transform: scale(1.04);
        }

        .srowtha-img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
        }

        .srowtha-image-card:hover .srowtha-img-overlay {
          opacity: 1;
        }

        .srowtha-zoom-btn {
          background: #ffffff;
          color: #852414;
          font-weight: 700;
          font-size: 13px;
          padding: 8px 16px;
          border-radius: 30px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        /* Classical Certificate Style */
        .dlf-srowth-award {
          --maroon: #852414;
          --gold: #b88742;
          width: 100%;
          overflow: hidden;
          font-family: Georgia, 'Times New Roman', serif;
          color: #493328;
          background: linear-gradient(145deg, #fffdf9, #faf3e9);
          border: 1px solid #e9d8bf;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(88, 47, 22, 0.05);
        }

        .dlf-srowth-header {
          padding: 24px 20px 8px;
          text-align: center;
        }

        .dlf-srowth-eyebrow {
          color: #ad7935;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .dlf-srowth-header h2 {
          font-family: Georgia, serif;
          font-size: clamp(26px, 3.2vw, 34px);
          color: var(--maroon);
          margin: 8px 0 6px;
          font-weight: 700;
        }

        .dlf-srowth-year {
          color: #a36b2d;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .dlf-srowth-subtitle {
          color: #80654c;
          font-size: 14px;
          font-style: italic;
          margin: 6px 0 0;
        }

        .dlf-srowth-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          max-width: 280px;
          margin: 12px auto 16px;
        }

        .dlf-srowth-divider span {
          flex: 1;
          height: 1px;
          background: #d3a468;
        }

        .dlf-srowth-divider i {
          color: var(--gold);
          font-size: 14px;
          font-style: normal;
        }

        .dlf-srowth-recipient {
          text-align: center;
          margin: 0 25px 16px;
          padding: 18px 20px;
          background: linear-gradient(145deg, #fffaf3, #f8eddd);
          border: 1px solid #e6cca7;
          border-radius: 10px;
          position: relative;
        }

        .dlf-srowth-recipient::before {
          content: "";
          position: absolute;
          top: 0;
          left: 25%;
          right: 25%;
          height: 2px;
          background: #b88138;
        }

        .dlf-srowth-recipient-label {
          color: #a7773a;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.4px;
        }

        .dlf-srowth-recipient h3 {
          font-family: Georgia, serif;
          color: #792518;
          font-size: clamp(20px, 2.5vw, 27px);
          margin: 8px 0 6px;
          font-weight: 700;
        }

        .dlf-srowth-location {
          color: #8c6b4b;
          font-size: 13.5px;
          font-weight: 600;
        }

        .dlf-srowth-facts {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          padding: 0 25px;
          margin-bottom: 22px;
        }

        .dlf-srowth-fact {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 14px 10px;
          background: #ffffff;
          border: 1px solid #ecdcc7;
          border-radius: 8px;
          transition: all 0.25s ease;
        }

        .dlf-srowth-fact:hover {
          transform: translateY(-2px);
          border-color: var(--gold);
          box-shadow: 0 4px 12px rgba(95, 45, 20, 0.08);
        }

        .dlf-srowth-fact-label {
          color: #977b5a;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
          text-align: center;
        }

        .dlf-srowth-fact strong {
          color: var(--maroon);
          font-size: 18px;
          font-weight: 700;
          text-align: center;
        }

        .dlf-srowth-content {
          padding: 0 28px 8px;
        }

        .dlf-srowth-content h4 {
          font-family: Georgia, serif;
          color: #812b1a;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 12px;
          padding-left: 10px;
          border-left: 3px solid var(--gold);
        }

        .dlf-srowth-content p {
          font-family: Georgia, serif;
          color: #49372f;
          font-size: 16px;
          line-height: 1.7;
          margin: 0 0 14px;
          text-align: justify;
        }

        .dlf-srowth-honour {
          margin: 8px 25px 22px;
          padding: 16px 20px;
          background: linear-gradient(120deg, #fbf0e0, #fff9f0);
          border: 1px solid #ead2b2;
          border-left: 4px solid var(--gold);
          border-radius: 8px;
        }

        .dlf-srowth-honour-heading {
          font-family: Georgia, serif;
          font-size: 18px;
          font-weight: 700;
          color: #7b2917;
          margin-bottom: 6px;
        }

        .dlf-srowth-honour p {
          font-family: Georgia, serif;
          font-size: 15px;
          line-height: 1.65;
          color: #63483a;
          margin: 0;
        }

        .dlf-srowth-footer {
          background: #f5e9d7;
          border-top: 1px solid #e5ceb0;
          color: #762919;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-align: center;
          padding: 14px 12px;
        }

        /* Lightbox */
        .srowtha-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeIn 0.25s ease;
        }

        .srowtha-lightbox-modal {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
        }

        .srowtha-lightbox-img {
          max-width: 100%;
          max-height: 85vh;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          object-fit: contain;
        }

        .srowtha-lightbox-close {
          position: absolute;
          top: -15px;
          right: -15px;
          background: #852414;
          color: #ffffff;
          border: 2px solid #ffffff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .srowtha-container {
            margin-top: -20px;
            padding: 0 12px;
          }

          .srowtha-intro-body {
            padding: 20px 16px;
          }

          .srowtha-edition-block {
            padding: 22px 14px 25px;
          }

          .srowtha-images-grid.two-col {
            grid-template-columns: 1fr;
          }

          .dlf-srowth-recipient {
            margin: 0 12px 12px;
          }

          .dlf-srowth-facts {
            padding: 0 12px;
            gap: 8px;
          }

          .dlf-srowth-content {
            padding: 0 14px 6px;
          }

          .dlf-srowth-honour {
            margin: 6px 12px 16px;
          }
        }
      `}</style>
    </div>
  );
}
