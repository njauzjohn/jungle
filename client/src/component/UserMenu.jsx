import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/UserSlice.js'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError.js'
import { GoLinkExternal } from "react-icons/go";
import isAdmin from '../utils/isAdmin.js'

const UserMenu = ({close}) => {

    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const navigation = useNavigate()
    
    
    const handleLogout = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.logout
            })

            if(response.data.success){
                if(close){
                    close()
                }
               
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                navigation("/login")
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    
    const handleClose=()=>{
        if(close){
            close()
        }
    }
    return (
    <div className='bg-slate-200 rounded'>
        <div className='font-semibold px-1'>My Account</div>
            <div className='text-sm flex items-center gap-2'>
                <span>{user.name || user.mobile} <span>{user.role === "ADMIN" ? "(Admin)" : "" }</span></span>
                <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-green-500'>
                    <GoLinkExternal/>
                </Link>

            </div>
        <Divider/>
        <div className='text-sm grid gap-1'>
            {
                isAdmin(user.role) && (
                    
                   
                   <Link onClick={handleClose} to={"/dashboard/category"}className='px-2 hover:bg-green-200'>Category</Link>
                     
                )
            }


            {
                 isAdmin(user.role) && (

                    <Link onClick={handleClose} to={"/dashboard/subcategory"}className='px-2 hover:bg-green-200'>Sub Category</Link>
                    
                  
                 )

             }


            {/* {
                    isAdmin(user.role) && (
    
                    )
                }
             */}
                <Link onClick={handleClose} to={"/dashboard/paymentToken"}className='px-2 hover:bg-green-200'>Upload Product</Link>
                {/* upload-product */}
                {/* {
                    isAdmin(user.role) && (
                        
                    )
                }  */}
           
                <Link onClick={handleClose} to={"/dashboard/product"}className='px-2 hover:bg-green-200'>product</Link>
               {/*  */}

            <Link onClick={handleClose} to={"/dashboard/myOrder"}className='px-2 hover:bg-green-200'>My orders</Link>
            <Link onClick={handleClose} to={"/dashboard/address"}className='px-2 hover:bg-green-200'>Save address</Link>
            <button onClick={handleLogout} className=' px-1 text-left hover:bg-slate-400 cursor-pointer'>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu
