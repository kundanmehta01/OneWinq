import { UserPlus, Mail, Building2, ShieldCheck } from "lucide-react";

const AddTeamMember = () => {
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
          Add Team Member
        </h1>

        <p
          className="
            mt-2
            text-slate-600
          "
        >
          Invite a new member to your company team.
        </p>
      </div>

      {/* Form */}

      <div
        className="
          rounded-2xl
          border
          bg-white
          p-6
          shadow-sm
          sm:p-8
        "
      >
        <form
          className="
            space-y-6
          "
        >
          {/* Name */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter member name"
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                outline-none
              "
            />
          </div>

          {/* Email */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Email Address
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                px-4
              "
            >
              <Mail size={18} className="text-slate-400" />

              <input
                type="email"
                placeholder="member@email.com"
                className="
                  w-full
                  py-3
                  outline-none
                "
              />
            </div>
          </div>

          {/* Role + Department */}

          <div
            className="
              grid
              gap-6
              md:grid-cols-2
            "
          >
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Role
              </label>

              <select
                className="
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                  outline-none
                "
              >
                <option>Select Role</option>

                <option>Admin</option>

                <option>Developer</option>

                <option>Designer</option>

                <option>Manager</option>
              </select>
            </div>

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Department
              </label>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  px-4
                "
              >
                <Building2 size={18} className="text-slate-400" />

                <select
                  className="
                    w-full
                    py-3
                    outline-none
                  "
                >
                  <option>Engineering</option>

                  <option>Design</option>

                  <option>Marketing</option>

                  <option>HR</option>
                </select>
              </div>
            </div>
          </div>

          {/* Permission */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Permission Level
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                px-4
              "
            >
              <ShieldCheck size={18} className="text-purple-700" />

              <select
                className="
                  w-full
                  py-3
                  outline-none
                "
              >
                <option>Member</option>

                <option>Manager</option>

                <option>Admin</option>
              </select>
            </div>
          </div>

          {/* Button */}

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
            <UserPlus size={18} />
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeamMember;
