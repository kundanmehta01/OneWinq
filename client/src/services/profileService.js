import api from './api.js';
export const getMyProfile = () => api.get('/profiles/me');
export const getPublicProfile = (slug) => api.get(`/profiles/${slug}`);
export const updateMyProfile = (payload) => api.patch('/profiles/me', payload);
export const updateMySkills = (skills) => api.put('/profiles/me/skills', { skills });
