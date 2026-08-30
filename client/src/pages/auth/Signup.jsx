import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { sendVerification } from "../../services/authService";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email && !formData.phone) {
      alert("Email or phone is required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const target = formData.email ? formData.email : formData.phone;

      const type = formData.email ? "EMAIL_VERIFY" : "PHONE_VERIFY";

      const response = await sendVerification({
        target,
        type,
      });

      console.log(response);

      localStorage.setItem(
        "signupData",

        JSON.stringify({
          email: formData.email,

          phone: formData.phone,

          password: formData.password,

          type,
        }),
      );

      navigate("/verify-otp");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "OTP sending failed");
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
        {/* LEFT SIDE */}

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
          <h1 className="text-4xl font-bold mb-5">OneWinq</h1>

          <p className="text-lg opacity-90 mb-8">
            Create your digital identity and showcase yourself everywhere.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <span>✓</span>

              <p>Create your personal profile</p>
            </div>

            <div className="flex gap-3">
              <span>✓</span>

              <p>Customize digital cards</p>
            </div>

            <div className="flex gap-3">
              <span>✓</span>

              <p>Share your identity easily</p>
            </div>
          </div>
        </div>

        {/* SIGNUP FORM */}

        <motion.form
          onSubmit={handleSubmit}
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
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">Join OneWinq today</p>

          <div className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
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
              name="phone"
              placeholder="Phone number (optional)"
              value={formData.phone}
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
              value={formData.password}
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
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
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

            <button
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
              {loading ? "Sending OTP..." : "Continue"}
            </button>
          </div>

          <p
            className="
            text-center
            mt-6
            text-gray-600
            "
          >
            Already have account?
            <span
              onClick={() => navigate("/login")}
              className="
              text-purple-600
              cursor-pointer
              ml-1
              font-semibold
              "
            >
              Login
            </span>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
