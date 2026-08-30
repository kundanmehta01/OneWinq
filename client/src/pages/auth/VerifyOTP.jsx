import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {  registerUser } from "../../services/authService";

const VerifyOTP = () => {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);


const handleVerify = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const signupData = JSON.parse(
      localStorage.getItem("signupData")
    );


    if(!signupData){
      alert("Signup data not found");
      return;
    }


    const response = await registerUser({

      email: signupData.email || undefined,

      phone: signupData.phone || undefined,

      password: signupData.password,

      verificationCode: otp,

    });


    const {
      accessToken,
      refreshToken
    } = response.data.tokens;


    localStorage.setItem(
      "accessToken",
      accessToken
    );


    localStorage.setItem(
      "refreshToken",
      refreshToken
    );


    localStorage.removeItem("signupData");


    navigate("/dashboard");


  } catch(error){

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Registration failed"
    );

  } finally {

    setLoading(false);

  }

};

  return (

    <div className="
      min-h-screen 
      flex 
      items-center 
      justify-center 
      bg-gradient-to-br 
      from-purple-50 
      via-white 
      to-purple-100
    ">


      <form
        onSubmit={handleVerify}
        className="
          bg-white 
          shadow-xl 
          rounded-xl 
          p-8 
          w-full 
          max-w-md
        "
      >

        <h1 className="
          text-2xl 
          font-bold 
          text-center 
          mb-6
        ">
          Verify OTP
        </h1>


        <input

          value={otp}

          onChange={(e)=>setOtp(e.target.value)}

          placeholder="Enter 6 digit OTP"

          maxLength={6}

          className="
            w-full
            border
            rounded-lg
            p-3
            text-center
            text-xl
            tracking-widest
            mb-5
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
          "

        >

          {
            loading 
            ? "Verifying..." 
            : "Verify OTP"
          }

        </button>


      </form>


    </div>

  );
};


export default VerifyOTP;