import React, { useEffect, useRef, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import ProductCardCategory from './ProductCardCategory'
import CardProduct from './CardProduct'
import { Link } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import Axios from '../utils/Axios'
import HomeProduct from './HomeProduct'

const HomeCategoy = ({id,name}) => {
  
    const [data,setData]= useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
   
   console.log("data",data)

       const fetchCategoryProduct = async()=>{
        try {
            //setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductCategory,
                data : {
                    id : id
                }
            })

            const {data : responseData} = response
            console.log("ProductCategory", responseData)

            if(responseData.success)
                setData(responseData.data)

           
        } catch (error) {
            //AxiosToastError(error)
            console.log(error)
        }
        finally{
           // setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

    console.log("dataset",data)
    const loadingProductCardNo = new Array(15).fill(null)
    
    const handleScrollRight=()=>{
        containerRef.current.scrollleft += 200
    }

    const handleScrollLeft=()=>{
        containerRef.current.scrollleft -= 200
    }

  return (
    <div>
         <div className='container p-4 mx-auto flex item-center justify-between bg-white '>
          
          <h3 className='font-semibold'>{name}</h3>
      {/**5:50 */}    <Link to="" className='text-green-400 hover:text-green-600 cursor-pointer'>
            See All
          </Link>
        </div>
        <div className='flex items-center gap-4 mx-auto container p-2 md:gap-6 lg:gap-8 overflow-x-scroll scroll-smooth ' ref={containerRef}>
           
           {
                   loading && 
                    loadingProductCardNo?.map((_,index)=>{
                        return(
                         <ProductCardCategory   key={"category-product"+index }/>
                            
                        )
                    })
             }
          
           {
                data?.map((p,index)=>{
                    return(
                        <HomeProduct data={p} key={p._id+"categproduct"+index}/>
                    )
            })
                
           }

           <div className='w-full left-0 right-0 absolute container mx-auto hidden  lg:flex justify-between'>
                <button onClick={handleScrollLeft} className='z-10 relative bg-white shadow-lg text-lg rounded-full'>
                    <FaAngleLeft />  
                </button>

                <button onClick={handleScrollRight} className='z-10 relative bg-white shadow-lg text-lg rounded-full'>
                    <FaAngleRight/>  
                </button>
           </div>
           <div>
                
           </div>
            
        </div>

    </div>
  )
  
}

export default HomeCategoy
