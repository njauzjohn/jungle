
import React, { useEffect, useRef, useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Otpverification =()=> {

    const [data,setData] = useState(["","","","","",""])
    const location =useLocation()
    const navigate = useNavigate()
    const inputRef = useRef([])
   // console.log("location",location)
    useEffect(()=>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    },[])


    const validateValue = data.every(el => el)

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.otp_verification,
                data : {
                    otp : data.join(""),
                    email : location?.state?.email
                }
            })

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData(["","","","","",""])
                navigate("/reset-password",{
                    state : {
                        data : response.data,
                        email : location?.state?.email
                    }
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
            <p className='font-semibold text-lg'> Enter OTP</p>
            <form className='' onSubmit={handleSubmit}>
               

                <div className='grid gap-1 mt-2'>
                    <label htmlFor='otp'>Enter OTP:</label>
                    <div className='flex items-center gap-2 justify-between'>
                        {
                            data.map((element,index)=>{

                               return(
                                <input
                                    key={"otp" +index}
                                    type='text'
                                    id = 'otp'
                                    ref={(ref)=>{
                                        inputRef.current[index] = ref
                                        return ref
                                    }}
                                    value={data[index]} 
                                    onChange={(e)=>{
                                        const value = e.target.value
                                        console.log("value",value)
                                        const newData = [...data]
                                        newData[index] = value
                                        setData(newData)

                                        if(value && index<5 ){
                                            inputRef.current[index+1].focus()
                                        }
                                    }}
                                    maxLength={1}         
                                    className='text-center w-full max-w-16 bg-blue-100 p-2 border rounded outline-none focus-within:border-amber-300'
                   
                                />
                               )
                            })
                        }
                    </div>
                    
                </div>

                <button disabled={!validateValue} className={`${validateValue ? "bg-green-500 hover:bg-green-700" : "bg-gray-500" } w-full  text-white my-3 py-2 rounded font-semibold `}>Verify OTP</button>
            </form>

            <p>
                already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800' >Login</Link>
            </p>
        </div>
    </section>
  )
}

export default Otpverification





