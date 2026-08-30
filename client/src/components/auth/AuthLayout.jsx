import { motion } from "framer-motion";


const AuthLayout = ({ children, title, subtitle }) => {

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        bg-gradient-to-br
        from-purple-50
        via-white
        to-purple-100
      "
    >

      <motion.div
        initial={{
          opacity:0,
          y:30
        }}
        animate={{
          opacity:1,
          y:0
        }}
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-xl
          p-8
        "
      >

        <div className="text-center mb-6">

          <h1
            className="
              text-3xl
              font-bold
              text-gray-900
            "
          >
            {title}
          </h1>


          <p
            className="
              text-gray-500
              mt-2
            "
          >
            {subtitle}
          </p>

        </div>


        {children}


      </motion.div>


    </div>
  );
};


export default AuthLayout;