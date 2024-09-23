import React from "react";
import axios from "axios";
import { authenticate, isAuth } from "../Helpers/Helpers";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const Google = ({googleSignin}) => {

  return (
    <div className="col-sm-6 col-md-3 m-auto mt-3 p-0">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse)
          axios.post(`${process.env.REACT_APP_API_URL}/api/google-login`,{data:credentialResponse.credential})
          .then(response=>{
            console.log('GOOGLE SIGNIN SUCCESS',response)
            googleSignin(response)
          }).catch((error)=>{
            console.log('GOOGLE SIGNIN ERROR',error)
          })
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    
    </div>
  );
};

export default Google;
