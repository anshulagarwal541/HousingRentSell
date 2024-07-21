import React from 'react'

function Statistics({ icon, text, stats }) {
    return (
        <div className='bg-transparent flex flex-col gap-5 w-1/4 py-10 px-20'>
            <div className='rounded-full bg-white w-fit p-5 flex justify-center items-center'>
                <img src={icon} alt="" />
            </div>
            <p className='font-bold text-5xl'>
                {stats}
            </p>
            <p className='text-[#406f85] font-bold text-xl'>
                {text}
            </p>
        </div>
    )
}

export default Statistics;