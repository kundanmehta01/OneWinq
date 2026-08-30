import { useRef } from "react";


const OTPInput = ({ value, onChange }) => {

  const inputs = useRef([]);


  const otpArray = value
    ? value.split("")
    : Array(6).fill("");


  const handleChange = (e, index) => {

    const val = e.target.value;

    if(!/^\d*$/.test(val)) return;


    const newOtp = [...otpArray];

    newOtp[index] = val.slice(-1);


    onChange(newOtp.join(""));


    // Move to next input
    if(val && index < 5){
      inputs.current[index + 1].focus();
    }

  };


  const handleKeyDown = (e, index) => {

    if(
      e.key === "Backspace" &&
      !otpArray[index] &&
      index > 0
    ){
      inputs.current[index - 1].focus();
    }

  };


  return (

    <div className="flex justify-between gap-2">

      {
        otpArray.map((digit,index)=>(

          <input
            key={index}
            ref={(el)=>
              inputs.current[index]=el
            }
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e)=>
              handleChange(e,index)
            }
            onKeyDown={(e)=>
              handleKeyDown(e,index)
            }
            className="
              w-12
              h-12
              text-center
              text-xl
              font-semibold
              rounded-xl
              border
              border-gray-300
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

        ))
      }

    </div>

  );
};


export default OTPInput;