import React, { useState } from 'react'
import { IoCloudUpload } from "react-icons/io5";
import uploadImage from '../utils/uploadImage';
import Loading from '../component/Loading';
import ViewImage from '../component/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import AddField from '../component/AddField';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import {  useNavigate } from 'react-router-dom';
const UploadProduct = () => {

  const user = useSelector(state=> state.user)
  const [imageLoading,setImageLoading] =  useState(false)
  const [viewImageUrl,setViewImageUrl] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory, setSelectCategory]=useState("")
  const [selectSubCategory, setSelectSubcategory] = useState("")
  const subCategory = useSelector(state => state.product.subCategory)
  const [moreFields,setMoreFields] = useState([])
  const [openAddField,setOpenAddField] =useState(false)
  const [fieldName,setFieldName] = useState("")
  const navigate = useNavigate()
  
  
  const [data,setData]=useState({
   
    
    name : "",
    image : [],
    category : [],
    subcategory : [],
    unit : [],
    stock : "",
    price : "",
    discount : "",
    description : "",
    more_details : {},
    beds : ""
    
  })

  

  const handleChange=(e)=>{
    const {name, value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleUploadImage=async(e)=>{
    const file =e.target.files[0]
    if(!file){
      return
    }
    setImageLoading(true)

    const response = await uploadImage(file)
    const { data : imageResponse} = response
    const imageUrl = imageResponse.data.url
    
    setData((preve)=>{
      return {
        ...preve,
        image : [...preve.image, imageUrl]
      }
    })

    setImageLoading(false)

    console.log("file",file)
  }

  const handleDeleteImage=async(index)=>{
    data.image.splice(index,1)
    setData((preve)=>{
      return {
        ...preve
      }
    })
  }

  const handleRemoveCategory=async(index)=>{
    data.category.splice(index,1)

    setData((preve)=>{
      return{
        ...preve
      }
    })
  }

  const handleRemoveSubCategory=async(index)=>{
    data.subcategory.splice(index,1)

    setData((preve)=>{
      return{
        ...preve
      }
    })
  }

  const handleSubmitField = ()=>{
    setData((preve)=>{
      return{
        ...preve,
        more_details : {
          ...preve.more_details,
          [fieldName] : ""
        }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }

  const handleSubmit =async(e)=>{
    e.preventDefault()
    e.stopPropagation()
   // console.log("data",data)
    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data : data
      })

      const {data : responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
      }

      navigate('/')

      console.log("data-product",responseData)
    } catch (error) {
      AxiosToastError(error)
    }

  }

  return (
    <section>
      <div className='shadow-md flex items-center justify-between'>
        <h2 className='semi-bold'>Upload products</h2>
        <p>upload less 5 photos</p>
        
    </div>
    <div>
      <form onSubmit={handleSubmit} className='grid gap-2 p-2'>
        <div className='grid gap-1 '>
            <label htmlFor='name'>Name</label>
            <input
            id='name'
              type ='text'
              placeholder='Enter product name'
              value={data.name}
              name='name'
              onChange={handleChange}
              required
              className='bg-slate-200 outline-none border focus-within:border-amber-300 rounded'
            />
        </div>
        <div className='grid gap-1 '>
            <label htmlFor='description'>description</label>
            <textarea
            id='description'
              type ='text'
              placeholder='Enter product description'
              value={data.description}
              name='description'
              onChange={handleChange}
              required
              className='bg-slate-200 outline-none border focus-within:border-amber-300 rounded resize-none'
              multiple
              rows={3}
            
            />
        </div>
        <div>
          <p>Image</p>
          <label htmlFor='productImage' className='bg-slate-200 cursor-pointer h-28 border rounded items-center flex justify-center'>
            <div className='flex flex-col items-center justify-center'>
                {
                  imageLoading ? <Loading/> : (
                    <>
                      <IoCloudUpload size={32}/>
                      <p>Upload Image</p>
                    </>
                  )
                }
                
                
              
            </div>
            <input
              type='file'
              id='productImage'
              accept='image/*'
              onChange={handleUploadImage}
              className='hidden'
            />
          </label>
          <div className='my-2 flex gap-1'>
              {
                data?.image.map((img,index)=>{
                  return(
                    <div  className='h-32 w-32 min-w-20 bg-slate-200  relative group'>
                      <img
                      
                        src={img}
                        alt={img}
                        className='w-full h-full object-scale-down cursor-pointer '
                        onClick={()=>setViewImageUrl(img)}
                      
                      />
                      <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-green-400  rounded-full text-red-500 cursor-pointer '>
                        <MdDelete/>
                        
                      </div>

                    </div>
                  )
                })
              }
          </div>
        </div>

        <div>
          <label>Category</label>
          <div>
            <select className='rounded bg-slate-200  border w-full p-1'
              value={selectCategory}
              onChange={(e)=>{
                const value = e.target.value
                const category = allCategory.find(el=> el._id === value)
                console.log("value",category)

                setData((preve)=>{
                  return{
                    ...preve,
                    category : [...preve.category, category]
                  }
                })
                setSelectCategory("")
              }}
            >

              <option value={""}>
                Select Category
              </option>
              {
                allCategory.map((c,index)=>{
                  return(
                    <option  value={c?._id}>{c.name}</option>
                  )
                })
              }
            </select>

            <div className='flex flex-wrap gap-1'>
                {
                  data?.category.map((c,index)=>{
                    return(
                      <div  className='text-sm flex items-center gap-1  bg-slate-300 shadow-md mt-2'>
                      
                        <p>{c.name}</p>
                          <IoClose size={18} className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveCategory(index)}/>
                      
                      </div>
                    )
                  })
                }
            </div>

          </div>
        </div>

          <div>
          <label>Sub-Category</label>
          <div>
            <select  className='rounded bg-slate-200  border w-full p-1'
              value={selectSubCategory}
              onChange={(e)=>{
                const value = e.target.value
                const subcategory = subCategory.find(el=> el._id === value)
               // console.log("subcategory",subCategory)

                setData((preve)=>{
                  return{
                    ...preve,
                    subcategory : [...preve.subcategory, subcategory]
                  }
                })
                setSelectSubcategory("")
              }}
            >

              <option value={""}>
                Select Sub Category
              </option>
              {
                subCategory?.map((c,index)=>{
                  return(
                    <option  value={c?._id}>{c.name}</option>
                  )
                })
              }
            </select>

            <div className='flex flex-wrap gap-1'>
                {
                  data?.subcategory.map((c,index)=>{
                    return(
                      <div  className='text-sm flex items-center gap-1  bg-slate-300 shadow-md mt-2'>
                      
                        <p>{c.name}</p>
                          <IoClose size={18} className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveSubCategory(index)}/>
                      
                      </div>
                    )
                  })
                }
            </div>

          </div>
        </div>

        <div className='grid gap-1 '>
            <label htmlFor='unit'>Unit</label>
            <input
            id='unit'
              type ='text'
              placeholder='Enter product units'
              value={data.unit}
              name='unit'
              onChange={handleChange}
              required
              className='bg-slate-200 outline-none border focus-within:border-amber-300 rounded'
            />
        </div>

        <div className='grid gap-1 '>
            <label htmlFor='stock'>No. Stock</label>
            <input
            id='stock'
              type ='Number'
              placeholder='Enter product stock'
              value={data.stock}
              name='stock'
              onChange={handleChange}
              required
              className='bg-slate-200 outline-none border focus-within:border-amber-300 rounded'
            />
        </div>

        <div className='grid gap-1 '>
            <label htmlFor='price'>Price</label>
            <input
            id='price'
              type ='Number'
              placeholder='Enter product price'
              value={data.price}
              name='price'
              onChange={handleChange}
              required
              className='bg-slate-200 outline-none border focus-within:border-amber-300 rounded'
            />
        </div>

        <div className='grid gap-1 '>
            <label htmlFor='discount'>Discount</label>
            <input
            id='discount'
              type ='Number'
              placeholder='Enter product discount'
              value={data.discount}
              name='discount'
              onChange={handleChange}
              required
              className='bg-slate-200 outline-none border focus-within:border-amber-300 rounded'
            />
        </div>

        <div className='grid gap-1 '>
            <label htmlFor='beds'>No. Beds</label>
            <input
            id='beds'
              type ='Number'
              placeholder='Enter product beds'
              value={data.beds}
              name='beds'
              onChange={handleChange}
              //required
              className='bg-slate-200 outline-none border focus-within:border-amber-300 rounded'
            />
        </div>

        <div>
          <div onClick={()=>setOpenAddField(true)} className='bg-emerald-400 rounded cursor-pointer hover:text-white py-1 px-3 w-28'>
            Add Fields i.e shopName
          </div>

          <div>
      {
        Object?.keys(data?.more_details)?.map((k,index)=>{
            return(
              <div className='grid gap-1'>
                   <label htmlFor={k}>{k}</label>
                    <input
                    id={k}
                      type ='text'
                      
                      value={data?.more_details[k]}
                     
                      onChange={(e)=>{
                          const value =e.target.value
                          setData((preve)=>{
                            return{
                              ...preve,
                              more_details : {
                                ...preve.more_details,
                                [k] : value
                              }
                            }
                          })
                      }}
                      //required
                      className='bg-slate-200 outline-none border focus-within:border-amber-300 rounded'
                    />
              </div>
            )
             
          
        })
      }
          </div>
        </div>

        <div>
            <button className='bg-emerald-400 hover:bg-emerald-700 cursor-pointer rounded w-full my-4'>
              Submit
            </button>
          </div>
      </form>
    </div>
    {

      viewImageUrl && (
        <ViewImage url={viewImageUrl} close={()=>setViewImageUrl("")}/>
      )
    }

    

    {
      openAddField && (
        <AddField 
        
        value={fieldName}
        onChange={(e)=>setFieldName(e.target.value)}
        submit={handleSubmitField}
        close={()=>setOpenAddField(false)}
        />
      )
    }
    
    </section>
  )
}

export default  UploadProduct
