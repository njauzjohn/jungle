import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import ProductCategory from './ProductCategory'
import banner from '../assets/banner.avif'
import MenuProduct from './MenuProduct'

const MenuHome = ({id,name}) => {
    const loadinCategory = useSelector(state => state.product.loadinCategory)
    const categoryData = useSelector(state => state.product.allCategory)
    const subCategoryData = useSelector(state => state.product.subCategory)
    
    const handleProductListPage = (id,cat)=>{
      console.log("cat",id,cat)
      const subCategory = subCategoryData.find(sub=>{
        const filterData = sub.category.some(c=>{
          return c._id == id
        })
  
        return filterData ? true : null
      })
  
      const url = `/${cat.replaceAll(" ","-")}-${id} / ${subCategory.name}-${subCategory._id}`
      console.log(url)
    }
    
    return (
      <section  className=''>
        
        <div className=' bg-white container mx-auto  my-4 p-4 '>
          <div className={`w-full   rounded bg-slate-300 ${!banner && "animate-pulse"}`}>
              <img
                src={banner}
                className='min-h-5 w-full rounded '
                alt='banner'
            
              />
          </div>
         
        </div>
        <div className='container mx-auto   my-2  gap-4  p-4  w-full rounded grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 items-center justify-between bg-white shadow-md '>
       {/** */} 
          {
            loadinCategory ? (
               new Array(25).fill(null).map((c,index)=>{
              return (
                
                  
                  <div key={c._id+"productCat"} className=' rounded-full   gap-2 shadow-md animate-pulse '>
                      <div className='bg-slate-400 min-h-24'></div>
                      
                      <div className='bg-slate-400 h-8 rounded '></div>
                      
                     
                  </div>
            
                  
              )
     
            })
            ) : (
              categoryData?.map((cat,index)=>{
                return (
                  <div className='  ' key={cat._id+"proCategory"} onClick={()=>handleProductListPage(cat._id,cat.name)}>
                      <div className='bg-slate-300 rounded '>
                        <img
                          src={cat.image}
                          className='rounded-full w-full h-full object-scale-down'
                          
                        />
                        <p><p>{cat.name}</p></p>
                      </div>
                  </div>
                )
              })
              
            )
          }
        </div>
  
        {/***display category 53:14*/}
         
          <Link to={"url"}>
              {
                    categoryData?.map((c,index)=>{
                      return (
                      <div className='p-4'>
                          <MenuProduct key={c?._id+"catProducts"} id={c?._id} name={c?.name}/>
                      </div>
                      )
                    })
                  }
          </Link>
  
        
      </section>
    )
}

export default MenuHome
