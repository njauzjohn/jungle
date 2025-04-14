import React, { useEffect, useState } from 'react'
import banner from '../assets/banner.avif'
import { useSelector } from 'react-redux'
import ProductCategory from '../component/ProductCategory'
import { Link } from 'react-router-dom'



const HomeDisplay = ({id,name}) => {

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
        
        {/***display category 53:14*/}
         
          <Link to={"url"}>
              {
                    categoryData?.map((c,index)=>{
                      return (
                      <div className='p-4'>
                          <ProductCategory key={c?._id+"categoryProducts"} id={c?._id} name={c?.name}/>
                      </div>
                      )
                    })
                  }
          </Link>
  
        
      </section>
    )
}

export default HomeDisplay
