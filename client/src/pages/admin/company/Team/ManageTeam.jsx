import {
  Users,
  Search,
  UserPlus,
  MoreVertical,
} from "lucide-react";


const ManageTeam = () => {


  const members = [
    {
      name: "Moin Patel",
      role: "Founder & CEO",
      department: "Leadership",
      status: "Active",
    },

    {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      department: "Engineering",
      status: "Active",
    },

    {
      name: "Aman Verma",
      role: "UI Designer",
      department: "Design",
      status: "Pending",
    },

    {
      name: "Priya Singh",
      role: "Marketing Manager",
      department: "Marketing",
      status: "Active",
    },

  ];



  return (

    <div
      className="
        space-y-8
      "
    >


      {/* Header */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
              text-slate-900
            "
          >
            Manage Team
          </h1>


          <p
            className="
              mt-2
              text-slate-600
            "
          >
            Manage company members and their roles.
          </p>

        </div>



        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-purple-700
            px-5
            py-3
            text-sm
            font-semibold
            text-white
          "
        >

          <UserPlus size={18}/>

          Add Member

        </button>


      </div>








      {/* Stats */}

      <div
        className="
          grid
          gap-5
          sm:grid-cols-3
        "
      >


        <div
          className="
            rounded-2xl
            border
            bg-white
            p-6
          "
        >

          <Users
            className="text-purple-700"
          />

          <h2
            className="
              mt-4
              text-3xl
              font-bold
            "
          >
            27
          </h2>


          <p
            className="
              text-sm
              text-slate-600
            "
          >
            Total Members
          </p>


        </div>





        <div
          className="
            rounded-2xl
            border
            bg-white
            p-6
          "
        >

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            22
          </h2>


          <p
            className="
              text-sm
              text-slate-600
            "
          >
            Active Members
          </p>


        </div>





        <div
          className="
            rounded-2xl
            border
            bg-white
            p-6
          "
        >

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            5
          </h2>


          <p
            className="
              text-sm
              text-slate-600
            "
          >
            Pending Invites
          </p>


        </div>



      </div>









      {/* Search */}

      <div
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          bg-white
          px-4
        "
      >

        <Search
          size={20}
          className="text-slate-400"
        />


        <input
          type="text"
          placeholder="Search team member..."
          className="
            w-full
            py-3
            outline-none
          "
        />


      </div>









      {/* Team Table */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          bg-white
        "
      >


        <div
          className="
            hidden
            grid-cols-5
            border-b
            bg-slate-50
            px-6
            py-4
            text-sm
            font-semibold
            text-slate-600
            md:grid
          "
        >

          <span>Name</span>
          <span>Role</span>
          <span>Department</span>
          <span>Status</span>
          <span>Action</span>

        </div>





        {
          members.map((member)=>(

            <div
              key={member.name}
              className="
                grid
                gap-4
                border-b
                px-6
                py-5
                md:grid-cols-5
                md:items-center
              "
            >


              <div>

                <h3
                  className="
                    font-semibold
                    text-slate-900
                  "
                >
                  {member.name}
                </h3>


              </div>



              <p
                className="
                  text-sm
                  text-slate-600
                "
              >
                {member.role}
              </p>



              <p
                className="
                  text-sm
                  text-slate-600
                "
              >
                {member.department}
              </p>





              <span
                className={`
                  w-fit
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  ${
                    member.status==="Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >

                {member.status}

              </span>





              <button
                className="
                  w-fit
                  rounded-lg
                  p-2
                  hover:bg-slate-100
                "
              >

                <MoreVertical size={18}/>

              </button>



            </div>


          ))
        }



      </div>



    </div>

  );
};


export default ManageTeam;