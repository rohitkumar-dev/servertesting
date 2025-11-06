// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// // routes import
// import userRouter from './routes/userRoutes.js'

// const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))
// app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())

// app.get("/", (req, res) => {
//   res.send("Server Running");
// });

// // routess
// app.use("/api/v1/users", userRouter)


// export { app };


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
    // This route will now run when you visit your domain's root.
    res.send("Server Running"); 
});

// routess
app.use("/api/v1/users", userRouter)

// Must remain as a named export for other files to import it
export { app };