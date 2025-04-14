import React, { useEffect, useState } from 'react'
import UploadCategory from '../component/UploadCategory'
import Loading from '../component/Loading'
import NoData from '../component/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import EditCategory from '../component/EditCategory'
import ConfirmBox from '../component/ConfirmBox'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const CategoryPage = () => {

    const [openCategory,setOpenCategory] = useState(false)
    const [loading, setLoading] = useState(false)
    const [categoryData,setCategoryData] = useState([])
    const [openEdit,setOpenEdit] = useState(false)
    const [editdata,setEditData] = useState({
        name : "",
        image : ""
    })
    const [openConfirmBoxDelete, setConfirmBoxDelete] = useState(false)
    const [deleteCategory,setDeleteCategory] = useState({
        _id : ""
    })

//    const allCategory = useSelector(state => state.product.allCategory)
   
//    useEffect(()=>{
//     setCategoryData(allCategory)
//    },[allCategory])
   
   //console.log("Category", allCategory)
   // console.log("all category redux", allcategory)
//   useEffect(()=>{
//    setCategoryData(allCategory)
//   },[allCategory])



    const fetchCategory = async()=>{
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            const { data : responseData} = response
            
            if(responseData.success){
                setCategoryData(responseData.data)
            }
            console.log("response",responseData)
        } catch (error) {
            
        }finally{
            setLoading(false)
        }       
    }

    useEffect(()=>{
        fetchCategory()
    },[])

    const handleDeleteCategory=async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data : deleteCategory
            })

            const {data : responseData}= response

            if(responseData.success){
                toast.success(responseData.message)
                //fetchCategory()
                setConfirmBoxDelete(false)
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

  return (
    <section>
        <div className='shadow-md flex items-center justify-between'>
            <h2 className='semi-bold'>Category</h2>
            <button onClick={()=>setOpenCategory(true)} className='text-sm border border-b-orange-400 hover:bg-green-700 px-3 py-1 rounded '>Add category</button>
        </div>

        {
            !categoryData[0] && !loading && (
                <NoData/>
            )
        }

        <div className='p-4 grid grid-cols-2 md:grid-cols-4  gap-1 lg:grid-cols-4 bg-slate-300'>
        {
             categoryData.map((category,index)=>{
                return(
                    <div className='w-40 h-50 shadow-lg rounded items-center  bg-white' key={category._id} >
                        <div>
                            <div className='w-37 h-38 px-2 shadow-lg'>
                                <img
                                    alt={category.name}
                                    src={category.image}
                                
                                    className='w-full h-40 object-scale-down'
                                
                                    
                                />
                        
                            </div>
                            <p>{category.name}</p>
                        </div>
                        <div className='flex item-center h-5 gap-2 '>
                            <button onClick={()=>{
                                setOpenEdit(true)
                                setEditData(category)
                            }} className='flex-1 px-1  font-medium rounded cursor-pointer hover:bg-green-400 bg-green-300 text-green-600 '>
                                Edit
                            </button>
                            <button onClick={()=>{
                                setConfirmBoxDelete(true)
                                setDeleteCategory(category)
                            }} className='flex-1 px-1  font-medium rounded cursor-pointer hover:bg-red-300 bg-red-200 text-red-600'>
                                Delete
                            </button>
                        </div>
                    </div>
                    
                )
            })
        }
        </div>

        {
            loading && (
                <Loading/>
            )
        }
        {
            openCategory && (

                <UploadCategory  close={()=>setOpenCategory(false)} fetchData={fetchCategory}/>
                //fetchData={fetchCategory}
            )
        }

        {
            openEdit && (
                <EditCategory data={editdata} close={()=>setOpenEdit(false) } fetchData={fetchCategory} />
            )
        }

        {
            openConfirmBoxDelete && (
                <ConfirmBox close={()=>setConfirmBoxDelete(false)} cancel={()=>setConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
            )
        }
    </section>
  )
}

export default CategoryPage
