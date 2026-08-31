import api from './api.js';

export const getMyCard = () => api.get('/cards/me');
export const updateMyCard = (payload) => api.patch('/cards/me', payload);
export const getPublicCard = (slug) => api.get(`/cards/${slug}`);
