import React, { useEffect, useRef, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { Pricecurrency } from '../utils/Pricecurrency'
import Divider from '../component/Divider'
import { DiscoutPrice } from '../utils/DiscountPrice'
import AddCartItem from '../component/AddToCartItem'
import { useSelector } from 'react-redux'

const ProductDisplayPage = () => {

    const user = useSelector(state => state.user)
    const params = useParams()
    let productId = params?.product?.split("-")?.slice(-1)[0]
    const [data,setData] = useState({
        name : "",
        image : []
    })
    const [loading,setLoading] = useState(false)
    const [image,setImage] = useState(0)
    const imageContainer = useRef()
    
    console.log("params",productId)

    
    const fetchProductDetails = async()=>{
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductDetails,
                data : {
                    productId : productId
                }
            })

            const { data : responseData} = response

            if(responseData.success){
                setData(responseData.data)
               // setImage(responseData.data.image[0])
            }
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchProductDetails()
    },[params])

    //console.log("product_data",data)


    const handlenext=()=>{
        imageContainer.current.scrollLeft +=100

    }

    const handlePrevoius=()=>{
        imageContainer.current.scrollLeft -=100
        
    }

  return (
    <section className='container  mx-auto  grid lg:grid-cols-3'>
        <div className='col-span-2'>
          <div className='bg-white rounded lg:min-h-[70vh] lg:max-h-[70vh] min-h-50 max-h-50 w-full h-full p-2'>
            <img
            
                src={data.image[image]}
                className='w-full h-full object-scale-down'

            />
          </div>

          <div className='flex items-center justify-center gap-3 my-2'>
            {
                data.image.map((img,index)=>{
                    return(
                        <div key={img+index+"points"} className={`bg-green-500 lg:w-5 lg:h-5 w-3 h-3 rounded-full ${index === image && "bg-slate-300"}`}></div>
                    )
                })
            }
          </div>
         
            <div className='grid p-4 relative'>
              <div ref={imageContainer}>
                    {
                            data.image.map((img,index)=>{
                                return(
                                <div className='w-20 h-20 shadow-md cursor-pointer scrollbar-none ' key={img+index}>
        {/**scrolbar 3:59 */}
                                    <img
                                        src={img}
                                        alt='min-product'
                                        onClick={()=>setImage(index)}
                                        className='w-full h-full object-scale-down'
                                    />
                                    </div>
                                )
                            })
                        }
              </div>

              <div className='w-full h-full flex items-center justify-between absolute -ml-1 '>
                <button onClick={handlePrevoius} className='bg-white p-1 rounded-full shadow-lg '>
                    <FaChevronLeft/>
                </button>
                <button onClick={handlenext} className='bg-white p-1 rounded-full shadow-lg '>
                    <FaChevronRight/>
                </button>
              </div>
            </div>
         
        </div>

        <div className='p-4 gap-2'>
            <h2 className=' bg-green-500 text-3xl rounded  font-semibold px-4 my-2 w-fit'>{data.name}</h2>
            
            <Divider/>
            <div className='flex items-center gap-4'>
                <div>
                    <p className='font-thin px-4 my-2 text-lg bg-green-400 rounded-full w-fit'>{Pricecurrency(DiscoutPrice(data.price,data.discount))}</p>
                
                </div>
                {/**discount 5 : 37 */}
                
                    {
                        data.discount && (
                            <p className='line-through'>{Pricecurrency(data.price)}</p>
                        )
                    }
                    {
                        data.discount && (
                            <p className='font-bold text-green-600 lg:text-2xl'>{data.discount}%<span className='text-base text-neutral-600'>Discount</span></p>
                        )
                    }
                
            </div>

            
               
                 
                <p className='bg-blue-400 px-2 w-fit  rounded my-2'>{data.description}</p>
               
           

            <p className='bg-blue-400  rounded-full my-2 px-4 w-fit'>{data.unit}</p>
            {
                data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                    return(
                       
                        <div>

                            <p className='font-semibold'>{element}</p>
                            <p className='text-base'>{data?.more_details[element]}</p>
                        </div>
                    )
                })
            }

             {/**more details 5 : 45 */}
           {
             data.stock === 0 ? (
                <p className='text-lg text-red-500'>Out of Stock</p>
             ) : (
                <button className='my-1 px-2 py-1 bg-green-700 hover:bg-green-800 cursor-pointer'>
                  <AddCartItem data={data}/>
                </button>
             )
           }


        {/* <div className='w-10 flex items-center justify-center rounded-full py-3 drop-shadow-lg'>
            {

                user._id ? (
                    <div>
                        <div>
                            <img
                                alt={user.name}
                                src={user.avatar}
                                className='rounded-full'

                            />
                        </div>
                        <div>
                            <p>{user?.name}</p>
                        </div>
                    </div>
                ) : (

                    <LuCircleUserRound size={22} />
                )   
            }
        
        </div> */}

        </div>

        
    </section>
  )
}

export default ProductDisplayPage
