import jwt from 'jsonwebtoken'

const generatePaymentToken = async (userId)=>{
    const Paymenttoken = jwt.sign({id : userId},
        process.env.SECRET_KEY_PAYMENT_TOKEN,
        {expiresIn : '10s'}
    )

    return Paymenttoken
}

export default generatePaymentToken