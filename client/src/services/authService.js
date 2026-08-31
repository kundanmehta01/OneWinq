import api from "./api.js";

export const authService = {
  sendVerification: (payload) => api.post("/auth/send-verification", payload),
  verifyCode: (payload) => api.post("/auth/verify-code", payload),
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  refresh: (refreshToken) => api.post("/auth/refresh", { refreshToken }),
  logout: (refreshToken) => api.post("/auth/logout", { refreshToken }),
  resetPassword: (payload) => api.post("/auth/reset-password", payload),
  getMe: () => api.get("/auth/me"),
};
