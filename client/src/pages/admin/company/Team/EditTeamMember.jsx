import { UserCog, Mail, Building2, ShieldCheck, Save } from "lucide-react";

const EditTeamMember = () => {
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
          Edit Team Member
        </h1>

        <p
          className="
            mt-2
            text-slate-600
          "
        >
          Update member information and permissions.
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
              <UserCog size={18} className="text-slate-400" />

              <input
                type="text"
                defaultValue="Rahul Sharma"
                className="
                  w-full
                  py-3
                  outline-none
                "
              />
            </div>
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
              Email
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
                defaultValue="rahul@gmail.com"
                className="
                  w-full
                  py-3
                  outline-none
                "
              />
            </div>
          </div>

          {/* Role and Department */}

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
                <option>Frontend Developer</option>

                <option>Backend Developer</option>

                <option>Manager</option>

                <option>Admin</option>
              </select>
            </div>

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
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
              "
            >
              Permission
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

          {/* Status */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >
              Status
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
              <option>Active</option>

              <option>Pending</option>

              <option>Disabled</option>
            </select>
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
            <Save size={18} />
            Update Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTeamMember;
