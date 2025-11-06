const asyncHandler = (fn)=>{ 
    return (req,res,next)=>{
    Promise.resolve(fn(req,res,next))
    .catch((error)=> next(error))
} }

export {asyncHandler}



// using async/await
//const asyncHandler = (fn)=>{ ()=>{} }
// or
//const asyncHandler = (fn)=> ()=>{} 

// const asyncHandler = (fn)=>{ async (req,res,next)=>{
//     try {
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// } }

// export {asyncHandler}

