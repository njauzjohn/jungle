import jwt from 'jsonwebtoken'

const generateAccessToken = async (userId)=>{
    const token = jwt.sign({id : userId},
        process.env.SECRET_KEY_ACCESS_TOKEN,
        {expiresIn : '3d'}
    )

    return token
}

export default generateAccessToken