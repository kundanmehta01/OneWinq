import {
  Mail,
  Phone,
  Globe,
  Share2,
  MessageCircle,
} from "lucide-react";

const ContactConnect = () => {
  const socials = [
 

    {
      icon: Globe,
      name: "Website",
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
        <div
          className="
            rounded-3xl
            bg-white
            border
            border-slate-200
            p-8
            shadow-sm
            lg:p-12
          "
        >
          <div
            className="
              grid
              gap-10
              lg:grid-cols-2
              lg:items-center
            "
          >
            {/* Left */}

            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-purple-700
                "
              >
                Connect With Us
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
                Let's build something meaningful together.
              </h2>

              <p
                className="
                  mt-4
                  text-base
                  leading-7
                  text-slate-600
                "
              >
                Connect with our team for partnerships, collaborations and
                professional opportunities.
              </p>

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
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-purple-700
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    hover:bg-purple-800
                  "
                >
                  <MessageCircle size={18} />
                  Message
                </button>

                <button
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-slate-700
                    hover:bg-purple-50
                  "
                >
                  <Share2 size={18} />
                  Share Profile
                </button>
              </div>
            </div>

            {/* Right Contact Card */}

            <div
              className="
                rounded-2xl
                bg-[#F8F8F6]
                p-6
              "
            >
              <h3
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                Official Contact
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
                    text-sm
                    text-slate-600
                  "
                >
                  <Mail size={18} className="text-purple-700" />
                  contact@onewing.com
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    text-sm
                    text-slate-600
                  "
                >
                  <Phone size={18} className="text-purple-700" />
                  +91 9876543210
                </div>
              </div>

              {/* Social */}

              <div
                className="
                  mt-6
                  flex
                  gap-3
                "
              >
                {socials.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.name}
                      className="
                          flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-slate-600
                          hover:text-purple-700
                        "
                    >
                      <Icon size={16} />

                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactConnect;
