import { Award, Trophy, Rocket, TrendingUp } from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      icon: Rocket,
      title: "Platform Launch",
      year: "2026",
      description:
        "Successfully launched OneWinq platform to help professionals and companies build digital identities.",
    },

    {
      icon: Trophy,
      title: "Innovation Recognition",
      year: "2026",
      description:
        "Recognized for building modern solutions in professional identity management.",
    },

    {
      icon: Award,
      title: "Growing Community",
      year: "2026",
      description:
        "Building a network of professionals, founders and organizations.",
    },

    {
      icon: TrendingUp,
      title: "Business Growth",
      year: "2026",
      description:
        "Expanding platform capabilities with new features and services.",
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
            Achievements
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
            Milestones that define our journey.
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
            Every milestone represents our commitment towards innovation, growth
            and creating meaningful impact.
          </p>
        </div>

        {/* Achievement Cards */}

        <div
          className="
            mt-12
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {achievements.map((item) => {
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
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
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
                      bg-purple-100
                      text-purple-700
                    "
                >
                  <Icon size={23} />
                </div>

                <div
                  className="
                      mt-5
                      flex
                      items-center
                      justify-between
                    "
                >
                  <h3
                    className="
                        text-lg
                        font-bold
                        text-slate-900
                      "
                  >
                    {item.title}
                  </h3>

                  <span
                    className="
                        rounded-full
                        bg-purple-50
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-purple-700
                      "
                  >
                    {item.year}
                  </span>
                </div>

                <p
                  className="
                      mt-3
                      text-sm
                      leading-6
                      text-slate-600
                    "
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
