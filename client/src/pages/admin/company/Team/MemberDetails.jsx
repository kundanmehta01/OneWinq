import {
  Mail,
  Building2,
  CalendarDays,
  ShieldCheck,
  Activity,
  UserRound,
} from "lucide-react";

const MemberDetails = () => {
  const activities = [
    "Updated company profile",
    "Added new project",
    "Changed profile information",
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
          Member Details
        </h1>

        <p
          className="
            mt-2
            text-slate-600
          "
        >
          View complete information about team member.
        </p>
      </div>

      {/* Profile Card */}

      <div
        className="
          rounded-2xl
          border
          bg-white
          p-6
          shadow-sm
        "
      >
        <div
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
          "
        >
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-purple-100
              text-purple-700
            "
          >
            <UserRound size={40} />
          </div>

          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-slate-900
              "
            >
              Rahul Sharma
            </h2>

            <p
              className="
                text-slate-600
              "
            >
              Frontend Developer
            </p>

            <span
              className="
                mt-3
                inline-block
                rounded-full
                bg-green-100
                px-3
                py-1
                text-xs
                font-medium
                text-green-700
              "
            >
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Information */}

      <div
        className="
          grid
          gap-5
          md:grid-cols-2
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
          <h3
            className="
              text-lg
              font-bold
            "
          >
            Basic Information
          </h3>

          <div
            className="
              mt-5
              space-y-4
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <Mail size={18} className="text-purple-700" />

              <span>rahul@gmail.com</span>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <Building2 size={18} className="text-purple-700" />

              <span>Engineering Department</span>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <CalendarDays size={18} className="text-purple-700" />

              <span>Joined : Jan 2026</span>
            </div>
          </div>
        </div>

        {/* Permission */}

        <div
          className="
            rounded-2xl
            border
            bg-white
            p-6
          "
        >
          <h3
            className="
              text-lg
              font-bold
            "
          >
            Access Information
          </h3>

          <div
            className="
              mt-5
              space-y-4
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <ShieldCheck size={18} className="text-purple-700" />

              <span>Permission : Member</span>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <Activity size={18} className="text-purple-700" />

              <span>Last Active : Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity */}

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
            text-lg
            font-bold
          "
        >
          Recent Activity
        </h2>

        <div
          className="
            mt-5
            space-y-3
          "
        >
          {activities.map((item, index) => (
            <div
              key={index}
              className="
                  rounded-xl
                  bg-[#F8F8F6]
                  p-4
                  text-sm
                  text-slate-700
                "
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
