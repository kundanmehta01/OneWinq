import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      alert("Email or Phone number is required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password does not match");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be minimum 8 characters");
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

      alert(error.response?.data?.message || "OTP send failed");
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
bg-gradient-to-br
from-purple-50
via-white
to-purple-100
px-4
"
    >
      <div
        className="
w-full
max-w-md
bg-white
rounded-2xl
shadow-xl
p-8
"
      >
        <h1
          className="
text-3xl
font-bold
text-center
mb-6
"
        >
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address (optional)"
            value={formData.email}
            onChange={handleChange}
            className="
w-full
border
rounded-lg
px-4
py-3
"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number (optional)"
            value={formData.phone}
            onChange={handleChange}
            className="
w-full
border
rounded-lg
px-4
py-3
"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="
w-full
border
rounded-lg
px-4
py-3
"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="
w-full
border
rounded-lg
px-4
py-3
"
          />

          <button
            disabled={loading}
            className="
w-full
bg-purple-600
text-white
py-3
rounded-lg
hover:bg-purple-700
"
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
