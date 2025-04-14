import React from 'react'
import UserMenu from '../component/UserMenu'
import { IoClose } from "react-icons/io5";
const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full py-4'>
      <button onClick={()=>window.history.back()} className='block w-fit ml-auto'>
          <IoClose/>
      </button>
        <div className='container mx-auto p-3'>
            <UserMenu/>
        </div>

    </section>
  )
}

export default UserMenuMobile
