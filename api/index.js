// import serverless from "serverless-http";

// import dotenv from "dotenv";
// dotenv.config({
//     path: './.env'
// })
// import mongoose from 'mongoose'
// import { app } from '../src/app.js';
// import express from 'express'
// import { DB_NAME } from '../src/constants.js';
// import connectDB from '../src/db/dbConfig.js';
// import {v2 as cloudinary} from 'cloudinary'

// const PORT = process.env.PORT || 8080


// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// })

// connectDB()
// .then(()=>{
//     // app.listen(PORT, ()=>{
//     //     console.log(`Server listening at http://localhost:${PORT}`)
//     // })
//     console.log("Server working")
// })
// .catch((error)=> {
//     console.log("ERROR: ", error)
// })




// import serverless from "serverless-http";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { v2 as cloudinary } from "cloudinary";
// import { app } from "../src/app.js";
// import connectDB from "../src/db/dbConfig.js";

// // Load environment variables
// dotenv.config({ path: "./.env" });

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Ensure MongoDB connects once per container
// let isConnected = false;

// async function ensureDBConnection() {
//   if (isConnected && mongoose.connection.readyState === 1) return;

//   try {
//     const conn = await connectDB();
//     if (conn && conn.connection.readyState === 1) {
//       isConnected = true;
//       console.log("✅ MongoDB connected (serverless)");
//     }
//   } catch (err) {
//     console.error("❌ MongoDB connection failed:", err.message);
//   }
// }

// // Wrap the Express app with serverless
// const serverlessHandler = serverless(app);

// // Main exported handler for Vercel
// export async function handler(event, context) {
//   await ensureDBConnection();
//   return serverlessHandler(event, context);
// }






import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { app } from "../src/app.js"; // Import the Express app
import connectDB from "../src/db/dbConfig.js";

// Load environment variables (Vercel loads these automatically, but harmless to keep)
dotenv.config({ path: "./.env" });

// Cloudinary config (runs once during cold start)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Database Initialization ---
// Vercel Serverless Function instances persist between requests.
// We call connectDB() directly during the cold start.
connectDB()
    .then(() => {
        console.log("✅ MongoDB connected successfully during Serverless cold start.");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed during cold start:", err.message);
        // Important: If connection fails, the function may still crash.
        // Ensure environment variables are set on Vercel!
    });





/*
//const app = express()
;( async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", ()=>{
            console.log("ERROR: ", error)
            throw error
        }) 

        app.listen(PORT, ()=>{
            console.log(`Server listening at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
})()
*/

