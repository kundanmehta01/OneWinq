import {
  Shield,

  Check,
  Save,
} from "lucide-react";


const AssignRole = () => {


  const roles = [
    {
      name: "Admin",
      description:
        "Full access to company management.",
      permissions: [
        "Manage Team",
        "Edit Company",
        "Manage Projects",
        "View Analytics",
      ],
    },

    {
      name: "Manager",
      description:
        "Manage assigned departments.",
      permissions: [
        "Manage Members",
        "Create Projects",
        "View Reports",
      ],
    },

    {
      name: "Member",
      description:
        "Basic company access.",
      permissions: [
        "View Profile",
        "Update Details",
      ],
    },

  ];



  return (

    <div
      className="
        space-y-8
      "
    >


      {/* Header */}

      <div>

        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Assign Role
        </h1>


        <p
          className="
            mt-2
            text-slate-600
          "
        >
          Manage member roles and permissions.
        </p>

      </div>









      {/* Member */}

      <div
        className="
          rounded-2xl
          border
          bg-white
          p-6
          shadow-sm
        "
      >

        <h2
          className="
            text-lg
            font-bold
          "
        >
          Select Member
        </h2>



        <select
          className="
            mt-4
            w-full
            rounded-xl
            border
            px-4
            py-3
            outline-none
          "
        >

          <option>
            Rahul Sharma - Frontend Developer
          </option>


          <option>
            Aman Verma - Designer
          </option>


          <option>
            Priya Singh - Marketing
          </option>


        </select>


      </div>









      {/* Roles */}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-3
        "
      >

        {
          roles.map((role,index)=>(

            <div
              key={role.name}
              className={`
                rounded-2xl
                border
                bg-white
                p-6
                shadow-sm
                ${
                  index===0
                  ? "border-purple-700"
                  : ""
                }
              `}
            >


              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-purple-100
                    text-purple-700
                  "
                >

                  <Shield size={20}/>

                </div>


                <h3
                  className="
                    text-xl
                    font-bold
                  "
                >
                  {role.name}
                </h3>


              </div>





              <p
                className="
                  mt-4
                  text-sm
                  text-slate-600
                "
              >
                {role.description}
              </p>






              <div
                className="
                  mt-5
                  space-y-3
                "
              >

                {
                  role.permissions.map((permission)=>(

                    <div
                      key={permission}
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-slate-700
                      "
                    >

                      <Check
                        size={16}
                        className="text-purple-700"
                      />

                      {permission}

                    </div>

                  ))
                }

              </div>






              <button
                className="
                  mt-6
                  w-full
                  rounded-xl
                  border
                  border-purple-700
                  py-3
                  text-sm
                  font-semibold
                  text-purple-700
                "
              >

                Select Role

              </button>



            </div>

          ))
        }


      </div>








      {/* Save */}

      <button
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-purple-700
          px-6
          py-3
          font-semibold
          text-white
        "
      >

        <Save size={18}/>

        Save Changes

      </button>



    </div>

  );

};


export default AssignRole;