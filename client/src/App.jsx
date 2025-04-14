import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, useRouteLoaderData } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'
import toast, { Toaster} from 'react-hot-toast'
import fetchUserDetails from './utils/fetchUserdetail.js'
import { setUserDetails} from './store/UserSlice.js'
import { useDispatch } from 'react-redux'
import { setAllCategory , setSubcategory,setloadingCategory } from './store/productSlice.js'
import Axios from './utils/Axios.js'
import SummaryApi from './common/SummaryApi.js'
import AxiosToastError from './utils/AxiosToastError.js'
import { handleAddItemCart } from './store/cartProduct.js'
import GlobalProvider, { useGlobalContext } from './provider/GlobalProvider.jsx'
import CartMobileLink from './component/CartMobileLink.jsx'
const App =() => {

  const dispatch = useDispatch()

  

  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
   
    dispatch(setUserDetails(userData?.data))
   // console.log("userData",userData.data)
  }

  const fetchCategory = async()=>{
    try {
       // setLoading(true)
       dispatch(setloadingCategory(true))
        const response = await Axios({
            ...SummaryApi.getCategory
        })
        const { data : responseData} = response
        
        if(responseData.success){
          dispatch(setAllCategory(responseData.data))
            //setCategoryData(responseData.data)
        }
     //   console.log("response",responseData.data)
    } catch (error) {
        AxiosToastError(error)
    }   finally{
      dispatch(setloadingCategory(false))
    }  
}

const fetchSubCategory = async()=>{
  try {
     // setLoading(true)
      const response = await Axios({
          ...SummaryApi.getSubCategory
      })
      const { data : responseData} = response
      
      if(responseData.success){
        dispatch(setSubcategory(responseData.data))
          //setCategoryData(responseData.data)
      }
      console.log("response",responseData.data)
  } catch (error) {
      AxiosToastError(error)
  }     
}

const fetchProducts = async()=>{
 
  try {
    const response =  await Axios({
      ...SummaryApi.product,

    })

    const { data : responseData} = response


    if(responseData.success){
      //dispatch(setProduct(responseData.data))
      console.log("set-product",responseData)
    }

  } catch (error) {
    console.log(error)
  }
}

const fetchCartItem = async()=>{
  try {
    const response =  await Axios({
      ...SummaryApi.getCartItem,

    })

    const { data : responseData} = response


    if(responseData.success){
      dispatch(handleAddItemCart(responseData.data))
      console.log(responseData)
    }

  } catch (error) {
    console.log(error)
  }
}


  useEffect(()=>{
    fetchUser()
    fetchCategory()
   fetchSubCategory()
  //fetchCartItem()
    fetchProducts()
  },[])
  return (
    <GlobalProvider>
        <Header/>
          <main className='min-h-[79vh]'>
            <Outlet/>

          </main>
          
          <Footer/>
          <Toaster/>
          <CartMobileLink/>
         
   </GlobalProvider>
  )
}

export default App




