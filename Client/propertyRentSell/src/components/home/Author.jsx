import React from 'react'
import profilePic from "../../assets/profilePic.jpg";
function Author() {
    return (
        <div className='flex flex-row bg-[#ffffff] py-10 items-center justify-center'>
            <div className=' w-1/4 flex items-center justify-center'>
                <img src={profilePic} alt="" className='rounded-3xl h-[344px]' />
            </div>
            <div className='w-1/2 flex flex-col gap-10'>
                <div className='flex flex-row justify-between px-10'>
                    <div>
                        <p className='font-bold text-2xl'>Rachit Agarwal</p>
                        <p className='text-xl'>Mern-Web Developer</p>
                    </div>
                    <div>
                        <img src="https://dhws-production.s3.ap-south-1.amazonaws.com/6623ef7b4f4d3e00184bdf23/6625525830b6e3002202d92b/6625525830b6e3002202d935/appSource/images/img_shape.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPSYFWYAO2%2F20240425%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240425T172940Z&X-Amz-Expires=25200&X-Amz-Signature=083b4a071b5aa4fdbe86fd0a45a1da20cc84d1a8e739290525a12a2728c62c2f&X-Amz-SignedHeaders=host" alt="" />
                    </div>
                </div>
                <div className=''>
                    <p className='text-2xl'>
                        Eget eu massa et consectetur. Mauris donec. Leo a, id sed duis proin sodales. Turpis viverra diam porttitor mattis morbi ac amet. Euismod commodo. We get you customer relationships that last.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Author