const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) => {

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        py-3
        rounded-xl
        bg-purple-600
        text-white
        font-semibold
        hover:bg-purple-700
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;