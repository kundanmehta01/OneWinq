const ErrorMessage = ({
  message
}) => {

  if(!message) return null;


  return (
    <div
      className="
        bg-red-50
        text-red-600
        px-4
        py-3
        rounded-lg
        text-sm
      "
    >
      {message}
    </div>
  );
};


export default ErrorMessage;