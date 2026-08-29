import { Building2, Plus, Settings } from "lucide-react";


const AdminHeader = () => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        sm:p-8
      "
    >

      <div
        className="
          flex
          flex-col
          justify-between
          gap-5
          lg:flex-row
          lg:items-center
        "
      >


        {/* Left Content */}

        <div>

          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-purple-700
            "
          >

            <Building2 size={18}/>

            Company Dashboard

          </div>


          <h1
            className="
              mt-3
              text-2xl
              font-bold
              text-slate-900
              sm:text-3xl
            "
          >
            Welcome back, Admin 👋
          </h1>


          <p
            className="
              mt-2
              max-w-xl
              text-sm
              leading-6
              text-slate-500
              sm:text-base
            "
          >
            Manage your company profile, team members, products and
            professional identity from one place.
          </p>


        </div>





        {/* Actions */}

        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
          "
        >

          <button
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-purple-700
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-purple-800
            "
          >

            <Plus size={18}/>

            Add Member

          </button>



          <button
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-slate-700
              transition
              hover:border-purple-300
              hover:bg-purple-50
              hover:text-purple-700
            "
          >

            <Settings size={18}/>

            Settings

          </button>


        </div>


      </div>


    </div>
  );
};


export default AdminHeader;