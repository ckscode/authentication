import express from 'express';
import authRoutes from './Routes/auth.js';
import userRoutes from './Routes/user.js'
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import connectDB from './Database/Config.js';

dotenv.config();
connectDB()
const app = express();

//app middlewares
if(process.env.NODE_ENV === 'development'){
    app.use(cors({
        origin:['http://localhost:5173','https://ultimate-authentication.vercel.app']
    }))
}
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());





app.use('/api',authRoutes);
app.use('/api',userRoutes);

app.listen(process.env.PORT,()=>{
console.log('app is listening')
})