import React, { useState } from 'react'
import { LuCircleUserRound } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { updateAvatar } from '../store/UserSlice'
import { MdClose } from "react-icons/md";


const UserProfileEdit = ({close}) => {
    
    const user =useSelector(state => state.user)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    const handleUploadAvatar = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }
        const formData = new FormData()
        formData.append('avatar', file)

        
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data :formData
            })
            const { data : responseData} = response
            dispatch(updateAvatar(responseData.data.avatar))

           
        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
        
    }
  
    return (
    <section className='fixed top-0 bottom-0 right-0 left-0 p-4 flex items-center justify-center'>
       
       <div>
        <button onClick={close} className='w-fit block ml-auto hover:cursor-pointer hover:text-red-600'>
            <MdClose/>
        </button>
       <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-lg'>
        {
            user.avatar ?  (
                <img
                    alt= {user.name}
                    src={user.avatar}
                    className='w-full h-full' 
                />
            ) : (

                <LuCircleUserRound size={22}/>
            )
        }
        </div>


            <form onSubmit={handleSubmit}>
                <label htmlFor='uploadProfile'>

                  <div className='cursor-pointer border border-green-500 hover:bg-amber-400 px-4 py-1 text-sm my-3'>
                    
                    {
                        loading ? "Loading..." : "Upload"
                    }
                    </div>
                </label>
                <input onChange={handleUploadAvatar}
                    type='file' id='uploadProfile' className='hidden'
                />
            </form>

           
       </div>
    </section>
  )
}

export default UserProfileEdit
