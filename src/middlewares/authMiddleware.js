import { asyncHandler } from "../utils/asyncHandler";


export const verifJWT = asyncHandler(async (req,res,next)=>{
    req.cookies?.accessToken || req.header("") 
    
    next()
})

//  40:18----16

