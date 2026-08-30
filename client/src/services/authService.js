import api from "./api";


// Send OTP
export const sendVerification = async(data)=>{

    const response = await api.post(
        "/auth/send-verification",
        data
    );

    return response.data;

};


// Verify OTP
export const verifyCode = async(data)=>{

    const response = await api.post(
        "/auth/verify-code",
        data
    );

    return response.data;

};



// Register
export const registerUser = async(data)=>{

    const response = await api.post(
        "/auth/register",
        data
    );

    return response.data;

};



// Login
export const loginUser = async(data)=>{

    const response = await api.post(
        "/auth/login",
        data
    );

    return response.data;

};



// Current User
export const getMe = async()=>{

    const response = await api.get(
        "/auth/me"
    );

    return response.data;

};



// Refresh Token
export const refreshToken = async(data)=>{

    const response = await api.post(
        "/auth/refresh",
        data
    );

    return response.data;

};



// Logout
export const logoutUser = async(data)=>{

    const response = await api.post(
        "/auth/logout",
        data
    );

    return response.data;

};



// Reset Password
export const resetPassword = async(data)=>{

    const response = await api.post(
        "/auth/reset-password",
        data
    );

    return response.data;

};