import express from "express";
import { read, update } from "../Controllers/userController.js";
import { adminMiddleware, requireSignin } from "../Controllers/authControllers.js";


const Router = express.Router();

Router.get('/user/:id',requireSignin, read);
Router.put('/user/update',requireSignin,update);
Router.put('/admin/update',requireSignin,adminMiddleware,update);


export default Router;