import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';

const Resetpassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] =useState({
        email : "",
        newPassword : "",
        confirmPassword : ""

    })
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword, setConfirmPassword] = useState(false)
    const validateValue = Object.values(data).every(el => el)
    
    useEffect(()=>{
        if(!(location?.state?.data?.success)){
            navigate("/")
        }

        if(location?.state?.email){
            setData((preve)=>{
                return{
                    ...preve,
                    email : location?.state?.email
                }
            })
        }
    },[])
   
    console.log("reset password",data)

    const handleChange =(e)=>{
        const { name,value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })

    }

    

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(data.newPassword !== data.confirmPassword){
            toast.error("Password must match")
        }
        try {
            const response = await Axios({
                ...SummaryApi.reset_password,
                data :data
            })

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/login")
                setData({
                   
                    email : "",
                    newPassword : "",
                    confirmPassword : ""
                 
                })
               
            }

            //console.log("response",response)
        } catch (error) {
            AxiosToastError(error)
        }

        
    }
   // console.log("reset data", data)

    //console.log("resetPassword page",location)
  return (
    <section className=' w-full container mx-auto px-4t'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
         
            <form className='' onSubmit={handleSubmit}>
                <div className='grid gap-1 mt-2'>
                    <label htmlFor='newpassword'>New Password:</label>
                    <div className='bg-blue-100 p-2 border outline-none rounded flex items-center focus-within:border-amber-300'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id = 'password'
                           
                            className='bg-white w-full outline-none '
                            name = 'newPassword'
                            value={data.newPassword}
                            onChange={handleChange}
                            placeholder='Enter your New password'
                        />

                        <div onClick={()=> setShowPassword(preve => !preve)} className='cursor-pointer'>
                            {
                                showPassword ? (
                                    <FaEye/>
                                ) : (
                                    <FaEyeSlash/>
                                )
                            }
                        
                        </div>
                    </div>
                    
                </div>

                <div className='grid gap-1 mt-2'>
                    <label htmlFor='confirmPassword'>New Password:</label>
                    <div className='bg-blue-100 p-2 border outline-none rounded flex items-center focus-within:border-amber-300'>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id = 'password'
                           
                            className='bg-white w-full outline-none '
                            name = 'confirmPassword'
                            value={data.confirmPassword}
                            onChange={handleChange}
                            placeholder='Enter your New password'
                        />

                        <div onClick={()=> setConfirmPassword(preve => !preve)} className='cursor-pointer'>
                            {
                                showConfirmPassword ? (
                                    <FaEye/>
                                ) : (
                                    <FaEyeSlash/>
                                )
                            }
                        
                        </div>
                    </div>
                    
                </div>

               

                <button disabled={!validateValue} className={`${validateValue ? "bg-green-500 hover:bg-green-700" : "bg-gray-500" } w-full  text-green my-3 py-2 rounded font-semibold `}>confirm</button>
            </form>

            <p>
                already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800' >Login</Link>
            </p>
        </div>
    </section>
  )
}

export default Resetpassword

