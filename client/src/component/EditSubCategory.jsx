import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/uploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditSubCategory = ({close,data,fetchData}) => {
    const [subCategorydata,setSubCategoryData] = useState({
        _id : data._id,
        name : data.name,
        image : data.image,
        category : data.category || []
    })
    const allCategory = useSelector(state => state.product.allCategory)
    console.log("Category", allCategory)

    const HandleChange =(e)=>{
        const {name,value} = e.target

        setSubCategoryData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubCategoryImage=async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }

        const response = await uploadImage(file)
        const {data : ImageResponse} = response

        setSubCategoryData((preve)=>{
            return{
                ...preve,
                image : ImageResponse.data.url
            }
        })
    }

    //console.log("response",setSubCategoryData )
    const HandleRemoveCategorySelected =(categoryId)=>{
        const index = subCategorydata.category.findIndex(el=>el._id === categoryId)
        // console.log("index",index)deletion 
        subCategorydata.category.splice(index,1)
        setSubCategoryData((preve)=>{
            return{
                ...preve
            }
        })


    }

    const handleSubmitCategory=async(e)=>{
       e.preventDefault()
       
        try {
            const response = await Axios({
                ...SummaryApi.updateSubCategory,
                data : subCategorydata
            })

            const { data : responseData} = response
            //console.log("responseDt",responseData)
            if(responseData.success){
                toast.success(responseData.message)

                if(close){
                    close()
                }
                if(fetchData){
                    fetchData()
                }
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }
    console.log("subcategory", subCategorydata)

  return (
    <section className='fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center p-4'>
        <div className='w-full  bg-slate-300 p-4 rounded'>
           <div className='flex items-center justify-between gap-3'>
                <h1 className='font-semibold'>Edit Sub-Category</h1>
                <button onClick={close} className='cursor-pointer'>
                    <IoClose size={22}/>
                </button>
           </div>
           <form className='gap-3 grid' onSubmit={handleSubmitCategory}>
                <div className='grid rounded gap-1'>
                    <label htmlFor='name'>Name</label>
                    <input
                        id='name'
                        name='name'
                        value={subCategorydata.name}
                        onChange={HandleChange}
                        className='p-1 bg-white border outline-none border-amber-300'
                    />
                </div>
                <div className='grid gap-1'>
                <p> Image</p>
                    <div className='flex flex-col gap-3 lg:flex-row items-center'>            
                            <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                            {
                                !subCategorydata.image ? (
                                    <p>No Image</p>
                                ) : (
                                    <img
                                    alt='subcategory'
                                    src={subCategorydata.image}
                                    className='w-full h-full object-scale-down'
                                    
                                    
                                    />
                                )
                            }
                            </div>

                            <label htmlFor='uploadSubcategory'>
                                <div className='px-4 py-1 border border-amber-300 rounded hover:bg-amber-300 cursor-pointer'>
                                    Upload Image
                                </div>
                                <input
                                    type='file'
                                    id='uploadSubcategory'
                                    className='hidden'
                                    onChange={handleSubCategoryImage}
                                    
                                />
                            </label>

                            
                    </div>
                   
                </div>

                <div className='grid gap-1'>
                    <label>Select Category</label>
                        <div className='border border-amber-200 outline-none'>
                        
                        <div className='flex flex-wrap gap-2'>
                            {
                                subCategorydata.category.map((cat,index)=>{
                                    return(

                                            <p key={cat._id+"selectedValue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-2' >{cat.name}
                                                <div className='cursor-pointer hover:text-red-600' onClick={()=>HandleRemoveCategorySelected(cat._id)}>
                                                <IoClose/>
                                                </div>
                                            </p>
                                            

                                        
                                        
                                    )
                                })
                            }
                        </div>
                        <select onChange={(e)=>{
                            const value = e.target.value
                            const categoryDetails = allCategory.find(el => el._id == value)
                            setSubCategoryData((preve)=>{
                                return{
                                    ...preve,
                                    category : [...preve.category,categoryDetails]
                                }
                            })

                        }} className='w-full p-2 outline-none border'>
                            <option value={""} >select category</option>

                           
                                {
                                    allCategory.map((category,index)=>{
                                        return(
                                            <option value={category?._id} key={category._id+"subcategory"}>{category?.name}</option>
                                        )
                                    })
                                }
                          
                        </select>
                </div>
                </div>
                <button className={`px-1 py-1 border cursor-pointer
                    ${subCategorydata?.name && subCategorydata?.image && subCategorydata?.category[0] ? "bg-green-600 hover:bg-green-800" : "bg-gray-200"

                    }
                    `}>
                    Submit</button>

           </form>
        </div>
    </section>
  )
}

export default EditSubCategory

