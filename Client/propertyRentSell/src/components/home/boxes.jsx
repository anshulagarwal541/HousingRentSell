import React from 'react'

function Boxes({image, text}) {
    
  return (
    
    <div className='bg-[#fbeee6] p-10 rounded-2xl w-1/2 flex flex-col gap-10'>
        <img src={image} alt="" className='w-1/6' />
        <p className='font-bold text-2xl'>
            {text}
        </p>
    </div>
  )
}

export default Boxes;