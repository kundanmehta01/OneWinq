import { Mail, Clock, CheckCircle, XCircle, RefreshCcw } from "lucide-react";

const Invitations = () => {
  const invitations = [
    {
      name: "Aman Verma",
      email: "aman@gmail.com",
      role: "Designer",
      status: "Pending",
    },

    {
      name: "Priya Singh",
      email: "priya@gmail.com",
      role: "Marketing Manager",
      status: "Accepted",
    },

    {
      name: "Rohit Kumar",
      email: "rohit@gmail.com",
      role: "Developer",
      status: "Expired",
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
          Invitations
        </h1>

        <p
          className="
            mt-2
            text-slate-600
          "
        >
          Manage team invitations and invite status.
        </p>
      </div>

      {/* Invite Button */}

      <button
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-purple-700
          px-5
          py-3
          font-semibold
          text-white
        "
      >
        <Mail size={18} />
        Send New Invitation
      </button>

      {/* Invitation Cards */}

      <div
        className="
          space-y-4
        "
      >
        {invitations.map((invite) => (
          <div
            key={invite.email}
            className="
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                bg-white
                p-5
                shadow-sm
                md:flex-row
                md:items-center
                md:justify-between
              "
          >
            {/* User */}

            <div>
              <h3
                className="
                    font-bold
                    text-slate-900
                  "
              >
                {invite.name}
              </h3>

              <p
                className="
                    text-sm
                    text-slate-600
                  "
              >
                {invite.email}
              </p>

              <p
                className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
              >
                Role: {invite.role}
              </p>
            </div>

            {/* Status */}

            <div
              className="
                  flex
                  items-center
                  gap-3
                "
            >
              {invite.status === "Pending" && (
                <Clock size={18} className="text-yellow-600" />
              )}

              {invite.status === "Accepted" && (
                <CheckCircle size={18} className="text-green-600" />
              )}

              {invite.status === "Expired" && (
                <XCircle size={18} className="text-red-600" />
              )}

              <span
                className="
                    text-sm
                    font-medium
                  "
              >
                {invite.status}
              </span>
            </div>

            {/* Actions */}

            <div
              className="
                  flex
                  gap-3
                "
            >
              {invite.status === "Pending" && (
                <button
                  className="
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        px-4
                        py-2
                        text-sm
                        font-medium
                      "
                >
                  <RefreshCcw size={15} />
                  Resend
                </button>
              )}

              <button
                className="
                    rounded-lg
                    border
                    border-red-200
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-red-600
                  "
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invitations;
