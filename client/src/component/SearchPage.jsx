import React, { useEffect, useState } from 'react'
import ProductCardDisplay from './ProductCardDisplay'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from './CardProduct'


function SearchPage() {

  const [data,setData]=useState([])
  const [loading,setLoading] = useState(false)
  const loadingCardArray =new Array(10).fill(null)
  const [page,setPage] = useState(1)
  const [totalPage,setTotalpage] = useState(1)
  
  const fetchData = async()=>{
    try {
        setLoading(true)
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data : {
          search : ""
        }

      })

      const { data : responseData} = response

      if(responseData.success){
        if(responseData.page==1){
          setData(responseData.data)   
        }else{
            setData((preve)=>{
              return[
                ...preve,
                ...responseData.data
              ]
            })
        }
        setTotalpage(responseData.totalPage)
        console.log("search",responseData)
        console.log("data",data)
      }
    } catch (error) {
      AxiosToastError(error)
    }
    finally{
      setLoading(false)
    }
    
  }

  

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <section className='p-4' >
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
           
           {
              data?.map((p,index)=>{
                return (
                  <CardProduct data={p} key={p?._id+"searchProduct"+index}/>
                )
              })
           }
           
           {
            loading && (
              loadingCardArray.map((_,index)=>{
                return (
                  <ProductCardDisplay key={"searchPage"+index}/>
                )
              })

            )
           }
        </div>
      </div>
    </section>
  )
}

export default SearchPage
