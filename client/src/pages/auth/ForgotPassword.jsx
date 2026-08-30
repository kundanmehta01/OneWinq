import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import AuthLayout from "../../components/auth/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";

import { sendVerification } from "../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    try {
      setLoading(true);

      setError("");

      await sendVerification({
        target: email,

        type: "PASSWORD_RESET",
      });

      localStorage.setItem(
        "resetEmail",

        email,
      );

      navigate("/reset-password");
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Reset your OneWinq account password"
    >
      <motion.div
        initial={{
          opacity: 0,

          y: 20,
        }}
        animate={{
          opacity: 1,

          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="
space-y-6
"
      >
        {/* Info Card */}

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
          Enter your registered email address. We will send you a verification
          code to reset your password.
        </div>

        <ErrorMessage message={error} />

        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button onClick={handleSendOTP} disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
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

export default ForgotPassword;
