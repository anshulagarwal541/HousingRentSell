import React from 'react'
import StarRatings from 'react-star-ratings';
import { Navigate, useNavigate } from 'react-router-dom';
function PeopleCard({ member }) {
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/chat/${id}`)
    }
    return (
        <div className='w-[90%] bg-[#fff9f6] mx-auto font-bold text-xl rounded-3xl border-2 border-black py-5 px-3 flex justify-center gap-5'>
            <div className='w-1/4'>
                <img src={member.image} alt="" className='rounded-3xl' />
            </div>
            <div className='w-1/4 flex flex-col justify-evenly'>
                <p>{member.name}</p>
                <p>{member.memberId}</p>
                <p>{member.position}</p>
            </div>
            <div className='w-1/4 flex flex-col justify-evenly'>
                <p>{member.email}</p>
                <p>{member.phone}</p>
                <p>
                    <StarRatings
                        rating={member.totalRating}
                        starDimension="20px"
                        starSpacing="2px"
                        numberOfStars={5}
                    />
                    {/* {member.reviews} */}
                </p>
            </div>
            <div className='flex justify-center items-center'>
                <button onClick={()=>{handleClick(member._id)}} className='bg-[#626262] font-bold text-white px-10 py-4 rounded h-fit'>Chat</button>
            </div>
        </div>
    )
}

export default PeopleCard