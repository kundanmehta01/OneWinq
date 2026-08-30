const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
}) => {

  return (
    <div className="space-y-2">

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>


      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full
          px-4
          py-3
          rounded-xl
          border
          outline-none
          focus:ring-2
          focus:ring-purple-500
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />


      {
        error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )
      }

    </div>
  );
};


export default Input;