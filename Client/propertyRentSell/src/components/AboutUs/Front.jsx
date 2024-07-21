import React from 'react'
import front1 from "../../assets/AboutUs/front1.png";
import front2 from "../../assets/AboutUs/front2.png";
import front3 from "../../assets/AboutUs/front3.png";
import front4 from "../../assets/AboutUs/front4.png";
function Front() {
    return (
        <div className='flex flex-col items-center justify-center gap-10 py-10'>
            <div className=' w-[50%]'>
                <p className='font-bold text-5xl text-center'>
                    Reimagining real estate to
                    make it easier to unlock.
                </p>
            </div>
            <div className=' w-[70%]'>
                <p className='text-[#626262] text-lg text-center'>
                    On the other hand, we denounce with righteous indignation and dislike men who
                    are so beguiled and demoralized by the charms of pleasure of the moment,
                    so blinded by desire, that they cannot foresee the pain and trouble.
                </p>
            </div>
            <div className='flex gap-5 flex-col'>
                <div className='flex flex-row items-center gap-5'>
                    <img src={front1} alt="" className='h-[400px]' />
                    <img src={front2} alt="" className='h-[400px]'  />
                </div>
                <div className='flex flex-row items-center gap-5'>
                    <img src={front3} alt=""  className='h-[400px]' />
                    <img src={front4} alt=""  className='h-[400px]' />
                </div>
            </div>
        </div>
    )
}

export default Front