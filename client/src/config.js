// Central Configuration for Dharmic Life Foundation
// Live Backend URL: https://amigowebster.in/dharmiclife

const LIVE_BACKEND_URL = 'https://amigowebster.in/dharmiclife';

// Resolve Backend Base URL:
// 1. If VITE_API_URL is provided in environment variables, prioritize it.
// 2. Otherwise in production mode (or on Vercel), default to LIVE_BACKEND_URL.
// 3. In local development without env, fallback to empty string (uses Vite proxy).
export const BACKEND_URL = (() => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  if (import.meta.env.PROD || (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app'))) {
    return LIVE_BACKEND_URL;
  }
  return '';
})();

// Full API URL prefix
export const API_BASE_URL = `${BACKEND_URL}/api`;

// Helper to resolve media URLs (images and videos in /uploads or uploaded to backend)
// Note: Static assets in client/public like /images/... are served directly by frontend/Vercel
export function getMediaUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  // Client public folder assets (e.g. /images/gallery-1.jpg) should remain relative to the frontend domain!
  if (url.startsWith('/images/') || url.startsWith('images/')) {
    return url.startsWith('/') ? url : `/${url}`;
  }
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${BACKEND_URL}${cleanPath}`;
}

export default {
  BACKEND_URL,
  API_BASE_URL,
  LIVE_BACKEND_URL,
  getMediaUrl
};
