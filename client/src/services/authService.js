import api from "./api";



export const sendVerification = async(data)=>{
 const res = await api.post(
   "/auth/send-verification",
   data
 );
 return res.data;
};



export const verifyCode = async(data)=>{
 const res = await api.post(
   "/auth/verify-code",
   data
 );
 return res.data;
};



export const registerUser = async(data)=>{
 const res = await api.post(
   "/auth/register",
   data
 );
 return res.data;
};



export const loginUser = async(data)=>{
 const res = await api.post(
   "/auth/login",
   data
 );
 return res.data.data;
};



export const getMe = async()=>{
 const res = await api.get(
   "/auth/me"
 );
 return res.data.data;
};



export const refreshToken = async(data)=>{
 const res = await api.post(
   "/auth/refresh",
   data
 );
 return res.data.data;
};



export const logoutUser = async(data)=>{
 const res = await api.post(
   "/auth/logout",
   data
 );
 return res.data;
};



export const resetPassword = async(data)=>{
 const res = await api.post(
   "/auth/reset-password",
   data
 );
 return res.data;
};