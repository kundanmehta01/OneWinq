import { MoreHorizontal } from "lucide-react";

const TeamTable = () => {
  const members = [
    {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      department: "Engineering",
      status: "Active",
    },

    {
      name: "Ayesha Khan",
      role: "UI/UX Designer",
      department: "Design",
      status: "Active",
    },

    {
      name: "David Smith",
      role: "Project Manager",
      department: "Management",
      status: "Pending",
    },
  ];

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-100
          px-6
          py-5
        "
      >
        <div>
          <h3
            className="
              text-lg
              font-bold
              text-slate-900
            "
          >
            Team Members
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Manage your company team
          </p>
        </div>

        <button
          className="
            text-sm
            font-medium
            text-purple-700
            hover:underline
          "
        >
          View All
        </button>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table
          className="
            w-full
            min-w-[650px]
          "
        >
          <thead>
            <tr
              className="
                border-b
                border-slate-100
                text-left
                text-sm
                text-slate-400
              "
            >
              <th className="px-6 py-4 font-medium">Member</th>

              <th className="px-6 py-4 font-medium">Role</th>

              <th className="px-6 py-4 font-medium">Department</th>

              <th className="px-6 py-4 font-medium">Status</th>

              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr
                key={member.name}
                className="
                  border-b
                  border-slate-100
                  last:border-none
                  transition
                  hover:bg-slate-50
                "
              >
                <td className="px-6 py-4">
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
                        rounded-full
                        bg-purple-100
                        text-sm
                        font-bold
                        text-purple-700
                      "
                    >
                      {member.name.charAt(0)}
                    </div>

                    <span
                      className="
                        text-sm
                        font-medium
                        text-slate-800
                      "
                    >
                      {member.name}
                    </span>
                  </div>
                </td>

                <td
                  className="
                    px-6
                    py-4
                    text-sm
                    text-slate-600
                  "
                >
                  {member.role}
                </td>

                <td
                  className="
                    px-6
                    py-4
                    text-sm
                    text-slate-600
                  "
                >
                  {member.department}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium
                      ${
                        member.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }
                    `}
                  >
                    {member.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      text-slate-400
                      transition
                      hover:bg-purple-50
                      hover:text-purple-700
                    "
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTable;
