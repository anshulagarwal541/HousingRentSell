import React from 'react'
import "../../stylesheets/Home/home.css";
import house1 from "../../assets/house1.png";
import house2 from "../../assets/house2.png";
import house3 from "../../assets/house3.png";
import house4 from "../../assets/house4.png";
import bestRated from "../../assets/bestRatedHouse.png"

function Details() {
    return (
        <div className='bg-[#fff9f5]'>
            <div className=' flex flex-row p-10'>
                <div className='w-1/2 px-10 flex flex-col items-start gap-10 justify-center'>
                    <p className='font-bold text-3xl'>
                        Simple & easy way to find your dream Appointment
                    </p>
                    <p className='text-[#626262] '>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed.
                    </p>
                    <button className='bg-black text-white px-10 py-5 rounded-2xl'>Get Started</button>
                </div>
                <div className='w-1/2 flex flex-row gap-5'>
                    <div className='flex gap-5 flex-col'>
                        <img src={house1} alt="" className='h-[327px]' />
                        <img src={house3} alt="" className='h-[218px]' />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <img src={house2} alt="" className='h-[218px]' />
                        <img src={house4} alt="" className='h-[327px]' />
                    </div>
                </div>
            </div>
            <div className='flex flex-row p-10'>
                <div className='w-1/2 flex justify-center'>
                    <div className='w-[74%] h-[589px]'>
                        <img src={bestRated} alt="" />
                    </div>
                </div>
                <div className='w-1/2 flex justify-center flex-col gap-10'>
                    <p className='font-bold text-3xl'>
                        Best rated host on popular rental sites
                    </p>

                    <p className='text-[#626262] text-xl'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. In a free hour, when our power of choice is untrammelled
                    </p>

                    <p className='flex flex-col gap-5'>
                        <div className='flex flex-row gap-5 font-bold text-xl'>
                            <span>
                                <img src="https://dhws-production.s3.ap-south-1.amazonaws.com/6623ef7b4f4d3e00184bdf23/6625525830b6e3002202d92b/6625525830b6e3002202d935/appSource/images/img_icon_check.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPSYFWYAO2%2F20240425%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240425T172940Z&X-Amz-Expires=25200&X-Amz-Signature=a9cbdb52be5c798e8ea9acb3aff1497a4c2e5c13fe11524f9f7c6f6e8727a0ce&X-Amz-SignedHeaders=host" alt="" />
                            </span>
                            <p>
                                Find excellent deals
                            </p>
                        </div>
                        <div className='flex flex-row gap-5 font-bold text-xl'>
                            <span>
                                <img src="https://dhws-production.s3.ap-south-1.amazonaws.com/6623ef7b4f4d3e00184bdf23/6625525830b6e3002202d92b/6625525830b6e3002202d935/appSource/images/img_icon_check.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPSYFWYAO2%2F20240425%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240425T172940Z&X-Amz-Expires=25200&X-Amz-Signature=a9cbdb52be5c798e8ea9acb3aff1497a4c2e5c13fe11524f9f7c6f6e8727a0ce&X-Amz-SignedHeaders=host" alt="" />
                            </span>
                            <p>
                                Find excellent deals
                            </p>
                        </div>
                        <div className='flex flex-row gap-5 font-bold text-xl'>
                            <span>
                                <img src="https://dhws-production.s3.ap-south-1.amazonaws.com/6623ef7b4f4d3e00184bdf23/6625525830b6e3002202d92b/6625525830b6e3002202d935/appSource/images/img_icon_check.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPSYFWYAO2%2F20240425%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240425T172940Z&X-Amz-Expires=25200&X-Amz-Signature=a9cbdb52be5c798e8ea9acb3aff1497a4c2e5c13fe11524f9f7c6f6e8727a0ce&X-Amz-SignedHeaders=host" alt="" />
                            </span>
                            <p>
                                Find excellent deals
                            </p>
                        </div>
                    </p>
                    <button className='bg-black text-white px-5 py-4 rounded-2xl font-bold'>Learn more</button>
                </div>
            </div>
        </div>
    )
}

export default Details