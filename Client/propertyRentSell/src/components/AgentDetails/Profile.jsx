import React from 'react'
import StarRatings from 'react-star-ratings';
function Profile({ teamMember }) {
    return (
        <div className='flex gap-10 items-center w-[90%] mx-auto justify-evenly py-5'>
            <img src={teamMember.image} alt="" className='h-[150px] w-[150px] object-cover rounded-2xl' />
            <div>
                <p className='font-bold text-xl'>{teamMember.name}</p>
                <p>
                    <StarRatings
                        rating={teamMember.totalRating}
                        starDimension="15px"
                        starSpacing="2px"
                        numberOfStars={5}
                    />
                    <div>
                        {teamMember.totalRating} reviews
                    </div>
                </p>
            </div>
            <div>
                <p className='font-semibold text-lg'>{teamMember.email}</p>
                <p className='font-semibold text-lg'>{teamMember.phone}</p>
            </div>
            <button className='bg-black text-white px-5 py-3 rounded-2xl text-xl'>Contact</button>
        </div>
    )
}

export default Profile