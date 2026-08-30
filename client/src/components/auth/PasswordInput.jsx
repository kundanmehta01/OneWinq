import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";


const PasswordInput = ({
  value,
  onChange,
  placeholder="Password"
}) => {

  const [show,setShow] = useState(false);


  return (

    <div className="relative">

      <input
        type={show ? "text":"password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
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
        type="button"
        onClick={()=>setShow(!show)}
        className="
          absolute
          right-4
          top-3
        "
      >

        {
          show ?
          <EyeOff size={20}/>
          :
          <Eye size={20}/>
        }

      </button>


    </div>

  );
};


export default PasswordInput;