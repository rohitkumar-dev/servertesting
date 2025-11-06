import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/userModel.js"
import {ApiResponse} from '../utils/ApiResponse.js'

const generateAccessAndRefreshToken = async (userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating token")
    }
}

const registerUser = asyncHandler( async (req, res)=>{
    // get user details
    // validation
    // check if already exists (username, email)
    // check for image- upload to cloudinary
    // create user object- create entry in DB
    // remove passwords and refresh token field from response
    // check for user creating
    // reutrn res

    //console.log("Req.body:: ",req.body);
    //console.log("Req.files:: ",req.files);
    
    const {fullName, email, userName, password} = req.body
    if( [fullName, email, userName, password].some((field)=>field?.trim()==="") ){
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{userName}, {email}]
    })
    if(existedUser){
        throw new ApiError(400, "User already registered")
    }
    //console.log(req.files)    
    const avatorLocalPath = req.files?.avator[0]?.path
    //const coverImageLocalPath = req.files?.coverImage[0]?.path
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath = req.files.coverImageLocalPath[0].path
    }
    if(!avatorLocalPath){
        throw new ApiError(400, "Avator file is required")
    }
    const avator = await uploadOnCloudinary(avatorLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avator){
        throw new ApiError(400, "Avator file is required")
    }
    const user = await User.create({
        fullName,
        avator: avator.url,
        coverImage: coverImage?.url || "",
        userName: userName.toLowerCase(),
        email,
        password
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registring")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

const loginUser = asyncHandler( async (req, res)=>{
    // get data from body
    // username/email
    // find user
    // if found then check password
    // access and refresh token
    // send cookie
    const {userName, email, password} = req.body

    if( (!userName && !email) && !password ){
        throw new ApiError(400, "All fields are required")
    }

    const user = User.findOne({
        $or: [ {userName}, {email} ]
    }).select("-password -refreshToken")

    if(!user){
        throw new ApiError(400, "User not registered")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    
    if(isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json( new ApiResponse(200, {user: loggedInUser}, "User loggedin successfully"))
})


const logoutUser = asyncHandler( async (req,res)=>{
    
})

export { registerUser, loginUser }
