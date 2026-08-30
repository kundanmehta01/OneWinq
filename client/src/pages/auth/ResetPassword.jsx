import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import OTPInput from "../../components/auth/OTPInput";
import PasswordInput from "../../components/auth/PasswordInput";

import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";

import { resetPassword } from "../../services/authService";

const ResetPassword = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { target } = location.state || {};

  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleReset = async () => {
    try {
      setLoading(true);

      setError("");

      await resetPassword({
        target,

        code: otp,

        newPassword: password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Create your new password">
      <div className="space-y-6">
        <ErrorMessage message={error} />

        <OTPInput value={otp} onChange={setOtp} />

        <PasswordInput
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleReset} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
