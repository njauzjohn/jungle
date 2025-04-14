import React from 'react'
import noData from '../assets/no-data.jpg'

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4 gap-2'>
      <img

        src={noData}
        alt = 'no data'
        className='w-32'

      />
      <p className='text-neutral-600'>No Data</p>
    </div>
  )
}

export default NoData
