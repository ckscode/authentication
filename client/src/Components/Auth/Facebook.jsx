import React from "react";
import axios from "axios";
import { authenticate, isAuth } from "../Helpers/Helpers";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import './auth.css'
const Facebook = ({ facebookSignin }) => {
  // const responseFacebook = (response) => {
  //   console.log(response);
  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/api/facebook-login`, {
  //       userId: response.userID,
  //       accessToken: response.accessToken,
  //     })
  //     .then((response) => {
  //       console.log("FACEBOOK SIGNIN SUCCESS", response);
  //       facebookSignin(response);
  //     })
  //     .catch((error) => {
  //       console.log("FACEBOOK SIGNIN ERROR", error);
  //     });
  // };
  return (
    <div className="col-sm-6 col-md-3 m-auto  p-0">
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={(response) => {
          console.log(response);
          axios
            .post(`${process.env.REACT_APP_API_URL}/api/facebook-login`, {
              userId: response.userID,
              accessToken: response.accessToken,
            })
            .then((response) => {
              console.log("FACEBOOK SIGNIN SUCCESS", response);
              facebookSignin(response);
            })
            .catch((error) => {
              console.log("FACEBOOK SIGNIN ERROR", error);
            })}}
        render={(renderProps) => (
          <button className="my-facebook-button-class d-flex align-items-center"  onClick={renderProps.onClick}>
        <i style={{fontSize:'20px'}} className="fa-brands fa-facebook"></i>
         &nbsp;Facebook Login
          </button>
        )}
      />
     
    </div>
  );
};

export default Facebook;
