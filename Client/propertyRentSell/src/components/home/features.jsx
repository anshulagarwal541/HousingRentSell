import React from 'react'
import face from "../../assets/face.svg";
import bag from "../../assets/bag.svg";
import eye from "../../assets/eye.svg";
import search from "../../assets/search.svg";
import Boxes from './boxes';
function Features() {
    return (
        <div className='w-[90%] mx-auto mt-10 mb-10 flex sm:flex-row flex-col gap-5 justify-between'>
            <div className='w-1/2 bg-[#ffe0ce] rounded-2xl py-10 px-5 flex flex-col items-start justify-evenly'>
                <p className='font-bold text-4xl'>
                    Simple & easy way to find your dream Appointment
                </p>
                <p className='text-xl'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <button className='bg-black text-white py-3 px-10 font-bold rounded-lg'>Get Started</button>
            </div>
            <div className='w-1/2 flex flex-col gap-10'>
                <div className='flex flex-row gap-5'>
                    <Boxes image={search} text="Search your location" />
                    <Boxes image={eye} text="Visit Appointment" />
                </div>
                <div className='flex flex-row gap-5'>
                    <Boxes image={bag} text="Get your dream house" />
                    <Boxes image={face} text="Enjoy your Appointment" />
                </div>
            </div>
        </div>
    )
}

export default Features