import {
  Users,
  Package,
  FolderKanban,
  Eye,
  Clock,
  ArrowUpRight,
  Building2,
} from "lucide-react";

const AdminOverview = () => {
  const stats = [
    {
      title: "Team Members",
      value: "24",
      icon: Users,
      growth: "+12%",
    },

    {
      title: "Products",
      value: "18",
      icon: Package,
      growth: "+5%",
    },

    {
      title: "Projects",
      value: "32",
      icon: FolderKanban,
      growth: "+18%",
    },

    {
      title: "Profile Views",
      value: "12.5K",
      icon: Eye,
      growth: "+24%",
    },
  ];

  const activities = [
    {
      title: "New team member added",
      time: "2 hours ago",
    },

    {
      title: "Company profile updated",
      time: "Yesterday",
    },

    {
      title: "New project published",
      time: "3 days ago",
    },

    {
      title: "New product added",
      time: "1 week ago",
    },
  ];

  return (
    <div className="space-y-8">
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
            Welcome back, Admin 👋
          </h1>

          <p
            className="
              mt-2
              text-slate-600
            "
          >
            Manage your company profile and digital presence.
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
            hover:bg-purple-800
          "
        >
          View Profile
          <ArrowUpRight size={17} />
        </button>
      </div>

      {/* Company Card */}

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
            gap-5
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-purple-100
              text-purple-700
            "
          >
            <Building2 size={32} />
          </div>

          <div>
            <h2
              className="
                text-xl
                font-bold
                text-slate-900
              "
            >
              OneWing Technologies
            </h2>

            <p
              className="
                text-sm
                text-slate-600
              "
            >
              Technology • Software Company
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
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
                    justify-between
                  "
              >
                <div
                  className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-purple-50
                      text-purple-700
                    "
                >
                  <Icon size={22} />
                </div>

                <span
                  className="
                      text-sm
                      font-semibold
                      text-green-600
                    "
                >
                  {item.growth}
                </span>
              </div>

              <h3
                className="
                    mt-5
                    text-3xl
                    font-bold
                    text-slate-900
                  "
              >
                {item.value}
              </h3>

              <p
                className="
                    mt-1
                    text-sm
                    text-slate-600
                  "
              >
                {item.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        {/* Profile Completion */}

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
          <h2
            className="
              text-lg
              font-bold
              text-slate-900
            "
          >
            Profile Completion
          </h2>

          <div
            className="
              mt-5
              h-3
              overflow-hidden
              rounded-full
              bg-slate-100
            "
          >
            <div
              className="
                h-full
                w-[85%]
                rounded-full
                bg-purple-700
              "
            />
          </div>

          <p
            className="
              mt-3
              text-sm
              text-slate-600
            "
          >
            Your company profile is 85% completed.
          </p>
        </div>

        {/* Recent Activity */}

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
          <h2
            className="
              text-lg
              font-bold
              text-slate-900
            "
          >
            Recent Activity
          </h2>

          <div
            className="
              mt-5
              space-y-4
            "
          >
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="
                    flex
                    items-center
                    gap-4
                    rounded-xl
                    bg-slate-50
                    p-4
                  "
              >
                <div
                  className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-white
                      text-purple-700
                    "
                >
                  <Clock size={18} />
                </div>

                <div>
                  <p
                    className="
                        text-sm
                        font-medium
                        text-slate-900
                      "
                  >
                    {activity.title}
                  </p>

                  <p
                    className="
                        text-xs
                        text-slate-500
                      "
                  >
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
