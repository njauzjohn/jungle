import React, { useEffect, useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast'

import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';

const RegisterUser = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    console.log("data", data)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }

    const validateValue = Object.values(data).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password !== data.confirmPassword) {
            toast.error(
                "password doesn't match"
            )
            return
        }
        console.log("data", data)

        try {
            console.log("reg")
            const response = await Axios({
                ...SummaryApi.register,
                data: data
            })

            console.log("register", data)

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                navigate("/login")
            }

            console.log("response",response)
        } catch (error) {
            AxiosToastError(error)
           /// console.log(error.response.data.message)
        }


    }
    return (
        <section className=' w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p>welcome to jungleBook</p>
                <p>use dummy account i.e
                    doe@gmai.com
                    
                </p>
                <form className='' onSubmit={handleSubmit}>
                    <div className='grid gap-2 mt-6'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            id='name'
                            autoFocus
                            className='bg-blue-100 p-2 border rounded outline-none focus-within:border-amber-300'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter your Name'
                        />
                    </div>

                    <div className='grid gap-1 mt-2'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='text'
                            id='email'
                            className='bg-blue-100 p-2 border rounded outline-none focus-within:border-amber-300'
                            name='email'
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
                                id='password'
                                autoFocus
                                className='bg-white w-full outline-none '
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />

                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showPassword ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )
                                }

                            </div>
                        </div>

                    </div>

                    <div className='grid gap-1 mt-2'>
                        <label htmlFor='confirmPassword'>ConfirmPassword:</label>
                        <div className='bg-blue-100 p-2 border outline-none rounded flex items-center focus-within:border-amber-300'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                autoFocus
                                className='bg-white w-full outline-none '
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your Confirm-password'
                            />

                            <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showConfirmPassword ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )
                                }

                            </div>
                        </div>

                    </div>

                    <button disabled={!validateValue} className={`${validateValue ? "bg-green-500 hover:bg-green-700" : "bg-gray-500"} w-full  text-white my-3 py-2 rounded font-semibold `}>Register</button>
                </form>

                <p>
                    Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800' >Login</Link>
                </p>
            </div>
        </section>
    )
}

export default RegisterUser
