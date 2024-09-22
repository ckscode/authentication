import React from "react";
import axios from "axios";
import { authenticate, isAuth } from "../Helpers/Helpers";
import FacebookLogin from 'react-facebook-login';

const Facebook = ({facebookSignin}) => {
    const responseFacebook = (response) => {
        console.log(response);
        axios.post(`${process.env.REACT_APP_API_URL}/api/facebook-login`,{userId:response.userId,accessToken:response.accessToken
        })
        .then(response=>{
          console.log('FACEBOOK SIGNIN SUCCESS',response)
          facebookSignin(response)
        }).catch((error)=>{
          console.log('FACEBOOK SIGNIN ERROR',error)
        })
      }
  return (
    <div className="col-sm-6 col-md-3 m-auto mt-3 p-0">
          <FacebookLogin
    appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
    autoLoad={false}
    callback={responseFacebook}
    render={renderProps => (
      <button onClick={renderProps.onClick}>This is my custom FB button</button>
    )}
  />
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          axios.post(`${process.env.REACT_APP_API_URL}/api/google-login`,{data:credentialResponse.credential})
          .then(response=>{
            console.log('GOOGLE SIGNIN SUCCESS',response)
            googleSignin(response)
          }).catch((error)=>{
            console.log('GOOGLE SIGNIN SUCCESS',error)
          })
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      /> */}
    </div>
  );
};

export default Facebook;