import { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";

import { getMe } from "../services/authService";



const AuthProvider = ({children})=>{


const [user,setUser] = useState(null);

const [loading,setLoading] = useState(true);





const loadUser = async()=>{


try{


const token = localStorage.getItem(
"accessToken"
);



if(!token){

setLoading(false);
return;

}



const response = await getMe();



setUser(
response.user
);



}
catch(error){


console.log(
"Auth Error",
error
);


localStorage.removeItem(
"accessToken"
);


localStorage.removeItem(
"refreshToken"
);



setUser(null);


}
finally{


setLoading(false);


}


};





useEffect(() => {

  const initializeAuth = async () => {

    await loadUser();

  };


  initializeAuth();


}, []);





return(

<AuthContext.Provider

value={{

user,

setUser,

loading

}}

>


{children}


</AuthContext.Provider>


);


};



export default AuthProvider;