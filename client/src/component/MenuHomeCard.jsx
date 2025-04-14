import React from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { LuCircleUserRound } from "react-icons/lu";

import MenuProfile from './MenuProfile'

const MenuHomeCard = ({data}) => {

    const users = useSelector(state=> state?.user)
    const url = `/product/${data.name}-${data._id}`
    const [loading,setLoading] = useState(false)
    
    
  
    return (


            <div>
                <Link to={url} className='p-4 bg-white grid gap-3 rounded  max-w-60'>
                        
                        
                        <div className='min-h-30  bg-slate-300 rounded'>
                            <img
                                src={data?.image[0]}
                                
                            />
                    
                        </div>
                        <div className='p-2 w-40 bg-blue-300 rounded'>{data?.name}</div>
                        <div className='p-2 w-40 bg-green-300 rounded'>{data?.unit}</div>
                        <div className='p-2 w-40 bg-slate-300 rounded'>{data?.description}</div>
                        
                    </Link> 

          
                    
     
            { <MenuProfile/> }
    </div>

            
   
  )


}

export default MenuHomeCard
