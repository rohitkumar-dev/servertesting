import serverless from "serverless-http";


import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})
import mongoose from 'mongoose'
import { app } from '../src/app.js';
import express from 'express'
import { DB_NAME } from '../src/constants.js';
import connectDB from '../src/db/dbConfig.js';
import {v2 as cloudinary} from 'cloudinary'



const PORT = process.env.PORT || 8080


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
})


connectDB()
.then(()=>{
    // app.listen(PORT, ()=>{
    //     console.log(`Server listening at http://localhost:${PORT}`)
    // })
    console.log("Server working")
})
.catch((error)=> {
    console.log("ERROR: ", error)
})

export const handler = serverless(app);




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

