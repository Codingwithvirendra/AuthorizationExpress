import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserRouter from "./routers/signup.route.js";
import session from 'express-session';
dotenv.config();
const app = express();

app.use(session({
    secret:"secret@123",
    resave:false,
    saveUninitialized:false
}))
mongoose.connect(process.env.MONG_URL).then(()=>{
    console.log('MongoDB ConnectedSuccessfully!')
})

const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || 3000;
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.set('view engine','ejs')


app.use('/',UserRouter)

app.listen(port,hostname,()=>{
    console.log(`Server has been Running at http://${hostname}:${port}/`)
})