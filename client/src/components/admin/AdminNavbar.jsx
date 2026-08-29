import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  UserCircle,
} from "lucide-react";


const AdminNavbar = () => {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-20
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white/90
        px-4
        backdrop-blur-md
        sm:px-6
        lg:px-8
      "
    >

      {/* Left Section */}

      <div>

        <p
          className="
            text-xs
            font-medium
            uppercase
            tracking-wider
            text-purple-700
          "
        >
          Company Dashboard
        </p>


        <h2
          className="
            mt-1
            text-lg
            font-bold
            text-slate-900
            sm:text-xl
          "
        >
          Welcome back, Admin 👋
        </h2>

      </div>



      {/* Right Section */}

      <div
        className="
          flex
          items-center
          gap-3
          sm:gap-5
        "
      >


        {/* Search */}

        <div
          className="
            hidden
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-3
            py-2
            md:flex
          "
        >

          <Search
            size={17}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-36
              bg-transparent
              text-sm
              outline-none
              placeholder:text-slate-400
              lg:w-52
            "
          />

        </div>




        {/* Notification */}

        <button
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-500
            transition
            hover:border-purple-200
            hover:bg-purple-50
            hover:text-purple-700
          "
        >

          <Bell size={18}/>


          <span
            className="
              absolute
              right-2
              top-2
              h-2
              w-2
              rounded-full
              bg-purple-600
            "
          />

        </button>




        {/* Profile */}

        <div
          className="
            group
            relative
          "
        >

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-2
              py-1.5
              transition
              hover:bg-slate-50
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-purple-600
                to-indigo-600
                text-sm
                font-bold
                text-white
              "
            >
              MP
            </div>


            <div
              className="
                hidden
                text-left
                sm:block
              "
            >

              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-800
                "
              >
                Moin Patel
              </p>

              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                Founder Admin
              </p>

            </div>


            <ChevronDown
              size={16}
              className="text-slate-400"
            />

          </button>



          {/* Dropdown */}

          <div
            className="
              invisible
              absolute
              right-0
              mt-2
              w-52
              translate-y-2
              rounded-xl
              border
              border-slate-200
              bg-white
              p-2
              opacity-0
              shadow-lg
              transition-all
              duration-200
              group-hover:visible
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >

            <button
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-sm
                text-slate-600
                transition
                hover:bg-purple-50
                hover:text-purple-700
              "
            >

              <UserCircle size={17}/>

              Profile

            </button>


            <button
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-sm
                text-red-500
                transition
                hover:bg-red-50
              "
            >

              <LogOut size={17}/>

              Logout

            </button>


          </div>


        </div>


      </div>


    </header>
  );
};


export default AdminNavbar;