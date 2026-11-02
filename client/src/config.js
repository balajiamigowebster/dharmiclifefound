// Central Configuration for Dharmic Life Foundation
// All uploads and media are served directly from http://dharmiclifefoundation.com/api/uploads
export const LIVE_BACKEND_URL = 'http://dharmiclifefoundation.com/api';

// Resolve Backend Base URL
// On Vercel (client-e1mu.vercel.app), use relative '' so API fetch() calls use same-origin HTTPS proxy
// This eliminates browser Mixed Content blocks while allowing live DB updates and saves
export const BACKEND_URL = (() => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return '';
  }
  return LIVE_BACKEND_URL;
})();

// Full API URL prefix: /api on Vercel, or full URL on self-hosted live domains
export const API_BASE_URL = BACKEND_URL ? `${BACKEND_URL}` : '/api';

// Helper to resolve media URLs directly from http://dharmiclifefoundation.com/api/uploads
export function getMediaUrl(url) {
  if (!url) return '';

  // Extract relative upload path from any legacy domain string
  // e.g. "https://amigowebster.in/dharmiclife/uploads/images/5.jpg" -> "http://dharmiclifefoundation.com/api/uploads/images/5.jpg"
  // e.g. "https://node256.../uploads/videos/V1.mp4" -> "http://dharmiclifefoundation.com/api/uploads/videos/V1.mp4"
  // e.g. "/uploads/images/5.jpg" -> "http://dharmiclifefoundation.com/api/uploads/images/5.jpg"
  if (url.includes('/uploads/')) {
    const uploadPath = url.substring(url.indexOf('/uploads/'));
    return `${LIVE_BACKEND_URL}${uploadPath}`;
  }

  if (url.startsWith('uploads/')) {
    return `${LIVE_BACKEND_URL}/${url}`;
  }

  // Preserve local static frontend assets (/images/act-*.jpg)
  if (url.startsWith('/images/') || url.startsWith('images/')) {
    return url.startsWith('/') ? url : `/${url}`;
  }

  // Absolute http / https / data URLs if external
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return cleanPath;
}

export default {
  BACKEND_URL,
  API_BASE_URL,
  LIVE_BACKEND_URL,
  getMediaUrl
};
