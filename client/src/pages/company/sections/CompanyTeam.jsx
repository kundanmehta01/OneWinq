import {  BadgeCheck } from "lucide-react";

const CompanyTeam = () => {
  const members = [
    {
      name: "Moinuddin Patel",
      role: "Founder & CEO",
      description: "Leading the vision, strategy and growth of OneWinq.",
    },

    {
      name: "Rahul Sharma",
      role: "Co-Founder",
      description: "Building products and managing company operations.",
    },

    {
      name: "Ayesha Khan",
      role: "Product Designer",
      description: "Creating meaningful user experiences and interfaces.",
    },

    {
      name: "David Smith",
      role: "Technology Lead",
      description: "Managing technology and engineering initiatives.",
    },
  ];

  return (
    <section
      className="
        bg-[#F8F8F6]
        py-16
        sm:py-20
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          sm:px-8
        "
      >
        {/* Heading */}

        <div
          className="
            max-w-3xl
          "
        >
          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.2em]
              text-purple-700
            "
          >
            Our Team
          </p>

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              text-slate-900
              sm:text-4xl
            "
          >
            People behind the company.
          </h2>

          <p
            className="
              mt-4
              text-base
              leading-7
              text-slate-600
              sm:text-lg
            "
          >
            Meet the team responsible for building the vision, products and
            future of the organization.
          </p>
        </div>

        {/* Team Cards */}

        <div
          className="
            mt-12
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {members.map((member) => (
            <div
              key={member.name}
              className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
            >
              {/* Profile */}

              <div
                className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-purple-100
                    text-2xl
                    font-bold
                    text-purple-700
                  "
              >
                {member.name.charAt(0)}
              </div>

              <div
                className="
                    mt-5
                    flex
                    items-center
                    gap-2
                  "
              >
                <h3
                  className="
                      text-lg
                      font-bold
                      text-slate-900
                    "
                >
                  {member.name}
                </h3>

                <BadgeCheck size={18} className="text-purple-700" />
              </div>

              <p
                className="
                    mt-1
                    text-sm
                    font-medium
                    text-purple-700
                  "
              >
                {member.role}
              </p>

              <p
                className="
                    mt-3
                    text-sm
                    leading-6
                    text-slate-600
                  "
              >
                {member.description}
              </p>

              <button
                className="
                    mt-5
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-slate-500
                    transition
                    hover:text-purple-700
                  "
              >
               
                Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyTeam;
