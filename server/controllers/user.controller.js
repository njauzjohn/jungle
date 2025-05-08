import sendEmail from '../config/sendEmail.js'
import verifyEmailTemplate from '../utils/verifyEmailtemplate.js'
import userModel from '../model/user.model.js'
import bcrypt from 'bcryptjs'
import UserModel from '../model/user.model.js'
import generateAccessToken from '../utils/generateAccessToken.js'
import generateRefreshToken from '../utils/generateRefreshToken.js'

import uploadImageCloudinary from '../utils/uploadimageToCloudinary.js'
import generateOtp from '../utils/generateOTP.js'
import forgotPaswordTemplate from '../utils/forgotPasswordtemplate.js'
import jwt from 'jsonwebtoken'
import generatePaymentToken from '../utils/generatePaymentToken.js'


export async function registerUserController(request, response){
    try {
        const { name, email, password } = request.body

        if(!name || !email || !password){
                return response.status(400).json({
                    message : "Provide name, email, password",
                    error : true,
                    success : false
                })
        }

        const user = await UserModel.findOne({ email })

        if(user){
            return response.json({
                message : "User Already Registered",
                error : true,
                success : false
            })
        }

        const salt = await bcrypt.genSalt(8)
        const hashPassword = await bcrypt.hash(password, salt)
            
        const payload = {
            name, 
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save() 

        console.log("user", newUser)

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "verify email",
            html : verifyEmailTemplate({
                name,
                url : verifyEmailUrl
            })
        })

        return response.json({
            message : "User Registered successfully",
            error : false,
            success : true, 
            data : save
        })

    } catch (error) {

        //console.log(error)

        return response.status(500).json({
            message : "User not registered",
            error : true,
            success : false
        })
    }
}

