import express from "express";
import { accountActivation, facebookLogin, forgotPassword, googleLogin, resetPassword, signin, signup } from "../Controllers/authControllers.js";
import { userSigninValidator, userSignupValidator,forgotPasswordValidator,resetPasswordValidator } from "../Validators/auth.js";
import { runValidation } from "../Validators/index.js";

const Router = express.Router();

Router.post('/signup',userSignupValidator,runValidation,signup);
Router.post('/account-activation',accountActivation);
Router.post('/signin',userSigninValidator,runValidation,signin);

//forgot reset password
Router.put('/forgot-password',forgotPasswordValidator,runValidation,forgotPassword);
Router.put('/reset-password',resetPasswordValidator,runValidation,resetPassword);

//google and facebook
Router.post('/google-login',googleLogin)
Router.post('/facebook-login',facebookLogin)

export default Router;