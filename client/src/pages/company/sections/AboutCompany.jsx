import { Target, Rocket, Lightbulb } from "lucide-react";

const AboutCompany = () => {
  const cards = [
    {
      icon: Target,
      title: "Our Vision",
      description:
        "To create a world where every company and professional can build a meaningful digital identity.",
    },

    {
      icon: Rocket,
      title: "Our Mission",
      description:
        "We simplify the way businesses and individuals showcase their identity, work, and achievements.",
    },

    {
      icon: Lightbulb,
      title: "What We Build",
      description:
        "A powerful platform that connects companies, teams, and professionals through digital profiles.",
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
            About Company
          </p>

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              leading-tight
              text-slate-900
              sm:text-4xl
            "
          >
            Building a better way to present professional identities.
          </h2>

          <p
            className="
              mt-5
              text-base
              leading-7
              text-slate-600
              sm:text-lg
            "
          >
            OneWinq is designed to help organizations and professionals create a
            structured digital presence where their journey, achievements,
            products, and expertise come together.
          </p>
        </div>

        {/* Vision Cards */}

        <div
          className="
            mt-12
            grid
            gap-6
            md:grid-cols-3
          "
        >
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-md
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
                  <Icon size={23} />
                </div>

                <h3
                  className="
                      mt-5
                      text-xl
                      font-bold
                      text-slate-900
                    "
                >
                  {card.title}
                </h3>

                <p
                  className="
                      mt-3
                      text-sm
                      leading-6
                      text-slate-600
                    "
                >
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
