import {createSlice} from '@reduxjs/toolkit'

const initialValue = {
    allCategory : [],
    loadingcategory : false,
    subCategory : [],
    product : [],
    //userProduct : []
}

const productSlice = createSlice({
    name : 'product',
    initialState : initialValue,
    reducers : {
        
        setAllCategory : (state,action)=>{
          // console.log("all redux",action.payload)
          
            state.allCategory = [...action.payload]
            
        },
        setloadingCategory : (state,action)=>{
            state.loadingcategory = action.payload
        },

        setSubcategory : (state,action)=>{
            state.subCategory= [...action.payload]
        }, 
        // setProduct : (state,action)=>{
        //     state.product = [...action.payload]
        // }
    }
})

export const {setAllCategory,setSubcategory,setloadingCategory} = productSlice.actions

export default productSlice.reducer