import uploadImageCloudinary from "../utils/uploadimageToCloudinary.js"

const uploadImageController =async (request,response)=>{
    try {
        const file = request.file

        const uploadImage = await uploadImageCloudinary(file)
        
        return response.json({
            message : "Image upload",
            data : uploadImage,
            success : true,
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

export default uploadImageController