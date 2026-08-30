import { Routes, Route } from "react-router-dom";


// Admin / Company Pages
import CompanyAdminDashboard from "../pages/admin/company/CompanyAdminDashboard";
import CompanyProfile from "../pages/company/CompanyProfile";
import ProtectedRoute from "./ProtectedRoute";
// Auth Pages
import Signup from "../pages/auth/SignUp";
import VerifyOTP from "../pages/auth/VerifyOTP";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";



const AppRoutes = () => {

  return (

    <Routes>


      {/* ================= AUTH ROUTES ================= */}

      <Route
        path="/signup"
        element={<Signup />}
      />


      <Route
        path="/verify-otp"
        element={<VerifyOTP />}
      />


      <Route
        path="/login"
        element={<Login />}
      />


      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />


      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />



      {/* ================= COMPANY ROUTES ================= */}

    <Route
  path="/company/profile"
  element={
    <ProtectedRoute>
      <CompanyProfile />
    </ProtectedRoute>
  }
/>


      {/* ================= ADMIN ROUTES ================= */}

     <Route
  path="/admin/company"
  element={
    <ProtectedRoute>
      <CompanyAdminDashboard />
    </ProtectedRoute>
  }
/>



    </Routes>

  );

};


export default AppRoutes;