import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const HomeCardDisplay = ({data}) => {

    const url = `/product/${data?.name}-${data?._id}`
    const [loading,setLoading] = useState(false)
    const {name,avatar}=request.userId

    

  return (
    <div>
       <Link to={url} className='p-4 bg-white grid gap-3 rounded  max-w-60'>
            <div className='min-h-30  bg-slate-300 rounded'>
                <img
                    src={data?.image[0]}
                    
                />
        
            </div>
            <div className='p-2 w-40 bg-blue-300 rounded'></div>
            <div className='p-2 w-40 bg-green-300 rounded'></div>
            
        </Link> 
   
   </div>
  )
}

export default HomeCardDisplay
