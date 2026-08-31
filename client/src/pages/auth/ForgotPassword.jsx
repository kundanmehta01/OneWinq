import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../components/auth/AuthLayout.jsx";
import { Button, Input } from "../../components/common/UI.jsx";
import { authService } from "../../services/authService.js";

export default function ForgotPassword() {
  const [target, setTarget] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const trimmed = target.trim();
    if (!trimmed) {
      toast.error("Enter your email or phone number");
      return;
    }
    setBusy(true);
    try {
      const result = await authService.sendVerification({
        target: trimmed,
        type: "PASSWORD_RESET",
      });
      sessionStorage.setItem("reset_target", trimmed);
      sessionStorage.setItem("reset_otp_sent_at", String(Date.now()));
      if (result.data?.devOtp) {
        sessionStorage.setItem("reset_dev_otp", result.data.devOtp);
      } else {
        sessionStorage.removeItem("reset_dev_otp");
      }
      toast.success("Reset code sent");
      navigate("/reset-password");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We will send a verification code to your email or phone."
    >
      <form onSubmit={submit}>
        <Input
          label="Email or phone"
          value={target}
          onChange={(event) => setTarget(event.target.value)}
          required
        />
        <Button disabled={busy}>
          {busy ? "Sending code…" : "Send code"}
        </Button>
      </form>
    </AuthLayout>
  );
}
