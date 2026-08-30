import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";

import { sendVerification } from "../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [target, setTarget] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    try {
      setLoading(true);

      setError("");

      await sendVerification({
        target,

        type: "PASSWORD_RESET",
      });

      navigate("/reset-password", {
        state: {
          target,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to send reset code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot Password" subtitle="Reset your OneWinq password">
      <div className="space-y-5">
        <ErrorMessage message={error} />

        <Input
          label="Email or Phone"
          placeholder="Enter email or phone"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <Button onClick={handleSendOTP} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Code"}
        </Button>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
