
import cartProductModel from "../model/cartProduct.model.js"
import UserModel from "../model/user.model.js"

export const addToCartController = async(request,response)=>{
    const userId = request.userId
    const { productId} = request.body
   
    try {
        

       console.log("user",userId)
        if(!productId){
            return response.status(400).json({
                message : "Provide productId",
                error : true,
                success : false
            })
        }

        const checkItemCart = await cartProductModel.findOne({
            userId : userId,
            productId : productId
        })

        if(checkItemCart){
            return response.status(400).json({
                message : "Item already in cart"
            })
        }

        const cartItem = new cartProductModel({
            quantity : 1,
            userId : userId,
            productId : productId
        })

        const save = await cartItem.save()
        const updateCartUser = await UserModel.updateOne({_id : userId},
            {
                $push : {
                    shopping_cart : productId
                }
            }
        )
        console.log("cart",save)

        return response.json({
            data : save,
            message : "Item added successfully",
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

export const getCartItemController = async(request,response)=>{
    try {
        const userId = request.userId


        const cartItem = await cartProductModel.find({
            userId : userId
        }).populate('productId')

        return response.json({
            data : cartItem,
            error : false,
            success : true
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

export const updateCartItemController = async(request,response)=>{
    try {
        const userId = request.userId
        const {_id,qty} = request.body

        console.log("_id",_id)

        // if(_id || !qty ){
        //     return response.status(400).json({
        //         message : "Provide _id, qty"
        //     })
        // }

        const updateCartItem = await cartProductModel.updateOne({
            _id : _id,
            userId : userId
        },{
            quantity : qty
        })

        return response.json({
            message : "Cart Updated successfully",
            success : true,
            error : false,
            data : updateCartItem
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

export const deleteCartItemController = async(request,response)=>{
    try {
        const userId = request.userId
        const {_id} = request.body

        // if(!_id){
        //     return response.status(400).json({
        //         message : "Provide _id",
        //         error : true,
        //         success : false
        //     })

        // }


        const deleteCartItem = await cartProductModel.deleteOne({_id :_id})

        return response.json({
            message : "Item removed from Cart",
            error : true,
            success : false,
            data : deleteCartItem
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}