import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import AuthLayout from "../../components/auth/AuthLayout";
import PasswordInput from "../../components/auth/PasswordInput";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";

import { resetPassword } from "../../services/authService";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleReset = async () => {
    try {
      setError("");

      if (password !== confirmPassword) {
        setError("Passwords do not match");

        return;
      }

      const target = localStorage.getItem("resetEmail");

      if (!target) {
        setError("Email not found. Please try again.");

        return;
      }

      setLoading(true);

      const response = await resetPassword({
        target,

        code: otp,

        newPassword: password,
      });

      console.log("Reset Success:", response);

      localStorage.removeItem("resetEmail");

      navigate("/login");
    } catch (error) {
      console.log("Reset Error:", error);

      setError(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Secure your account with a new password"
    >
      <motion.div
        initial={{
          opacity: 0,

          y: 25,
        }}
        animate={{
          opacity: 1,

          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
space-y-6
"
      >
        {/* Info Box */}

        <div
          className="
bg-purple-50
border
border-purple-100
rounded-xl
p-4
text-sm
text-purple-700
"
        >
          A verification code was sent to your email. Enter the OTP and create
          your new password.
        </div>

        <ErrorMessage message={error} />

        {/* OTP INPUT */}

        <div>
          <label
            className="
text-sm
font-medium
text-gray-700
"
          >
            Verification Code
          </label>

          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            placeholder="Enter 6 digit OTP"
            className="
mt-2
w-full
border
rounded-xl
px-4
py-3
text-center
tracking-[10px]
text-xl
font-semibold
outline-none
focus:ring-2
focus:ring-purple-500
"
          />
        </div>

        {/* PASSWORD */}

        <PasswordInput
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordInput
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button onClick={handleReset} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="
w-full
text-sm
text-purple-600
hover:underline
"
        >
          Back to Login
        </button>
      </motion.div>
    </AuthLayout>
  );
};

export default ResetPassword;
