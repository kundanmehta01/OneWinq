import { X } from "lucide-react";

const AdminModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        px-4
      "
    >
      {/* Modal Box */}

      <div
        className="
          w-full
          max-w-lg
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-xl
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-100
            px-6
            py-4
          "
        >
          <h2
            className="
              text-lg
              font-bold
              text-slate-900
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}

        <div
          className="
            p-6
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
