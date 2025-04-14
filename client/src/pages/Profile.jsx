import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LuCircleUserRound } from "react-icons/lu";
import UserProfileEdit from '../component/UserProfileEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import fetchUserDetails from '../utils/fetchUserdetail';
import { setUserDetails } from '../store/UserSlice';
const Profile = () => {

    const user = useSelector(state=> state.user)
    const [openProfileEdit, setProfileEdit] = useState(false)
    const [userData,setUserData] = useState({
        name : user.name,
        email : user.email,
        mobile : user.mobile
    })

    console.log("user",userData)

    const [loading,setLoading] = useState(false)
    const dispatch= useDispatch()
    useEffect(()=>{
         setUserData({
            name : user.name,
            email : user.email,
            mobile : user.mobile
         })
    },[user])
    const handleSubmit= async(e)=>{
        e.preventDefault()

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data : userData
            })

            const { data : responseData} = response

            if(responseData.success){
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }
  
    const handleOnChange=(e)=>{
        const {name,value} = e.target

        setUserData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    return (
    <div>
        {/***profile update */}
        <div className='w-10 flex items-center justify-center rounded-full overflow-hidden drop-shadow-lg'>
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
         <button onClick={()=>setProfileEdit(true)} className='text-xm border px-3 py-1 rounded-full hover:border-amber-500 mt-3'>Change Profile</button>
        {
            openProfileEdit && (
                <UserProfileEdit close={()=>setProfileEdit(false)}/>
            )
        }

        {/***name, email, change password */}
        <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
            <div className='grid'>
                <label>Name</label>
                <input
                    id='name'
                    type = 'text'
                    placeholder='enter name'
                    className='p-2 bg-slate-200 outline-none border focus-within:border-amber-400 '
                    value ={userData.name}
                    name='name'
                    onChange={handleOnChange}
                    required
                />
            </div>

            <div className='grid'>
                <label>email</label>
                <input
                    id='email'
                    type = 'email'
                    placeholder='enter email'
                    className='p-2 bg-slate-200 outline-none border focus-within:border-amber-400 '
                    value ={userData.email}
                    name='email'
                    onChange={handleOnChange}
                    required
                />
            </div>

            <div className='grid'>
                <label>mobile</label>
                <input
                    id='mobile'
                    type = 'text'
                    placeholder='enter mobile'
                    className='p-2 bg-slate-200 outline-none border focus-within:border-amber-400 '
                    value ={userData.mobile}
                    name='mobile'
                    onChange={handleOnChange}
                    
                />
            </div>

            <button className='rounded border px-4 font-semibold hover:bg-amber-300 border-amber-600 '>
                
                {
                    loading ? "Loading..." : "Submit"
                }
            </button>

        </form>
    </div>
  )
}

export default Profile
