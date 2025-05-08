import { Router} from 'express'
import { RefreshToken, forgotPasswordController, UserMenu, loginController, logoutController,  registerUserController, resetPassword, updateUserDetails, uploadAvatar, userDetails, verifyEmailController, verifyForgotOtp, updateUserProfile, UpdateProductById, UpdateProductByIdProf, PaymentController } from '../controllers/user.controller.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js'



const userRouter = Router()

userRouter.post('/register', registerUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login',loginController)
userRouter.post('/paymentTokens',PaymentController)
userRouter.get('/logout',logoutController)
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
userRouter.put('/update-user',auth,updateUserDetails)
userRouter.post('/update-userProfile',auth,updateUserProfile)

userRouter.get('/userMenu',auth,UserMenu)
userRouter.post('/forgot-password',forgotPasswordController)
userRouter.put('/verify-forgot-password-otp',verifyForgotOtp)
userRouter.put('/reset-password', resetPassword)
userRouter.post('/refresh-token',RefreshToken)
userRouter.get('/user-details',auth,userDetails)


userRouter.post('/userUpdateMenu',UpdateProductById)
userRouter.post('/update-ProfileMenu',UpdateProductByIdProf)

export default userRouter