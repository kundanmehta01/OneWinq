import api from './api.js';
export const getConnections = (params) => api.get('/connections', { params });
export const getIncomingRequests = (params) => api.get('/connections/requests', { params });
export const getSentRequests = (params) => api.get('/connections/sent', { params });
export const sendConnectionRequest = (userId) => api.post(`/connections/${userId}`);
export const acceptConnectionRequest = (id) => api.patch(`/connections/${id}/accept`);
export const rejectConnectionRequest = (id) => api.patch(`/connections/${id}/reject`);
export const removeConnection = (id) => api.delete(`/connections/${id}`);
export const findPeople = (params) => api.get('/discovery/search', { params });
