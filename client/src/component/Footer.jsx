import React from 'react'
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";

const Footer = () => {
  return (
    <footer className='border-t'>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
        <p>© All rights reserved</p>

        <div className='flex items-center gap-4 justify-center text-2xl'>
            <a href='' className='hover:text-blue-500'>
                <FaFacebook/>
            </a>
            <a href='' className='hover:text-rose-600'>
                <FaInstagram/>
            </a>
        </div>
        </div>
    </footer>
  )
}

export default Footer
