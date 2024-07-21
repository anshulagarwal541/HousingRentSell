import React from 'react'

function NewsCard({ image, text }) {
    return (
        <div className='w-[384px] flex flex-col gap-5'>
            <div>
                <img src={image} alt="" className='h-[350px]' />
            </div>
            <div>
                <p className='font-bold text-xl'>
                    {text}
                </p>
            </div>
            <div>
                <button className='text-orange-500 font-bold text-xl'>Explore More </button>
            </div>
        </div>
    )
}

export default NewsCard;