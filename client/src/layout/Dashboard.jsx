import React from 'react'
import UserMenu from '../component/UserMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <section className='bg-white'>
      <div className=' container mx-auto p-3 grid lg:grid-cols-2  '>
        <div  className='py-2 sticky top-24 max-h-[calc(100vh-100px)] overflow-y-auto max-w-40  hidden lg:block border-right'>
          <UserMenu/>
        </div>
        <div className=' bg-white min-h-[79vh] ' >
            <Outlet/>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
