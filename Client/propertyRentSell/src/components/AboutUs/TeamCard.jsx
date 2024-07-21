import React from 'react'
import profilePic from "../../assets/profilePic.jpg";

function TeamCard({ member }) {
    return (
        <div className='flex flex-col gap-5 items-start w-[20%] rounded-3xl'>
            <img src={profilePic} alt="" className='rounded-3xl h-[282px] w-[100%]' />
            <div className='flex flex-col'>
                <p className='font-bold text-2xl'>
                    {member.name}
                </p>
                <p className='text-[#626262] text-lg'>
                    {member.position}
                </p>
            </div>
        </div>
    )
}

export default TeamCard