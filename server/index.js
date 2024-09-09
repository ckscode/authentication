import express from 'express';
import authRoutes from './Routes/auth.js';
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
app.use(morgan('dev'));
app.use(bodyParser.json())

if(process.env.NODE_ENV === 'production'){
    app.use(cors({
        origin:'http://localhost:3000'
    }))
}



app.use('/api',authRoutes);

app.listen(process.env.PORT,()=>{
console.log('app is listening')
})