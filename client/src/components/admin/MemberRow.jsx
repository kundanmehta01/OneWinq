import { MoreHorizontal } from "lucide-react";


const MemberRow = ({ member }) => {
  return (
    <tr
      className="
        border-b
        border-slate-100
        last:border-none
        transition
        hover:bg-slate-50
      "
    >

      {/* Member */}

      <td className="px-6 py-4">

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-purple-100
              text-sm
              font-bold
              text-purple-700
            "
          >
            {member.name.charAt(0)}
          </div>


          <div>

            <p
              className="
                text-sm
                font-semibold
                text-slate-800
              "
            >
              {member.name}
            </p>

            <p
              className="
                text-xs
                text-slate-400
              "
            >
              {member.email}
            </p>

          </div>

        </div>

      </td>




      {/* Role */}

      <td
        className="
          px-6
          py-4
          text-sm
          text-slate-600
        "
      >
        {member.role}
      </td>




      {/* Department */}

      <td
        className="
          px-6
          py-4
          text-sm
          text-slate-600
        "
      >
        {member.department}
      </td>




      {/* Status */}

      <td className="px-6 py-4">

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-medium
            ${
              member.status === "Active"
                ? "bg-green-50 text-green-700"
                : "bg-yellow-50 text-yellow-700"
            }
          `}
        >

          {member.status}

        </span>

      </td>




      {/* Action */}

      <td className="px-6 py-4">

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

          <MoreHorizontal size={18}/>

        </button>

      </td>


    </tr>
  );
};


export default MemberRow;