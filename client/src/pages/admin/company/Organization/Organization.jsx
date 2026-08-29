import { Building2, Users, Layers, UserRoundCog } from "lucide-react";

const Organization = () => {
  const departments = [
    {
      name: "Engineering",
      members: 12,
    },

    {
      name: "Design",
      members: 5,
    },

    {
      name: "Marketing",
      members: 7,
    },

    {
      name: "HR",
      members: 3,
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
          Organization
        </h1>

        <p
          className="
            mt-2
            text-slate-600
          "
        >
          Manage company hierarchy, departments and teams.
        </p>
      </div>

      {/* Organization Overview */}

      <div
        className="
          grid
          gap-5
          md:grid-cols-3
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
          "
        >
          <Building2 className="text-purple-700" />

          <h3
            className="
              mt-4
              text-xl
              font-bold
            "
          >
            Company
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-slate-600
            "
          >
            OneWing Technologies
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
          "
        >
          <Users className="text-purple-700" />

          <h3
            className="
              mt-4
              text-xl
              font-bold
            "
          >
            Employees
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-slate-600
            "
          >
            27 Members
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
          "
        >
          <Layers className="text-purple-700" />

          <h3
            className="
              mt-4
              text-xl
              font-bold
            "
          >
            Departments
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-slate-600
            "
          >
            4 Active Departments
          </p>
        </div>
      </div>

      {/* Departments */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <UserRoundCog className="text-purple-700" />

          <h2
            className="
              text-xl
              font-bold
              text-slate-900
            "
          >
            Departments
          </h2>
        </div>

        <div
          className="
            mt-6
            grid
            gap-4
            sm:grid-cols-2
          "
        >
          {departments.map((dept) => (
            <div
              key={dept.name}
              className="
                  rounded-xl
                  bg-[#F8F8F6]
                  p-5
                "
            >
              <h3
                className="
                    font-bold
                    text-slate-900
                  "
              >
                {dept.name}
              </h3>

              <p
                className="
                    mt-2
                    text-sm
                    text-slate-600
                  "
              >
                {dept.members} Members
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Organization;
