import React, { useEffect, useState } from 'react'
import UploadSubCategory from '../component/UploadSubCategory'
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import DisplayTable from '../component/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../component/ViewImage'
import { LuPencilLine } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";

import EditSubCategory from '../component/EditSubCategory'
import ConfirmBox from '../component/ConfirmBox'


const SubCategory = () => {
  const [openAddSubCategory,setSubCategory] = useState(false)
  const [data,setData]=useState([])
  const [loading,setLoading] =useState(false)
  const columnHelper = createColumnHelper()
  const [imageUrl, setImageUrl]=useState("")
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({
    _id : ""
  })
  const [deleteSubCategory,setDeleteSubCategory] = useState({
    _id : ""
  })
  const [openConfirmDelete,setOpenCorfirmDelete] = useState(false)

  const fetchSubcategory = async()=>{
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })
      const { data : responseData} = response

      if(responseData.success){
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchSubcategory()
  },[])
  console.log("subcategory",data)

  const column = [
    columnHelper.accessor('name',{
      header : "Name"
    }),
    columnHelper.accessor('image',{
      header : "Image",
      cell : ({row})=>{
        console.log("row",row.original.image)
        return(
          <div className='flex justify-center items-center cursor-pointer' >
              <img
              src={row.original.image}
              alt={row.original.name}
              className='w-25 h-25'
              onClick={()=>{
                setImageUrl(row.original.image)
              }}
            />
          </div>
    )
      }
    }),
    columnHelper.accessor("category",{
      header : "Category",
      cell : ({row})=>{
        return (
          <>
            {
              row.original.category.map((c,index)=>{
                return(
                  <p key={c._id+"table"} className='shadow-lg px-1 inline-block'>{c.name}</p>
                )
              })
            }


          </>
        )
      }
    }),
    columnHelper.accessor("_id",{
      header : "Action",
      cell : ({row})=>{
        return(
          <div className='flex items-center justify-center gap-3'>
            <button onClick={()=>{
              setOpenEdit(true)
              setEditData(row.original)
            }} className='p-2 bg-green-400 rounded-full cursor-pointer ' >
              <LuPencilLine/>
            </button>
            <button onClick={()=>{
              setOpenCorfirmDelete(true)
              setDeleteSubCategory(row.original)
            }} className='p-2 bg-red-400 rounded-full cursor-pointer '>
              <MdDeleteSweep/>
            </button>
          </div>
        )
      }
    })
  ]

  const handleDeleteSubCategory=async()=>{
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data : deleteSubCategory
      })

      const { data : responseData}=response

      if(responseData.success){
        toast.success(responseData.message)
        fetchSubcategory()
        setOpenCorfirmDelete(false)
        setDeleteSubCategory({_id : ""})
      }
      
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section>
        <div className='shadow-md flex items-center justify-between '>
            <h2 className='semi-bold'>Sub Category</h2>
            <button onClick={()=>setSubCategory(true)} className='text-sm border border-b-orange-400 hover:bg-green-700 px-3 py-1 rounded '>Add sub-category</button>
        </div>

        <div>

          <DisplayTable
          data={data}
          column={column}
          />

        </div>

        {
          openAddSubCategory && (
            <UploadSubCategory close={()=>setSubCategory(false)}
            fetchData={fetchSubcategory}
            />
          )
        }
     {
        imageUrl &&
        <ViewImage url={imageUrl} close={()=>setImageUrl("")}/>
     }

    {
      openEdit &&
      <EditSubCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchSubcategory}/>
     } 

     {
        openConfirmDelete && (
          <ConfirmBox
            cancel={()=>setOpenCorfirmDelete(false)}
            close={()=>setOpenCorfirmDelete(false)}
            confirm={handleDeleteSubCategory}
          />
        )
     }  

    </section>
  )
}

export default SubCategory
