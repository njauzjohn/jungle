import jwt from 'jsonwebtoken'
import UserModel from '../model/user.model.js'

const generateRefreshToken = async(userId)=>{
    const refreshToken = jwt.sign({id : userId},
        process.env.SECRET_REFRESH_KEY_TOKEN,
        {expiresIn : '30d'}
    )

    const updateRefreshTokenUser = await UserModel.updateOne(
        {_id : userId},
        {
            refresh_token : refreshToken
        }
    )

    return refreshToken
}

export default generateRefreshToken
