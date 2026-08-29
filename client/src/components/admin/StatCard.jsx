import { ArrowUpRight } from "lucide-react";


const StatCard = ({
  title,
  value,
  icon: Icon,
  bgColor = "bg-purple-50",
  iconColor = "text-purple-700",
  description,
}) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      "
    >

      {/* Top */}

      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            ${bgColor}
            ${iconColor}
          `}
        >

          {Icon && <Icon size={22} />}

        </div>



        <button
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-slate-400
            transition
            hover:bg-purple-50
            hover:text-purple-700
          "
        >

          <ArrowUpRight size={17}/>

        </button>


      </div>



      {/* Content */}

      <div className="mt-5">

        <p
          className="
            text-sm
            font-medium
            text-slate-500
          "
        >
          {title}
        </p>


        <h2
          className="
            mt-2
            text-3xl
            font-bold
            text-slate-900
          "
        >
          {value}
        </h2>


        {
          description && (
            <p
              className="
                mt-2
                text-xs
                text-slate-400
              "
            >
              {description}
            </p>
          )
        }


      </div>


    </div>
  );
};


export default StatCard;