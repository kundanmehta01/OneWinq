import api from './api.js';

export const getEngagementFeed = (params) => api.get('/engagement/thoughts/feed', { params });
export const createThought = (data) => api.post('/engagement/thoughts', data);
export const deleteThought = (id) => api.delete(`/engagement/thoughts/${id}`);
export const toggleThoughtLike = (id) => api.post(`/engagement/thoughts/${id}/like`);

export const getThoughtComments = (thoughtId, params) => api.get(`/engagement/thoughts/${thoughtId}/comments`, { params });
export const addThoughtComment = (thoughtId, content, parentId) => api.post(`/engagement/thoughts/${thoughtId}/comments`, parentId ? { content, parentId } : { content });

export const createProfileReview = (profileId, data) => api.post(`/engagement/reviews/profiles/${profileId}`, data);
export const getProfileReviews = (profileId, params) => api.get(`/engagement/reviews/profiles/${profileId}`, { params });
export const updateReviewStatus = (id, status) => api.patch(`/engagement/reviews/${id}/status`, { status });
