import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";


const ProtectedRoute = ({ children }) => {


  const {
    user,
    loading
  } = useAuth();



  // Auth check chal raha hai
  if(loading){

    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">
        Loading...
      </div>
    );

  }



  // User login nahi hai
  if(!user){

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }



  // User authenticated hai
  return children;


};


export default ProtectedRoute;