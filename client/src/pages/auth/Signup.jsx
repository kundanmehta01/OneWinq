import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../components/auth/AuthLayout.jsx";
import { Button, Input } from "../../components/common/UI.jsx";
import { authService } from "../../services/authService.js";

const PHONE_PATTERN = /^\+?[1-9]\d{6,14}$/;

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const setField = (key) => (event) =>
    setForm({ ...form, [key]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!email && !phone) {
      toast.error("Enter an email or a phone number to register");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }
    if (phone && !PHONE_PATTERN.test(phone)) {
      toast.error("Use an international phone format, e.g. +919876543210");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    const type = email ? "EMAIL_VERIFY" : "PHONE_VERIFY";
    const target = email || phone;
    setBusy(true);
    try {
      await authService.sendVerification({ target, type });
      sessionStorage.setItem("signup_email", email);
      sessionStorage.setItem("signup_phone", phone);
      sessionStorage.setItem("signup_target", target);
      sessionStorage.setItem("signup_password", form.password);
      sessionStorage.setItem("verification_type", type);
      toast.success(`Verification code sent to ${target}`);
      navigate("/verify");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register with email or phone, then confirm with a verification code."
      footer={
        <>
          Already registered? <Link to="/login">Sign in</Link>
        </>
      }
    >
      <form onSubmit={submit}>
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={setField("email")}
          autoComplete="email"
        />
        <Input
          label="Phone number"
          type="tel"
          placeholder="+919876543210"
          value={form.phone}
          onChange={setField("phone")}
          autoComplete="tel"
        />
        <p className="field-hint">
          Provide at least one contact. If both are filled, we verify the email
          and create the account with that email.
        </p>
        <Input
          label="Password"
          type="password"
          minLength="8"
          value={form.password}
          onChange={setField("password")}
          autoComplete="new-password"
          required
        />
        <Input
          label="Confirm password"
          type="password"
          minLength="8"
          value={form.confirmPassword}
          onChange={setField("confirmPassword")}
          autoComplete="new-password"
          required
        />
        <Button disabled={busy}>
          {busy ? "Sending code…" : "Continue"}
        </Button>
      </form>
    </AuthLayout>
  );
}
