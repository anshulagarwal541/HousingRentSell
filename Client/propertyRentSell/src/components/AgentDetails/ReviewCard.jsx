import React from 'react'
import StarRatings from 'react-star-ratings';
function ReviewCard({ detail }) {
    return (
        <div className='w-[95%] border border-1 border-black rounded-xl mx-auto px-10 py-5'>
            <p className='text-[#6e6e6e] font-semibold text-3xl py-5'>{detail.review}</p>
            <div className='flex gap-10'>
                <StarRatings
                    rating={detail.rating}
                    starDimension="20px"
                    starSpacing="2px"
                    numberOfStars={5}
                />
                <p>{detail.rating} reviews</p>
            </div>
            <p className='font-bold text-2xl py-5'>{detail.user.username}</p>
        </div>
    )
}

export default ReviewCard