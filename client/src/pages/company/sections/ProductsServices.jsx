import { Code2, Globe, Layers, Sparkles } from "lucide-react";

const ProductsServices = () => {
  const products = [
    {
      icon: Code2,
      title: "Digital Identity Platform",
      description:
        "Create professional company and individual profiles with a modern digital presence.",
    },

    {
      icon: Globe,
      title: "Company Profile Solutions",
      description:
        "Showcase your company, team, products, projects and achievements in one place.",
    },

    {
      icon: Layers,
      title: "Team Management",
      description:
        "Manage employees, roles and professional identities under one company profile.",
    },

    {
      icon: Sparkles,
      title: "Custom Digital Cards",
      description:
        "Create shareable professional cards for better networking and visibility.",
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
            Products & Services
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
            Solutions designed for modern professionals.
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
            Explore the products and services that help companies and
            individuals build a strong digital identity.
          </p>
        </div>

        {/* Cards */}

        <div
          className="
            mt-12
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {products.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                    group
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
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-purple-100
                      text-purple-700
                      transition
                      group-hover:bg-purple-700
                      group-hover:text-white
                    "
                >
                  <Icon size={22} />
                </div>

                <h3
                  className="
                      mt-5
                      text-lg
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsServices;
