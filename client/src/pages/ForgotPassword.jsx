
import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword =()=> {

    const [data,setData] = useState({
       
        email : "",
       
       
    })

    
    
    const navigate = useNavigate()

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
                ...SummaryApi.forgot_password,
                data :data
            })

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                    navigate("/verification-otp",{
                        state : data
                    })
                setData({
                   
                    email : ""
                    
                 
                })
            }

            //console.log("response",response)
        } catch (error) {
            AxiosToastError(error)
        }

        
    }
  return (
    <section className=' w-full container mx-auto px-4'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
            <p className='font-semibold text-lg'> Forgot Password</p>
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

                <button disabled={!validateValue} className={`${validateValue ? "bg-green-500 hover:bg-green-700" : "bg-gray-500" } w-full  text-white my-3 py-2 rounded font-semibold `}>Send OTP</button>
            </form>

            <p>
                already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800' >Login</Link>
            </p>
        </div>
    </section>
  )
}

export default ForgotPassword




