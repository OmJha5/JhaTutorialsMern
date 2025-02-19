import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"  
import postRouter from "./routes/post.route.js"  
import connectDB from "./utils/db.js"

const app = express()
dotenv.config({})

app.use(express.urlencoded({extended : true}));
app.use(express.json());
const corsOptions = {
    origin : "http://localhost:5173",
    credentials : true
}

app.use(cors(corsOptions));
app.use(cookieParser());


// Api's
app.use("/api/user" , userRouter);
app.use("/api/post" , postRouter);

app.listen(process.env.PORT , () => {
    connectDB();
    console.log(`App is listening on port ${process.env.PORT}`);
})