export async function verifyEmailController(request, response)
{
    try {
        const { code } = request.body

        const user = await UserModel.findOne({_id : code})

        if(!user){
            return response.status(400).json({
                message : "invalid code",
                error : true,
                success : false
            })
        }

        const updateUser = await UserModel.updateOne({ _id : code },{
            verify_email : true
        })

        return response.json({
            message : "email verified",
            success :true,
            error : false
        })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//loging controller
export async function loginController(request,response){
    try {
        const {email,password} = request.body

        if(!email || !password){
            return response.status(400).json({
                message : "access granted",
                error : true,
                success : false
            })
        }
        

      const user = await UserModel.findOne({email})

        if(!user){
            return response.status(400).json({
                message : " user not registered",
                error : true,
                success : false
            })
        }

        if(user.status !== "Active"){
            return response.status(400).json({
                message : "Contact Admin",
                error : true,
                success : false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            return response.status(400).json({
                message : "check your password",
                error : true,
                success : false
            })
        }

        const accessToken = await generateAccessToken(user._id)
        const refreshtoken = await generateRefreshToken(user._id)

        const updateUser = await userModel.findByIdAndUpdate(user._id,{
            last_login_date : new Date()
        })
        const cookieOption ={
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.cookie('accessToken', accessToken,cookieOption)
        response.cookie('refreshToken', refreshtoken,cookieOption)

        return response.json({
            message : "Login successfully",
            error : false,
            success : true,
            data : {
                accessToken,
                refreshtoken
            }//
        })

    } catch (error) {
        console.log(error)
        // return response.status(500).json({
        //     message : error.message || error,
        //     error : true,
        //     success : false
        // })
    }
}

//payment controller
export async function PaymentController(request,response){
    try {
        const {email,password} = request.body

        if(!email || !password){
            return response.status(400).json({
                message : "access granted",
                error : true,
                success : false
            })
        }
        

      const user = await UserModel.findOne({email})

        if(!user){
            return response.status(400).json({
                message : " user not registered",
                error : true,
                success : false
            })
        }

        if(user.status !== "Active"){
            return response.status(400).json({
                message : "Contact Admin",
                error : true,
                success : false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            return response.status(400).json({
                message : "check your password",
                error : true,
                success : false
            })
        }

        const paymentToken = await generatePaymentToken(user._id)
        //const refreshPaymenttoken = await generateRefreshToken(user._id)

        const updateUser = await userModel.findByIdAndUpdate(user._id,{
            last_login_date : new Date()
        })
        const cookieOption ={
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.cookie('paymentToken', paymentToken,cookieOption)
        //response.cookie('refreshPaymentToken', refreshPaymenttoken,cookieOption)

        return response.json({
            message : "Login successfully",
            error : false,
            success : true,
            data : {
                paymentToken,
               // refreshPaymenttoken
            }//
        })

    } catch (error) {
        console.log(error)
        // return response.status(500).json({
        //     message : error.message || error,
        //     error : true,
        //     success : false
        // })
    }
}

//logout controller
export async function logoutController(request,response){
    try {

        const userid = request.userId

        const cookieOption ={
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.clearCookie('accessToken',cookieOption)
        response.clearCookie('refreshToken',cookieOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
            refresh_token : ""
        })

        return response.json({
            message : "Logout successfully",
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

///upload user avatar
export async function uploadAvatar(request,response){
    try {

        const userId = request.userId

        const image = request.file
    
        const upload = await uploadImageCloudinary(image)
        
        const updateAvatar = await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })

        return response.json({
            message : "Image uploaded successfully",
            success : true,
            error : false,
            data : {
                _id : userId,
                avatar : upload.url
            }
        })
      
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//update user details

export async function updateUserDetails(request,response){
    try {
        const userId = request.userId
        const {name,email,mobile,password} = request.body

        let hashPassword = ""

        if(password){
            const salt = await bcrypt.genSalt(10)
            hashPassword = await bcrypt.hash(password, salt)

        }

        
        const updateUser = await UserModel.updateOne({_id : userId},{
            ...(name && {name : name}),
            ...(email && {email : email}),
            ...(mobile && {mobile : mobile}),
            ...(password && {password : hashPassword})
        })

        return response.json({
            message : "User Updated Successfully",
            error : false,
            success : true,
            data : updateUser
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const UpdateProductById = async (request,response)=>{
    try {
        const {id} = request.body
        const {userId} = request.userId

        if(!id){
            return response.status(400)({
                message : "provide category id",
                error : true,
                success : false
            })
        }

        


        const product = await UserModel.find({
            avatar : {$in : userId},
           
        })

        return response.json({
            message : "category product list",
            error : false,
            success:true,
            data : product
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })

       // console.log(error)
    }
}


//trial
export const UpdateProductByIdProf = async (request,response)=>{
    try {
        const {id} = request.body
        const userId = request.userId
       //

        if(!id){
            return response.status(400)({
                message : "provide category id",
                error : true,
                success : false
            })
        }

        
        const product = await UserModel.find({
            avatar : {$in : id}
        })

     console.log("avatar",data)

        return response.json({
            message : "Prof",
            error : false,
            success:true,
            data : product
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })

       // console.log(error)
    }
}


export async function updateUserProfile(request,response){
    try {
        const userId = request.userId
        const {name,avatar} = request.body
        const productId = request.productId
        

        
        const updateUser = await UserModel.find({
            name : name,
           avatar : avatar,
           userId : userId
        }).populate('userId')

        console.log("update",updateUser)

        return response.json({
            message : "User Updated Successfully",
            error : false,
            success : true,
            data : updateUser

           
        })

        

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function forgotPasswordController(request,response){
    try {
        const {email} = request.body

        const user = await UserModel.findOne({email})

        if(!user){
            return response.json({
                message : "Email not available",
                success : false,
                error : true
            })
        }

        const otp = generateOtp()
        const expireTime = new Date() + 60 * 60 * 1000

        const update = await UserModel.findByIdAndUpdate(user.id,{
            forgot_password_otp : otp,
            forgot_password_expiry : expireTime.toDateString
        })

        return response.json({
            message : "Check your Email",
            error : false,
            success : true
        })

        await sendEmail({
            sendTo : email,
            subject : "Forgot password from jungleBook",
            html : forgotPaswordTemplate({
                name : user.name,
                otp : otp
            })
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function verifyForgotOtp(request,response){
    try {

        const {email,otp} =request.body

       
        if(!email || !otp){
            return response.status(400).json({
                message : "Provide required email , otp",
                error : true,
                success : false
            })
        }
        
       

        const user = await UserModel.findOne({email})

        if(!user){
            return response.json({
                message : "Email not available",
                success : false,
                error : true
            })
        }

        const currentTime = new Date().toDateString
        
        if(user.forgot_password_expiry < currentTime){
            return response.status(400).json({
                message : " OTP expired",
                error : true,
                success : false
            })
        }

        if(otp !== user.forgot_password_otp){
            return response.status(400).json({
                message : "INVALID OTP",
                error : true,
                success : false
            })
        }

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp	: "" ,
            forgot_password_expiry :""
        })

        return response.json({
            message : "OTP verified",
            error : false,
            success : true
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function resetPassword(request,response){
    try {
        
        const {email,newPassword,confirmPassword} = request.body

        if(!email || !newPassword || !confirmPassword){
            return response.status(400).json({
                message : "Provide Required Fields"
            })
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return response.status(400).json({
                message : "Email is no available",
                error : true,
                success : false
            })
        }

        if(newPassword !== confirmPassword){
            return response.status(400).json({
                message : "Password don't match",
                error : true,
                success : false
            })
        }

        

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newPassword, salt)
          
        
        const update = await UserModel.findByIdAndUpdate(user.id,{
            password : hashPassword
        })

        console.log("update")

        return response.json({
            message : "Password updated successfully",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function RefreshToken(request,response){
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]

        if(!refreshToken){
            return response.status(401).json({
                message : "Unauthorized Access",
                error : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.
            SECRET_REFRESH_KEY_TOKEN)

        if(!verifyToken){
            return response.status(401).json({
                message : "TOKEN EXPIRED",
                error : true,
                success : false
            })
        }
       

        const userId = verifyToken._id

        const newAccessToken = await generateAccessToken()
        const newRefreshToken= await generateRefreshToken()
        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None" 
        }
       response.cookie('accessToken',newAccessToken,cookiesOption)
       response.cookie('refreshToken',newRefreshToken,cookiesOption)
        return response.json({
            message : "New Token Generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken,
                refreshToken : newRefreshToken
            }
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function userDetails(request,response){
    try {
        const userId = request.userId
        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return response.json({
            message : 'user details',
            data : user,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : "something is wrong",
            error : true,
            success : false
        })
    }
}

export async function UserMenu(request, response)
{
    try {
        const userId = request.userId
        const user = await UserModel.findById(userId).select('-password -refresh_token').populate('userId')

        return response.json({
            message : 'user details',
            data : user,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : "something is wrong",
            error : true,
            success : false
        })
    }
}