import  express, { json } from "express";
// import mongoose from "mongoose";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js";
// import {connectDB} from "./data/db.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

//ALL THE MIDDLEWARE WILL BE USED IN THIS FOLDER
export const app = express();

config({
    path:"./data/config.env"
})

//To send json data from postman to db its give an error
// so we use(Middlewar
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true, 
  })
);

//Using Routes
app.use("/api/v1/user",userRouter);
app.use("/api/v1/task", taskRouter);


// app.use((err,req,res,next)=>{// ye yaha accha nahi lag raha so we'll create a file
//                             // error.js in middleware
//     // console.log(err.message)

//     return res.status(404).json({
//       success: false,
//       message: err.message,
//     });
// })

//we will use this as midddleware errorMiddleware
app.use(errorMiddleware)


