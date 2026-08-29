import { Image, Palette, Upload, Check } from "lucide-react";

const CompanyBranding = () => {
  const colors = ["Purple", "Blue", "Green", "Orange"];

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
          Company Branding
        </h1>

        <p
          className="
            mt-2
            text-slate-600
          "
        >
          Customize your company's visual identity.
        </p>
      </div>

      {/* Logo & Cover */}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        {/* Logo Upload */}

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
            Company Logo
          </h2>

          <div
            className="
              mt-5
              flex
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              border-slate-200
              p-8
            "
          >
            <div
              className="
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-2xl
                bg-purple-100
                text-purple-700
              "
            >
              <Image size={40} />
            </div>

            <button
              className="
                mt-5
                flex
                items-center
                gap-2
                rounded-xl
                bg-purple-700
                px-5
                py-3
                text-sm
                font-semibold
                text-white
              "
            >
              <Upload size={17} />
              Upload Logo
            </button>
          </div>
        </div>

        {/* Cover Image */}

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
            Cover Image
          </h2>

          <div
            className="
              mt-5
              flex
              h-48
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              border-slate-200
              bg-slate-50
            "
          >
            <button
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-purple-700
                px-5
                py-3
                text-sm
                font-semibold
                text-white
              "
            >
              <Upload size={17} />
              Upload Cover
            </button>
          </div>
        </div>
      </div>

      {/* Brand Colors */}

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
          <Palette className="text-purple-700" size={22} />

          <h2
            className="
              text-lg
              font-bold
              text-slate-900
            "
          >
            Brand Colors
          </h2>
        </div>

        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-4
          "
        >
          {colors.map((color, index) => (
            <button
              key={color}
              className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-slate-700
                  hover:border-purple-700
                "
            >
              {index === 0 && <Check size={16} className="text-purple-700" />}

              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}

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
          Profile Preview
        </h2>

        <div
          className="
            mt-5
            rounded-2xl
            bg-[#F8F8F6]
            p-6
          "
        >
          <h3
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >
            OneWing Technologies
          </h3>

          <p
            className="
              mt-2
              text-slate-600
            "
          >
            Technology company building digital identity solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyBranding;
