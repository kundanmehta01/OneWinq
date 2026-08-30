import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { verifyCode, registerUser } from "../../services/authService";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const signupData = JSON.parse(localStorage.getItem("signupData"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!signupData) {
      alert("Signup session expired");

      navigate("/signup");

      return;
    }

    try {
      setLoading(true);

      const target = signupData.email ? signupData.email : signupData.phone;

      const type = signupData.type;

      // 1. Verify OTP

      await verifyCode({
        target,

        code: otp,

        type,
      });

      // 2. Create Account

      const response = await registerUser({
        email: signupData.email || undefined,

        phone: signupData.phone || undefined,

        password: signupData.password,

        verificationCode: otp,
      });

      console.log(response);

      const tokens = response.data.tokens;

      localStorage.setItem(
        "accessToken",

        tokens.accessToken,
      );

      localStorage.setItem(
        "refreshToken",

        tokens.refreshToken,
      );

      localStorage.removeItem("signupData");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "OTP verification failed");
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
mb-4
"
        >
          Verify OTP
        </h1>

        <p
          className="
text-center
text-gray-500
mb-6
"
        >
          Enter the code sent to your email or phone
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={otp}
            maxLength={6}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6 digit OTP"
            required
            className="
w-full
border
rounded-lg
px-4
py-3
text-center
text-xl
tracking-widest
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
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
