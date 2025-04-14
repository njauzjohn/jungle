import React, { useEffect, useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Search=()=> {
    const navigate = useNavigate()
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false)

    useEffect(()=>{
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    },[location])

    const redirectToSearchPage =()=>{
        navigate("/search")
    }
    console.log("search",isSearchPage)

  return (
    <div className='w-full min-w-[300px] lg:min-w-[420] h-12 rounded-lg border overflow-hidden flex items-center text-slate-500 text-0.5px '>
      <button className='flex justify-center items-center h-full  text-slate-400'>
      <IoMdSearch size={22} />
      </button>
      <div className='w-full'>
        {
            !isSearchPage ? (
                <div onClick={redirectToSearchPage} className='w-full h-full item-center'>
                    <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed once, initially
                                'search "electronics"',
                                1000,
                                'search "network"',
                                1000,
                                'search "vehicle"',
                                1000,
                                'search "bnb"',
                                1000,
                                'search "water"',
                                1000,
                                'search "sewer"',
                                1000,
                                'search "funiture"',
                                1000,
                                'search "pets"',
                                1000,
                                'search "huwawa"',
                                1000,
                                'search "chiwawa"',
                                1000,
                                'search "kitchen appliances"',
                                1000,
                                'search "servers"',
                                1000,
                                'search "fiber cabes"',
                                1000,
                                'search "electric cabes"',
                                1000,
                                'search "designers near me"',
                                1000,
                                'search "mechanics"',
                                1000,
                                'search "computer helper"',
                                1000,
                                'search "computer maintance"',
                                1000,
                                'search "interns"',
                                1000,
                                'search "access denied (-:-)"',
                                1000,
                                'search "building materials"',
                                1000,
                                'search "pet foods"',
                                1000,
                                'search "animal feeds"',
                                1000,
                                'search "assistance near me"',
                                1000,
                                'search "taxify near me"',
                                1000,
                                'search "glocery near me"',
                                1000,
                                'search "personal assistance at me"',
                                1000,
                                'search "work-shop off i in jungle"',
                                1000,
                                'search "personel in particular area"',
                                1000,
                                'search "cleaner within area in estates"',
                                1000,
                                'search "uber eat"',
                                1000,
                                'search "uber"',
                                1000,
                                'search "pizza in"',
                                1000,
                                'search "garbage collector near me"',
                                1000,
                                'search "garbage item in hands.. "',
                                1000,
                                'search "personel in health "',
                                1000,
                                'search "securty in jungle near me"',
                                1000,
                                'search ""',
                                1000,
                            ]}
                            wrapper='span'
                            speed={50}
                            
                            repeat={Infinity}
                        />
                    </div>
            ) : (
                <div className='h-full w-full'>
                    <input
                    type = 'text'
                    placeholder='search...'
                    className='bg-slate-200 w-full h-full outline-none'
                    />
                </div>
            )
        }
    </div>
   
    </div>

)}
      

export default Search
