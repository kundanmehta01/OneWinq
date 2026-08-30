import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

      console.log(response);

      /*
        Backend response:

        {
          data:{
            user,
            tokens:{
              accessToken,
              refreshToken
            }
          }
        }

      */

      const data = response.data;

      localStorage.setItem(
        "accessToken",

        data.tokens.accessToken,
      );

      localStorage.setItem(
        "refreshToken",

        data.tokens.refreshToken,
      );

      login(data);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      px-4
      bg-gradient-to-br
      from-purple-100
      via-white
      to-purple-200
      "
    >
      <div
        className="
        grid
        md:grid-cols-2
        max-w-5xl
        w-full
        bg-white/70
        backdrop-blur-xl
        shadow-2xl
        rounded-3xl
        overflow-hidden
        "
      >
        {/* LEFT BRAND SECTION */}

        <div
          className="
          hidden
          md:flex
          flex-col
          justify-center
          p-10
          bg-gradient-to-br
          from-purple-600
          to-indigo-700
          text-white
          "
        >
          <h1 className="text-4xl font-bold mb-5">Welcome Back 👋</h1>

          <p className="text-lg opacity-90 mb-8">
            Login to your OneWinq account and manage your digital identity.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <span>✓</span>

              <p>Manage your profile</p>
            </div>

            <div className="flex gap-3">
              <span>✓</span>

              <p>Customize your templates</p>
            </div>

            <div className="flex gap-3">
              <span>✓</span>

              <p>Share your digital card</p>
            </div>
          </div>
        </div>

        {/* LOGIN FORM */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
          p-8
          md:p-12
          "
        >
          <h2
            className="
            text-3xl
            font-bold
            text-gray-800
            mb-2
            "
          >
            Login
          </h2>

          <p className="text-gray-500 mb-8">Access your OneWinq account</p>

          {error && (
            <p
              className="
              bg-red-100
              text-red-600
              p-3
              rounded-lg
              mb-4
              text-sm
              "
            >
              {error}
            </p>
          )}

          <div className="space-y-5">
            <input
              name="identifier"
              placeholder="Email or Phone"
              value={form.identifier}
              onChange={handleChange}
              className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              outline-none
              focus:ring-2
              focus:ring-purple-500
              "
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              outline-none
              focus:ring-2
              focus:ring-purple-500
              "
            />

            <div
              className="
              text-right
              "
            >
              <button
                onClick={() => navigate("/forgot-password")}
                className="
                text-purple-600
                text-sm
                hover:underline
                "
              >
                Forgot Password?
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="
              w-full
              py-3
              rounded-xl
              bg-purple-600
              text-white
              font-semibold
              hover:bg-purple-700
              transition
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <p
            className="
            text-center
            mt-6
            text-gray-600
            "
          >
            Don't have an account?
            <span
              onClick={() => navigate("/signup")}
              className="
              ml-1
              text-purple-600
              font-semibold
              cursor-pointer
              "
            >
              Create Account
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
