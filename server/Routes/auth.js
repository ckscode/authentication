import express from "express";
import { signup } from "../Controllers/authControllers.js";
import { userSignupValidator } from "../Validators/auth.js";
import { runValidation } from "../Validators/index.js";

const Router = express.Router();

Router.post('/signup',userSignupValidator,runValidation,signup)

export default Router;