import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../components/auth/AuthLayout.jsx";
import { Button, Input } from "../../components/common/UI.jsx";
import { authService } from "../../services/authService.js";
import { useAuth } from "../../context/AuthContext.jsx";

const OTP_TTL_SECONDS = 10 * 60;

export default function VerifyOTP() {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const startedAt = Number(sessionStorage.getItem("signup_otp_sent_at") || 0);
    return startedAt
      ? Math.max(0, OTP_TTL_SECONDS - Math.floor((Date.now() - startedAt) / 1000))
      : OTP_TTL_SECONDS;
  });
  const navigate = useNavigate();
  const { saveSession } = useAuth();
  const target = sessionStorage.getItem("signup_target");
  const type = sessionStorage.getItem("verification_type") || "EMAIL_VERIFY";
  const email = sessionStorage.getItem("signup_email");
  const phone = sessionStorage.getItem("signup_phone");
  const devOtp = sessionStorage.getItem("signup_dev_otp");

  useEffect(() => {
    const timer = setInterval(
      () => setSecondsLeft((prev) => Math.max(0, prev - 1)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (!target) return navigate("/signup");
    setBusy(true);
    try {
      // The OTP must reach /auth/register unused — verifying it separately
      // marks it consumed and register then rejects it as expired.
      const payload = {
        password: sessionStorage.getItem("signup_password"),
        verificationCode: code.trim(),
      };
      if (type === "EMAIL_VERIFY") payload.email = email || target;
      else payload.phone = phone || target;
      const result = await authService.register(payload);
      ["signup_email", "signup_phone", "signup_target", "signup_password", "signup_dev_otp", "signup_otp_sent_at", "verification_type"].forEach(
        (key) => sessionStorage.removeItem(key)
      );
      saveSession(result.data);
      toast.success("Account created");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    if (!target) return navigate("/signup");
    setResending(true);
    try {
      const result = await authService.sendVerification({ target, type });
      if (result.data?.devOtp) {
        sessionStorage.setItem("signup_dev_otp", result.data.devOtp);
      }
      sessionStorage.setItem("signup_otp_sent_at", String(Date.now()));
      setSecondsLeft(OTP_TTL_SECONDS);
      setCode("");
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
      title="Verify your account"
      subtitle={`Enter the code sent to ${target || "your contact"}.`}
    >
      <form onSubmit={submit}>
        <Input
          label="Verification code"
          inputMode="numeric"
          maxLength="6"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          required
        />
        {devOtp ? (
          <button
            type="button"
            className="text-link"
            onClick={() => setCode(devOtp)}
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
        <Button disabled={busy}>
          {busy ? "Verifying…" : "Verify & create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}
