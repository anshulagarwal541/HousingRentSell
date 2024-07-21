import React from 'react'

function AgentExperience() {
    return (
        <div className='w-[90%] mx-auto flex flex-wrap gap-10 justify-center py-5 rounded-2xl items-center bg-white border border-1 border-black'>
            <div className='w-1/4 flex flex-col gap-2 justify-center items-center'>
                <p className='font-bold text-3xl'>Experience</p>
                <p>15+ years experience</p>
            </div>
            <div className='w-1/4 flex flex-col gap-2 justify-center items-center'>
                <p className='font-bold text-3xl'>
                    Property Types
                </p>
                <p>
                    Private House, Villa, Townhouse, Apartment
                </p>
            </div>
            <div className='w-1/4 flex flex-col gap-2 justify-center items-center'>
                <p className='font-bold text-3xl'>Area</p>
                <p>California, San Jose, Miami</p>
            </div>
            <div className='w-1/4 flex flex-col gap-2 justify-center items-center'>
                <p className='font-bold text-3xl'>Address</p>
                <p>59 Orchard, NY 5005, US</p>
            </div>
            <div className='w-1/4 flex flex-col gap-2 justify-center items-center'>
                <p className='font-bold text-3xl'>License No</p>
                <p>BF-0535</p>
            </div>
        </div>
    )
}

export default AgentExperience