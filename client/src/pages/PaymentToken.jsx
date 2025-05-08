import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserdetail';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/UserSlice.js';


const PaymentToken = (request,response) => {
 
    const [data,setData] = useState({
       
        email : "",
        password : "",
       
    })

    

    console.log("login",data)

    const [showPassword,setShowPassword] = useState(false)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChange =(e)=>{
        const { name,value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })

    }

    const validateValue = Object.values(data).every(el => el)

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.paymentTokens,
                data :data
            })

            if(response?.data?.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('paymentToken',response.data.data.paymentToken)
                //localStorage.setItem('refreshToken',response.data.data.refreshToken)
                
                const userDetails =await fetchUserDetails()
                dispatch(setUserDetails(userDetails?.data))
                setData({
                   
                    email : "",
                    password : "",
                 
                })
                navigate("/dashboard/upload-product")
            }

            //console.log("response",response)
        } catch (error) {
            AxiosToastError(error)
           

        }

        
    }
  return (
    <section className=' w-full container mx-auto px-4'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
            <p>welcome to jungle Payment Plans</p>
            <form className='' onSubmit={handleSubmit}>
               

                <div className='grid gap-1 mt-2'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='text'
                        id = 'email'          
                        className='bg-blue-100 p-2 border rounded outline-none focus-within:border-amber-300'
                        name = 'email'
                        value={data.email}
                        onChange={handleChange}
                        placeholder='Enter your Email'
                    />
                </div>

                <div className='grid gap-1 mt-2'>
                    <label htmlFor='password'>Password:</label>
                    <div className='bg-blue-100 p-2 border outline-none rounded flex items-center focus-within:border-amber-300'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id = 'password'
                            autoFocus
                            className='bg-white w-full outline-none '
                            name = 'password'
                            value={data.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
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
                    {/* <Link to={"/forgot-password"} className='block ml-auto hover:text-green-700'>Forgot Password</Link>
                */}

                 </div> 

               

                <button disabled={!validateValue} className={`${validateValue ? "bg-green-500 hover:bg-green-700" : "bg-gray-500" } w-full  text-white my-3 py-2 rounded font-semibold `}>Login</button>
            </form>

            {/* <p>
                Dont't have account ? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800' >Register</Link>
            </p> */}
        </div>
    </section>
  )
}

export default PaymentToken
