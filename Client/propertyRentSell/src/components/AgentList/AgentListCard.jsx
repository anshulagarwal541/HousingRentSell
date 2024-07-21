import React from 'react'
import StarRatings from 'react-star-ratings';
import { Navigate, useNavigate } from 'react-router-dom';
function AgentListCard({ agent }) {
    const navigate = useNavigate();
    const handleView=()=>{
        navigate(`/agent/${agent._id}`)
    }
    return (
        <div className='bg-white w-fit rounded-xl border border-1 border-black'>
            <img src={agent.image} alt="profile" className='h-[282px] w-[300px] rounded-t-xl' />
            <div className='p-3 flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                    <p className='font-bold'>{agent.name}</p>
                    <p>{agent.email}</p>
                    <p className='flex gap-5'>
                        <StarRatings
                            rating={agent.totalRating}
                            starDimension="15px"
                            starSpacing="2px"
                            numberOfStars={5}
                        />
                        <div>
                            {agent.totalRating} reviews
                        </div>
                    </p>
                </div>
                <button onClick={handleView} className='border border-1 border-black w-[100%] px-2 py-1 rounded'>View Profile</button>
            </div>
        </div>
    )
}

export default AgentListCard