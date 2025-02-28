import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"  
import postRouter from "./routes/post.route.js"  
import connectDB from "./utils/db.js"

const app = express()
dotenv.config({})
let port = process.env.PORT || 4000

app.use(express.urlencoded({extended : true}));
app.use(express.json());
const corsOptions = {
    origin : "https://jhatutorialsmern-frontend.onrender.com",
    credentials : true
}

app.use(cors(corsOptions));
app.use(cookieParser());


// Api's
app.use("/api/user" , userRouter);
app.use("/api/post" , postRouter);

app.listen(port , () => {
    connectDB();
    console.log(`App is listening on port ${port}`);
})
