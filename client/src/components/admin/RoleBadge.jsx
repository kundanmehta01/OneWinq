const RoleBadge = ({ role }) => {


  const roleStyles = {
    Founder:
      "bg-purple-50 text-purple-700 border-purple-100",

    CEO:
      "bg-indigo-50 text-indigo-700 border-indigo-100",

    Admin:
      "bg-blue-50 text-blue-700 border-blue-100",

    Manager:
      "bg-green-50 text-green-700 border-green-100",

    Developer:
      "bg-orange-50 text-orange-700 border-orange-100",

    Designer:
      "bg-pink-50 text-pink-700 border-pink-100",
  };



  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-semibold
        ${
          roleStyles[role] ||
          "bg-slate-50 text-slate-600 border-slate-100"
        }
      `}
    >
      {role}
    </span>
  );
};


export default RoleBadge;