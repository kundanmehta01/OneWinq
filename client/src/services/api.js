import axios from "axios";


const api = axios.create({

  baseURL: "http://localhost:5000/api/v1",

  headers: {
    "Content-Type": "application/json",
  },

});



// Attach Access Token

api.interceptors.request.use(

  (config)=>{


    const token = localStorage.getItem(
      "accessToken"
    );


    if(token){

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;


  },


  (error)=>{

    return Promise.reject(error);

  }

);





// Refresh Token Handling

api.interceptors.response.use(

  (response)=>response,


  async(error)=>{


    const originalRequest = error.config;



    if(

      error.response?.status === 401 &&

      !originalRequest._retry

    ){


      originalRequest._retry = true;



      try{


        const refreshToken =
          localStorage.getItem(
            "refreshToken"
          );



        const response = await axios.post(

          "http://localhost:5000/api/v1/auth/refresh",

          {
            refreshToken
          }

        );



        const {

          accessToken,

          refreshToken:newRefreshToken


        } = response.data.data;





        localStorage.setItem(

          "accessToken",

          accessToken

        );



        localStorage.setItem(

          "refreshToken",

          newRefreshToken

        );





        originalRequest.headers.Authorization =

          `Bearer ${accessToken}`;





        return api(originalRequest);



      }

      catch(refreshError){


        localStorage.removeItem(
          "accessToken"
        );


        localStorage.removeItem(
          "refreshToken"
        );


        window.location.href="/login";


        return Promise.reject(refreshError);


      }

    }



    return Promise.reject(error);


  }

);



export default api;