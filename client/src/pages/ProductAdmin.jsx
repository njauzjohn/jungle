import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios.js'
import AxiosToastError from '../utils/AxiosToastError.js'
import Loading from '../component/Loading.jsx'
import ProductCardAdmin from '../component/ProductCardAdmin.jsx'
import EditProduct from '../component/EditProduct.jsx'
import { useSelector } from 'react-redux'
const ProductAdmin = () => {

 
  const [productData,setProductData] = useState([])
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [totalPageCount,setTotalPageCount] = useState(1)
  const user = useSelector((state) => state?.Product)
 // let productId = params?.product
  
 
 
 //console.log("userId", user)
  const fetchProductData =async()=>{
    setLoading(true)
    try {
      const response = await Axios({
        ...SummaryApi.getProduct,
        data : {
          page : page,
         // limit : 12
        }
      })

      

      const {data : responseData}=response
     
      console.log("data",responseData)

      
      if(responseData.success){
        setProductData(responseData.data)
      }

    } catch (error) {
      AxiosToastError
    }finally{
      setLoading(false)
    }
  }

   const fetchProduct =async()=>{
    setLoading(true)
    try {
      const response = await Axios({
        ...SummaryApi.product,      
        data : {
          page : page
        }
        
      })
     
      

      const {data : responseData} = response
     
      console.log("product",responseData)

      
      if(responseData.success){
        setProductData(responseData.data)
      }

    } catch (error) {
      AxiosToastError
    }finally{
      //setLoading(false)
    }
  }

  

  useEffect(()=>{
    //fetchProduct()
    fetchProductData()
  },[])

  // const handleNext=()=>{
  //   if(page !== totalPageCount ){
  //     setPage(preve => preve + 1)
  //   }
  // }

  // const handlePrevious=()=>{
  //   if(page > 1 ){
  //     setPage(preve => preve - 1)
  //   }
  // }


  return (
    <section>
    <div className=' p-2 shadow-md flex items-center justify-between'>
      <h2 className='semi-bold'> products</h2>
      
    </div>
    {
      loading && (
        <Loading/>
      )
    }

    <div className='p-4'>

      
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 bg-slate-300 p-4 gap-4'>
         
          {
             productData?.map((p,index,)=>{
              return(
                <ProductCardAdmin key={p._id+"product"} data={p} fetchProductData={fetchProductData}/>
              )
            })

            
          }

          
          
        </div>
          {/* <div className='flex justify-between my-4'>
            <button onClick={handlePrevious} className='border border-amber-300 px-4 py-1 hover:bg-amber-700 cursor-pointer'>previous</button>
            <button className='w-full bg-white'>{page}/{totalPageCount}</button>
            <button onClick={handleNext} className='border border-amber-300 px-4 py-1 hover:bg-amber-700 cursor-pointer'>next</button>
          </div> */}
       
    </div>
        
    </section>
  )
}

export default ProductAdmin
