// Central Configuration for Dharmic Life Foundation
// Direct high-speed HTTPS backend on cPanel (sub-second response, zero mixed content)
export const LIVE_BACKEND_URL = 'https://dharmiclifefoundation.com/api';

// Resolve Backend Base URL: Direct HTTPS connection (or relative proxy on Vercel / Localhost)
export const BACKEND_URL = (() => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  // On Localhost dev server, route through /api proxy to local backend (http://localhost:5001)
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return '/api';
  }
  // On Vercel, route through /api proxy to eliminate browser cross-origin preflight errors
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return '/api';
  }
  return LIVE_BACKEND_URL;
})();

// Full API URL prefix
export const API_BASE_URL = BACKEND_URL;

/**
 * Dynamically resolves the base URL of the frontend deployment.
 * Works uniformly whether deployed at:
 * - Domain root (https://dharmiclifefoundation.com/)
 * - Any subfolder (https://dharmiclifefoundation.com/folder/)
 * - Vercel (https://client-e1mu.vercel.app/)
 * - Localhost dev server (http://localhost:5173/)
 */
export function getAppBaseUrl() {
  if (typeof window === 'undefined') return '/';
  try {
    if (import.meta && import.meta.url) {
      const u = new URL(import.meta.url);
      const parts = u.pathname.split('/').filter(Boolean);
      // Strip script filename (e.g. index-CRB0c3fR.js or config.js)
      if (parts.length > 0 && (parts[parts.length - 1].endsWith('.js') || parts[parts.length - 1].endsWith('.jsx'))) {
        parts.pop();
      }
      // Strip Vite build directories 'assets' or 'src'
      if (parts.length > 0 && (parts[parts.length - 1] === 'assets' || parts[parts.length - 1] === 'src')) {
        parts.pop();
      }
      const subPath = parts.length > 0 ? `/${parts.join('/')}/` : '/';
      return `${u.origin}${subPath}`;
    }
  } catch {
    // fallback to location
  }
  return `${window.location.origin}/`;
}

/**
 * Helper to resolve media URLs:
 * - If uploaded media (/uploads/...), resolves to https://dharmiclifefoundation.com/api/uploads/...
 * - If local static asset (/images/...), resolves dynamically using getAppBaseUrl() so it works
 *   flawlessly at root, inside /folder/, or on Vercel.
 * - Upgrades any http:// to https://
 */
export function getMediaUrl(url) {
  if (!url) return '';

  let clean = String(url).trim();

  // If already an absolute HTTP/HTTPS URL
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    // If it's a WordPress upload, keep the URL intact
    if (clean.includes('/wp-content/uploads/')) {
      return clean.replace(/^http:\/\//i, 'https://');
    }
    // If it contains /uploads/, redirect to the live cPanel backend uploads
    if (clean.includes('/uploads/')) {
      const uploadPath = clean.substring(clean.indexOf('/uploads/'));
      return `${LIVE_BACKEND_URL}${uploadPath}`;
    }
    // Upgrade http to https to prevent mixed-content
    return clean.replace(/^http:\/\//i, 'https://');
  }

  // Backend uploaded media (starts with /uploads/ or uploads/)
  if (clean.startsWith('/uploads/') || clean.startsWith('uploads/')) {
    const uploadPath = clean.startsWith('/') ? clean : `/${clean}`;
    return `${LIVE_BACKEND_URL}${uploadPath}`;
  }

  // Resolve local static frontend assets (/images/...) relative to the app base URL
  if (clean.startsWith('/images/') || clean.startsWith('images/')) {
    const relPath = clean.replace(/^\/+/, '');
    return `${getAppBaseUrl()}${relPath}`;
  }

  // Handle /trustees/ or trustees/
  if (clean.startsWith('/trustees/') || clean.startsWith('trustees/')) {
    const relPath = clean.replace(/^\/+/, '');
    return `${getAppBaseUrl()}images/${relPath}`;
  }

  if (clean.startsWith('data:')) {
    return clean;
  }

  // For any relative local path without http
  const relPath = clean.replace(/^\/+/, '');
  return `${getAppBaseUrl()}${relPath}`;
}

export default {
  BACKEND_URL,
  API_BASE_URL,
  LIVE_BACKEND_URL,
  getAppBaseUrl,
  getMediaUrl
};
