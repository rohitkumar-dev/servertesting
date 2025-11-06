import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// routes import
import userRouter from './routes/userRoutes.js'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Server Running");
});

// routess
app.use("/api/v1/users", userRouter)


export { app };

