import React, { useEffect, useState } from 'react'
import jungle from '../assets/jungle.png'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { LuCircleUserRound } from "react-icons/lu";

const LogoProfile = () => {
    const [data,setData] = useState({
        name : "",
        image : []
    })


    const fetchProductDetails = async()=>{
        try {
            //setLoading(true)
            const response = await Axios({
                ...SummaryApi.getLogo,
                data : data
            })

            const { data : responseData} = response

            if(responseData.success){
                setData(responseData.data)
               // setImage(responseData.data.image[0])
            }
            
        } catch (error) {
            AxiosToastError(error)
        }finally{
            //setLoading(false)
        }
    }

    useEffect(()=>{
        fetchProductDetails()
    },[])

  return (
    <div>
      <div className=' p-2'>
            

        <div className='w-10 flex items-center justify-center rounded-full overflow-hidden drop-shadow-lg'>
        {
          data.image ?  (
                
                <div>
                    <div>
                    <img
                    alt={data?.name}
                    src={data?.image}
                    className='w-full h-full' 

                />
                </div>
                <div>
                    {data?.name}
                </div>
                </div>
                
            ) : (

                <LuCircleUserRound size={22}/>
            )
        }
        </div>
          </div>
    </div>
  )
}


export default LogoProfile



