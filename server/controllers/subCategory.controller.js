import SubcategoryModel from '../model/subcategory.model.js'

export const AddSubCategoryController = async(request,response)=>{
   try {
         const { name, image,category}=request.body
        
         if(!name && !image && !category[0]){
            return response.status(400).json({
                message : "Provide required fields",
                error : true,
                success : false
            })
         }

         const payload = {
            name,
            image,
            category
         }

         const createSubCategory = new SubcategoryModel(payload)
         const save = await createSubCategory.save()
        // console.log("save",save)
         return response.json({
            message : "SubCategory Created",
            data : save,
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

export const getSubCategoryController=async(request, response)=>{
   try {
      const data = await SubcategoryModel.find().sort({createdAt : -1}).populate('category')
      return response.json({
         message : "subCategory Added",
         data : data,
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

export const updateSubCategoryController = async(request,response)=>{
   try {
      const { _id, name, image, category} = request.body

      const checkSubcategory = await SubcategoryModel.findById(_id)

      if(!checkSubcategory){
         return response.status(400).json({
            message : "Check _id",
            error : true,
            success : false
         })
      }

      const updateSubCategory = await SubcategoryModel.findByIdAndUpdate(_id,{
         name,
         image,
         category
      })

      return response.json({
         message : "updated successfully",
         data : updateSubCategory,
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

export const deleteSubCategoryController= async(request,response)=>{
   try {
      const {_id}=request.body

      const deleteSubCategory = await SubcategoryModel.findByIdAndDelete(_id)

      return response.json({
         message : "Subcategory Deleted",
         data : deleteSubCategory,
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