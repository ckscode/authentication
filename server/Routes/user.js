import express from "express";
import { order, orderValidate, read, update } from "../Controllers/userController.js";
import { adminMiddleware, requireSignin } from "../Controllers/authControllers.js";


const Router = express.Router();

Router.get('/user/:id',requireSignin, read);
Router.put('/user/update',requireSignin,update);
Router.put('/admin/update',requireSignin,adminMiddleware,update);
Router.post('/order',order);
Router.post('/order/validate',orderValidate)



export default Router;