import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../components/auth/AuthLayout.jsx";
import { Button, Input } from "../../components/common/UI.jsx";
import { authService } from "../../services/authService.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function VerifyOTP() {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { saveSession } = useAuth();
  const target = sessionStorage.getItem("signup_target");
  const type = sessionStorage.getItem("verification_type") || "EMAIL_VERIFY";
  const email = sessionStorage.getItem("signup_email");
  const phone = sessionStorage.getItem("signup_phone");

  const submit = async (event) => {
    event.preventDefault();
    if (!target) return navigate("/signup");
    setBusy(true);
    try {
      await authService.verifyCode({ target, code, type });
      const payload = {
        password: sessionStorage.getItem("signup_password"),
        verificationCode: code,
      };
      if (type === "EMAIL_VERIFY") payload.email = email || target;
      else payload.phone = phone || target;
      const result = await authService.register(payload);
      sessionStorage.removeItem("signup_password");
      saveSession(result.data);
      toast.success("Account created");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title="Verify your account"
      subtitle={`Enter the code sent to ${target || "your contact"}.`}
    >
      <form onSubmit={submit}>
        <Input
          label="Verification code"
          inputMode="numeric"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          required
        />
        <Button disabled={busy}>
          {busy ? "Verifying…" : "Verify & create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}
