import { Building2, Globe, MapPin, Mail, User } from "lucide-react";

const EditCompany = () => {
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
          Edit Company
        </h1>

        <p
          className="
            mt-2
            text-slate-600
          "
        >
          Update your company information and profile details.
        </p>
      </div>

      {/* Form */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          sm:p-8
        "
      >
        <form
          className="
            space-y-6
          "
        >
          {/* Company Name */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Company Name
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
                px-4
              "
            >
              <Building2 size={18} className="text-slate-400" />

              <input
                type="text"
                placeholder="Enter company name"
                className="
                  w-full
                  py-3
                  outline-none
                  text-sm
                "
              />
            </div>
          </div>

          {/* Industry + Founder */}

          <div
            className="
              grid
              gap-6
              md:grid-cols-2
            "
          >
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Industry
              </label>

              <input
                type="text"
                placeholder="Technology"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                "
              />
            </div>

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Founder Name
              </label>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                "
              >
                <User size={18} className="text-slate-400" />

                <input
                  type="text"
                  placeholder="Founder name"
                  className="
                    w-full
                    py-3
                    outline-none
                    text-sm
                  "
                />
              </div>
            </div>
          </div>

          {/* Website + Email */}

          <div
            className="
              grid
              gap-6
              md:grid-cols-2
            "
          >
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Website
              </label>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                "
              >
                <Globe size={18} className="text-slate-400" />

                <input
                  type="text"
                  placeholder="https://company.com"
                  className="
                    w-full
                    py-3
                    outline-none
                    text-sm
                  "
                />
              </div>
            </div>

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Email
              </label>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                "
              >
                <Mail size={18} className="text-slate-400" />

                <input
                  type="email"
                  placeholder="company@email.com"
                  className="
                    w-full
                    py-3
                    outline-none
                    text-sm
                  "
                />
              </div>
            </div>
          </div>

          {/* Location */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Location
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
                px-4
              "
            >
              <MapPin size={18} className="text-slate-400" />

              <input
                type="text"
                placeholder="Indore, Madhya Pradesh"
                className="
                  w-full
                  py-3
                  outline-none
                  text-sm
                "
              />
            </div>
          </div>

          {/* About */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              About Company
            </label>

            <textarea
              rows="5"
              placeholder="Write about your company..."
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                text-sm
                outline-none
              "
            />
          </div>

          {/* Button */}

          <button
            type="submit"
            className="
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
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCompany;
