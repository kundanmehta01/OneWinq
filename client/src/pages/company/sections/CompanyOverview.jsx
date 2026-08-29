import { BadgeCheck, Building2, Share2, ArrowRight } from "lucide-react";

const CompanyOverview = () => {
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
        <div
          className="
            grid
            items-center
            gap-10
            lg:grid-cols-2
          "
        >
          {/* Left Content */}

          <div>
            {/* Company Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-purple-100
                bg-purple-50
                px-4
                py-2
                text-sm
                font-medium
                text-purple-700
              "
            >
              <BadgeCheck size={18} />
              Verified Company
            </div>

            <h1
              className="
                mt-5
                text-4xl
                font-bold
                leading-tight
                text-slate-900
                sm:text-5xl
              "
            >
              OneWinq Pvt Ltd
            </h1>

            <p
              className="
                mt-4
                text-lg
                font-medium
                text-purple-700
              "
            >
              Building professional digital identities.
            </p>

            <p
              className="
                mt-5
                max-w-xl
                text-base
                leading-7
                text-slate-600
              "
            >
              OneWinq helps companies and professionals create, manage and share
              their digital identity in a modern way.
            </p>

            {/* Details */}

            <div
              className="
                mt-8
                space-y-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-slate-600
                "
              >
                <Building2 size={20} className="text-purple-700" />
                Technology & Digital Solutions
              </div>

              <div
                className="
                  text-sm
                  text-slate-600
                "
              >
                Founder:
                <span
                  className="
                    ml-2
                    font-semibold
                    text-slate-900
                  "
                >
                  Moinuddin Patel
                </span>
              </div>
            </div>

            {/* Buttons */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-4
              "
            >
              <button
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-purple-700
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-purple-800
                "
              >
                Connect
                <ArrowRight size={17} />
              </button>

              <button
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-slate-700
                  transition
                  hover:border-purple-300
                  hover:bg-purple-50
                "
              >
                <Share2 size={17} />
                Share
              </button>
            </div>
          </div>

          {/* Right Logo Card */}

          <div
            className="
              flex
              justify-center
            "
          >
            <div
              className="
                relative
                flex
                h-72
                w-72
                items-center
                justify-center
                rounded-3xl
                bg-gradient-to-br
                from-purple-100
                via-white
                to-indigo-100
                shadow-sm
                sm:h-96
                sm:w-96
              "
            >
              <div
                className="
                  flex
                  h-40
                  w-40
                  items-center
                  justify-center
                  rounded-3xl
                  bg-white
                  text-5xl
                  font-bold
                  text-purple-700
                  shadow-md
                "
              >
                O
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
