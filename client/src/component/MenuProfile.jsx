import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LuCircleUserRound } from "react-icons/lu";
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import { setUserDetails } from '../store/UserSlice';
import fetchUserDetails from '../utils/fetchUserdetail';
import AxiosToastError from '../utils/AxiosToastError';

const MenuProfile = ({ id}) => {

    const [data, setData] = useState([])
    
    const dispatch = useDispatch()
   // const user = useSelector(state => state.user)



    const fetchCategoryProduct = async () => {

       // userMenuProfile
        try {
            const response = await Axios({
                ...SummaryApi.userMenuProfile,
                data : {
                    _id : id
                }
            })

            const {data : responseData} = response
            console.log("UserCategory", responseData)

            if(responseData.success)
                setData(responseData.data)


            //return response.data
        } catch (error) {
            console.log(error)
        }


        // try {
        //     // setLoading(true)
        //     const responsed = await Axios({
        //         ...SummaryApi.updateMenuProfile,
        //         data: {
        //             id: id
        //         }
        //     })

        //     const { data: responseData } = responsed

        //     if (responseData.success)
        //         setData(responseData.data)

        //     console.log("ProductAvatar", responseData)

        // } catch (error) {
        //     // AxiosToastError(error)
        //     console.log(error)
        // }
        // finally {
        //     // setLoading(false)
        // }
    }



    useEffect(() => {
        fetchCategoryProduct()
    }, [])


    return (
        // <div className='w-10 py-2 flex items-center justify-center rounded-full  drop-shadow-lg'>


        // {

        //     data?.avatar ?  (
        //         <div>
        //                 <img
        //                 alt= {data?.name}
        //                 src={data?.avatar}
        //                 className='' 

        //             />
        //             <div>
        //                 //<p>{user?.name}</p>
        //             </div>
        //         </div>


        // ) : (

        // <LuCircleUserRound size={22}/>
        // )
        // }

        // </div>

        // <div>
        //      <span>{user.name || user.avatar} <span>{user.role === "ADMIN" ? "(Admin)" : "" }</span></span>
        // </div>

        <div className='w-10 flex items-center justify-center rounded-full py-3 drop-shadow-lg'>
            {

                data._id ? (
                    <div>
                        <div>
                            <img
                                alt={data.name}
                                src={data.avatar}
                                className='rounded-full'

                            />
                        </div>
                        <div>
                            <p>{data.name}</p>
                        </div>
                    </div>
                ) : (

                    <LuCircleUserRound size={22} />
                )   
            }
        
        </div>
    )
}

export default MenuProfile
