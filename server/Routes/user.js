import express from "express";
import { read } from "../Controllers/userController.js";


const Router = express.Router();

Router.get('/user/:id',read);


export default Router;