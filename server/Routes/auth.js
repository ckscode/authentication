import express from "express";
import { accountActivation, signin, signup } from "../Controllers/authControllers.js";
import { userSigninValidator, userSignupValidator } from "../Validators/auth.js";
import { runValidation } from "../Validators/index.js";

const Router = express.Router();

Router.post('/signup',userSignupValidator,runValidation,signup);
Router.post('/account-activation',accountActivation);
Router.post('/signin',userSigninValidator,runValidation,signin);

export default Router;