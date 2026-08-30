import {
  useEffect,
  useState
} from "react";

import {
  getMe,
  logoutUser
} from "../services/authService";

import {
  AuthContext
} from "./AuthContext";


const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);



  const loadUser = async () => {

    try {

      const token = localStorage.getItem(
        "accessToken"
      );


      if (!token) {

        setLoading(false);
        return;

      }


      const response = await getMe();


      setUser(
        response.data.user
      );


    } catch (error) {

      console.log(
        "Load User Error:",
        error
      );


      localStorage.removeItem(
        "accessToken"
      );


      localStorage.removeItem(
        "refreshToken"
      );


    } finally {

      setLoading(false);

    }

  };




  useEffect(() => {

    const initializeAuth = async () => {

      await loadUser();

    };


    initializeAuth();


  }, []);




  // Login function added
  const login = (data) => {

    setUser(
      data.user
    );


    localStorage.setItem(
      "accessToken",
      data.tokens.accessToken
    );


    localStorage.setItem(
      "refreshToken",
      data.tokens.refreshToken
    );

  };




  const logout = async () => {

    try {


      const refreshToken =
        localStorage.getItem(
          "refreshToken"
        );


      await logoutUser({
        refreshToken
      });


    } catch (error) {

      console.log(error);

    } finally {


      localStorage.removeItem(
        "accessToken"
      );


      localStorage.removeItem(
        "refreshToken"
      );


      setUser(null);

    }

  };




  return (

    <AuthContext.Provider

      value={{

        user,

        setUser,

        loading,

        login,   // ✅ added

        logout,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};


export default AuthProvider;