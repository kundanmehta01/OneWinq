import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../components/auth/AuthLayout.jsx";
import { Button, Input } from "../../components/common/UI.jsx";
import { authService } from "../../services/authService.js";

const OTP_TTL_SECONDS = 10 * 60;

export default function ResetPassword() {
  const [form, setForm] = useState({
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [busy, setBusy] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const startedAt = Number(sessionStorage.getItem("reset_otp_sent_at") || 0);
    return startedAt
      ? Math.max(0, OTP_TTL_SECONDS - Math.floor((Date.now() - startedAt) / 1000))
      : OTP_TTL_SECONDS;
  });
  const navigate = useNavigate();
  const doneRef = useRef(false);

  const target = sessionStorage.getItem("reset_target");
  const devOtp = sessionStorage.getItem("reset_dev_otp");

  useEffect(() => {
    if (doneRef.current) return;
    if (!target) return navigate("/forgot-password", { replace: true });
  }, [target, navigate]);

  useEffect(() => {
    const timer = setInterval(
      () => setSecondsLeft((prev) => Math.max(0, prev - 1)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  const setField = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!target) return navigate("/forgot-password");
    if (form.code.trim().length < 4) {
      toast.error("Enter the verification code you received");
      return;
    }
    if (form.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setBusy(true);
    try {
      await authService.resetPassword({
        target,
        code: form.code.trim(),
        newPassword: form.newPassword,
      });
      doneRef.current = true;
      sessionStorage.removeItem("reset_target");
      sessionStorage.removeItem("reset_dev_otp");
      sessionStorage.removeItem("reset_otp_sent_at");
      toast.success("Password updated. Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    setResending(true);
    try {
      const result = await authService.sendVerification({
        target,
        type: "PASSWORD_RESET",
      });
      if (result.data?.devOtp) {
        sessionStorage.setItem("reset_dev_otp", result.data.devOtp);
      }
      sessionStorage.setItem("reset_otp_sent_at", String(Date.now()));
      setSecondsLeft(OTP_TTL_SECONDS);
      setForm((prev) => ({ ...prev, code: "" }));
      toast.success("A new code has been sent");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setResending(false);
    }
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <AuthLayout
      title="Choose a new password"
      subtitle={`Enter the code sent to ${target || "your contact"} and a new password.`}
    >
      <form onSubmit={submit}>
        <Input
          label="Verification code"
          inputMode="numeric"
          maxLength="6"
          value={form.code}
          onChange={setField("code")}
          required
        />
        {devOtp ? (
          <button
            type="button"
            className="text-link"
            onClick={() => setForm((prev) => ({ ...prev, code: devOtp }))}
          >
            Autofill dev OTP ({devOtp})
          </button>
        ) : null}
        <p className="field-hint">
          Code expires in {minutes}:{seconds}.{" "}
          <button
            type="button"
            className="text-link"
            onClick={resend}
            disabled={resending}
          >
            {resending ? "Resending…" : "Resend code"}
          </button>
        </p>
        <Input
          label="New password"
          type="password"
          minLength="8"
          value={form.newPassword}
          onChange={setField("newPassword")}
          autoComplete="new-password"
          required
        />
        <Input
          label="Confirm new password"
          type="password"
          minLength="8"
          value={form.confirmPassword}
          onChange={setField("confirmPassword")}
          autoComplete="new-password"
          required
        />
        <Button disabled={busy}>
          {busy ? "Resetting…" : "Reset password"}
        </Button>
      </form>
    </AuthLayout>
  );
}
