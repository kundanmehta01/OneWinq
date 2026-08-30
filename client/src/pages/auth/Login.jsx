import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import PasswordInput from "../../components/auth/PasswordInput";
import ErrorMessage from "../../components/common/ErrorMessage";

import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await loginUser({
        identifier: form.identifier,

        password: form.password,
      });

      /*
        Backend response:

        {
          data:{
             user,
             tokens
          }
        }

      */

      login(response.data);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your OneWinq account">
      <div className="space-y-5">
        <ErrorMessage message={error} />

        <Input
          label="Email or Phone"
          name="identifier"
          placeholder="Enter email or phone"
          value={form.identifier}
          onChange={handleChange}
        />

        <PasswordInput
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <button
          onClick={() => navigate("/forgot-password")}
          className="
            text-sm
            text-purple-600
            hover:underline
          "
        >
          Forgot Password?
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;
