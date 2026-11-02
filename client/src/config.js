// Central Configuration for Dharmic Life Foundation
// Direct high-speed HTTPS backend on cPanel (sub-second response, zero mixed content)
export const LIVE_BACKEND_URL = 'https://dharmiclifefoundation.com/api';

// Resolve Backend Base URL: Direct HTTPS connection
export const BACKEND_URL = (() => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  return LIVE_BACKEND_URL;
})();

// Full API URL prefix
export const API_BASE_URL = BACKEND_URL;

/**
 * Helper to resolve media URLs directly from https://dharmiclifefoundation.com/api/uploads
 * - Strips all legacy hosts (node256, dharmiclifepondicherry, amigowebster)
 * - Automatically upgrades any http:// to https://
 * - Guarantees 100% secure, fast delivery directly from dharmiclife-file/uploads
 */
export function getMediaUrl(url) {
  if (!url) return '';

  let clean = url.trim();

  // Strip legacy hostnames & paths and point directly to backend uploads
  if (clean.includes('/uploads/')) {
    const uploadPath = clean.substring(clean.indexOf('/uploads/'));
    return `${LIVE_BACKEND_URL}${uploadPath}`;
  }

  if (clean.startsWith('uploads/')) {
    return `${LIVE_BACKEND_URL}/${clean}`;
  }

  // Preserve local static frontend assets (/images/...)
  if (clean.startsWith('/images/') || clean.startsWith('images/')) {
    return clean.startsWith('/') ? clean : `/${clean}`;
  }

  // Upgrade any external http:// to https:// to prevent mixed-content warnings
  if (clean.startsWith('http://')) {
    clean = clean.replace(/^http:\/\//i, 'https://');
  }

  if (clean.startsWith('https://') || clean.startsWith('data:')) {
    return clean;
  }

  return clean.startsWith('/') ? clean : `/${clean}`;
}

export default {
  BACKEND_URL,
  API_BASE_URL,
  LIVE_BACKEND_URL,
  getMediaUrl
};
