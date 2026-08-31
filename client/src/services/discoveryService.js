import api from './api.js';
export const discoverProfiles = (params) => api.get('/discovery', { params });
export const searchProfiles = (params) => api.get('/discovery/search', { params });
export const recordProfileView = (profileId) => api.post(`/discovery/views/${profileId}`);
export const getRecentViews = (params) => api.get('/discovery/views/recent', { params });
export const getViewAnalytics = () => api.get('/discovery/views/analytics');
