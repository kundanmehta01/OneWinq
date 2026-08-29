import { Megaphone, CalendarDays, ArrowRight } from "lucide-react";

const MediaUpdates = () => {
  const updates = [
    {
      title: "OneWinq Platform Launch",
      date: "August 2026",
      description:
        "We launched our platform to help companies and professionals create powerful digital identities.",
    },

    {
      title: "New Team Management Feature",
      date: "July 2026",
      description:
        "Companies can now manage team members, roles and professional profiles easily.",
    },

    {
      title: "Expanding Digital Identity Solutions",
      date: "June 2026",
      description:
        "Introducing new features focused on better networking and professional growth.",
    },
  ];

  return (
    <section
      className="
        bg-white
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
            Updates & News
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
            Latest company updates.
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
            Stay connected with our latest launches, announcements and company
            milestones.
          </p>
        </div>

        {/* Update Cards */}

        <div
          className="
            mt-12
            grid
            gap-6
            lg:grid-cols-3
          "
        >
          {updates.map((item) => (
            <div
              key={item.title}
              className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-[#F8F8F6]
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
                    items-center
                    justify-between
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
                      bg-purple-100
                      text-purple-700
                    "
                >
                  <Megaphone size={22} />
                </div>

                <div
                  className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-medium
                      text-slate-500
                    "
                >
                  <CalendarDays size={15} />

                  {item.date}
                </div>
              </div>

              <h3
                className="
                    mt-5
                    text-xl
                    font-bold
                    text-slate-900
                  "
              >
                {item.title}
              </h3>

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

              <button
                className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-purple-700
                  "
              >
                Read More
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaUpdates;
