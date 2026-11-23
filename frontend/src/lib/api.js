/**
 * ============================================================================
 * THE FITNESS CLUB (Joshiyara Road HQ • Uttarkashi)
 * Lightweight Production REST API Client
 * ============================================================================
 */

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
).replace(/\/+$/, '');

export const CACHE_KEY = 'tfc_cms_cache_v1';
export const TOKEN_KEY = 'tfc_admin_jwt';

// Token Management
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error('Failed to save auth token:', e);
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove auth token:', e);
  }
};

export const isAuthenticated = () => Boolean(getToken());

// Helper for authorized API headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Single cold-start proof bootstrap request for public site.
 * Silently fetches updated content without blocking UI rendering.
 */
export async function fetchBootstrapData() {
  const response = await fetch(`${API_BASE_URL}/api/public/bootstrap`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Bootstrap failed with status ${response.status}`);
  }

  return response.json();
}

/**
 * Health check endpoint (used to check if Render instance has awakened)
 */
export async function checkServerHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`, {
    signal: AbortSignal.timeout(6000),
  });
  return response.ok;
}

/**
 * Admin Authentication
 */
export async function loginAdmin(username, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Authentication failed');
  }

  if (data.token) {
    setToken(data.token);
  }

  return data;
}

// Clear public site cache so edits appear immediately
export const clearPublicCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (e) {
    console.warn('[Cache] Failed to clear CMS cache:', e);
  }
};

/**
 * Authorized fetch wrapper for all /api/admin/** endpoints.
 * Intercepts 401 & 403 (expired/invalid JWT), removes token, and redirects to /admin.
 */
async function adminFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401 || res.status === 403) {
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/admin';
    }
    throw new Error('Session expired. Redirecting to login...');
  }

  return res;
}

/**
 * Upload Image to Cloudinary via backend
 */
export async function uploadImage(file) {
  const token = getToken();
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/admin/upload`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (response.status === 401 || response.status === 403) {
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/admin';
    }
    throw new Error('Session expired. Redirecting to login...');
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to upload image');
  }

  return data.url;
}

// ============================================================================
// ADMIN CRUD HELPERS
// ============================================================================

// --- Transformations ---
export async function fetchAdminTransformations() {
  const res = await adminFetch('/api/admin/transformations');
  if (!res.ok) throw new Error('Failed to load transformations');
  return res.json();
}

export async function createTransformation(item) {
  const res = await adminFetch('/api/admin/transformations', {
    method: 'POST',
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to create transformation');
  clearPublicCache();
  return res.json();
}

export async function updateTransformation(id, item) {
  const res = await adminFetch(`/api/admin/transformations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to update transformation');
  clearPublicCache();
  return res.json();
}

export async function deleteTransformation(id) {
  const res = await adminFetch(`/api/admin/transformations/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete transformation');
  clearPublicCache();
  return true;
}

// --- Events ---
export async function fetchAdminEvents() {
  const res = await adminFetch('/api/admin/events');
  if (!res.ok) throw new Error('Failed to load events');
  return res.json();
}

export async function createEvent(item) {
  const res = await adminFetch('/api/admin/events', {
    method: 'POST',
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to create event');
  clearPublicCache();
  return res.json();
}

export async function updateEvent(id, item) {
  const res = await adminFetch(`/api/admin/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to update event');
  clearPublicCache();
  return res.json();
}

export async function deleteEvent(id) {
  const res = await adminFetch(`/api/admin/events/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete event');
  clearPublicCache();
  return true;
}

// --- Products ---
export async function fetchAdminProducts() {
  const res = await adminFetch('/api/admin/products');
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}

export async function createProduct(item) {
  const res = await adminFetch('/api/admin/products', {
    method: 'POST',
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to create product');
  clearPublicCache();
  return res.json();
}

export async function updateProduct(id, item) {
  const res = await adminFetch(`/api/admin/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to update product');
  clearPublicCache();
  return res.json();
}

export async function deleteProduct(id) {
  const res = await adminFetch(`/api/admin/products/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete product');
  clearPublicCache();
  return true;
}

// --- Membership Plans ---
export async function fetchAdminPlans() {
  const res = await adminFetch('/api/admin/plans');
  if (!res.ok) throw new Error('Failed to load membership plans');
  return res.json();
}

export async function createPlan(item) {
  const res = await adminFetch('/api/admin/plans', {
    method: 'POST',
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to create membership plan');
  clearPublicCache();
  return res.json();
}

export async function updatePlan(id, item) {
  const res = await adminFetch(`/api/admin/plans/${id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to update membership plan');
  clearPublicCache();
  return res.json();
}

export async function deletePlan(id) {
  const res = await adminFetch(`/api/admin/plans/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete membership plan');
  clearPublicCache();
  return true;
}
