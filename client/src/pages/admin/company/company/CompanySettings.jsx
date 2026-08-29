import { ShieldCheck, Bell, Eye, Users, Trash2 } from "lucide-react";

const CompanySettings = () => {
  const settings = [
    {
      title: "Profile Visibility",
      description: "Control who can view your company profile.",
      icon: Eye,
      enabled: true,
    },

    {
      title: "Email Notifications",
      description: "Receive updates about company activities.",
      icon: Bell,
      enabled: true,
    },

    {
      title: "Member Approval",
      description: "Approve new team members before joining.",
      icon: Users,
      enabled: false,
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
          Company Settings
        </h1>

        <p
          className="
            mt-2
            text-slate-600
          "
        >
          Manage company preferences and security settings.
        </p>
      </div>

      {/* Settings */}

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
          General Settings
        </h2>

        <div
          className="
            mt-6
            space-y-5
          "
        >
          {settings.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-slate-100
                    p-4
                  "
              >
                <div
                  className="
                      flex
                      items-center
                      gap-4
                    "
                >
                  <div
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-purple-50
                        text-purple-700
                      "
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3
                      className="
                          font-semibold
                          text-slate-900
                        "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                          text-sm
                          text-slate-600
                        "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Toggle */}

                <button
                  className={`
                      h-7
                      w-12
                      rounded-full
                      p-1
                      ${item.enabled ? "bg-purple-700" : "bg-slate-300"}
                    `}
                >
                  <span
                    className={`
                        block
                        h-5
                        w-5
                        rounded-full
                        bg-white
                        transition
                        ${item.enabled ? "translate-x-5" : ""}
                      `}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security */}

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
          <ShieldCheck className="text-purple-700" size={22} />

          <h2
            className="
              text-lg
              font-bold
              text-slate-900
            "
          >
            Security
          </h2>
        </div>

        <p
          className="
            mt-3
            text-sm
            text-slate-600
          "
        >
          Manage admin access and company security.
        </p>

        <button
          className="
            mt-5
            rounded-xl
            border
            border-red-200
            px-5
            py-3
            text-sm
            font-semibold
            text-red-600
          "
        >
          <Trash2 size={16} className="inline mr-2" />
          Deactivate Company
        </button>
      </div>
    </div>
  );
};

export default CompanySettings;
