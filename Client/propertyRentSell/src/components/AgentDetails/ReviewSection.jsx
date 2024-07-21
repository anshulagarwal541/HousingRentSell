import React, { useState, useEffect } from 'react'
import plus from "../../assets/AgentProfile/plus.svg";
import ReactStars from "react-rating-stars-component";
import { useContext } from 'react';
import { AuthContext } from '../../Helpers/AuthContext';
import axios from 'axios';
import ReviewCard from './ReviewCard';
import { Snackbar, Alert } from '@mui/material';
function ReviewSection({ user }) {
    const { teamMember, setTeamMember, id, setOpen, setErrorMessage, url, setAlert, setAlertMessage, setAlertType } = useContext(AuthContext);
    const [rating, setRating] = useState(0);
    const [writeReview, setWriteReview] = useState(false);
    const [agentReview, setAgentReview] = useState(null);
    const [sliceReview, setSliceReview] = useState(null);
    const [reviewed, setReviewed] = useState(false);
    const [end, setEnd] = useState(6)
    const ratingChanged = (newRating) => {
        setRating(newRating);
    };
    useEffect(() => {
        setAgentReview(teamMember.reviews);
        setSliceReview(teamMember.reviews.slice(0, 3));
    }, [])

    const handlePostReview = (e) => {
        e.preventDefault();
        const member=localStorage.getItem("accessMemberToken");
        if(member)
        {
            setAlert(true)
            setAlertType("error")
            setAlertMessage("Only Users are allowed to review an agent.!!")
            return;
        }
        const formData = new FormData(e.target);
        const data = {
            review: formData.get('review'),
            rating: rating,
            agent: teamMember._id,
            user: user._id
        };
        axios.post(`${url}/review`, data,
            {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            }).then((response) => {
                if (!response.data.error) {
                    setTeamMember(response.data);
                    setAgentReview(response.data.reviews);
                    setSliceReview(response.data.reviews.slice(0, 3));
                    setReviewed(true)
                }
                else {
                    setErrorMessage(response.data.error);
                    setOpen(true)
                }
            })
        setWriteReview(false);
    }

    const loadReview = () => {
        setSliceReview(agentReview.slice(0, end));
        setEnd(end + 3);
    }

    const handleClose = () => {
        setReviewed(false);
    }

    return (
        <div className='relative'>
            <Snackbar
                open={reviewed}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                key={'top' + 'center'}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Review submitted successfully... !!
                </Alert>
            </Snackbar>
            <div className={`border ${writeReview ? "blur-sm" : ""} border-b-1 border-b-black`}>
                <div className='flex justify-between px-10 py-5 '>
                    <p className='font-bold text-3xl'>Clients Review</p>
                    <button onClick={() => { setWriteReview(!writeReview) }} className='bg-black text-white flex gap-3 items-center px-5 py-3 rounded-xl text-xl font-bold'>Write a Review <img src={plus} alt="" /></button>
                </div>
            </div>
            {agentReview && sliceReview && (
                <div className={`border ${writeReview ? "blur-sm" : ""} flex flex-col gap-5 py-5`}>
                    {sliceReview.map((review, key) => {
                        return <ReviewCard key={key} detail={review} />
                    })}
                    {agentReview.length === sliceReview.length ? "" : (
                        <button onClick={loadReview} className='border border-1 w-[95%] bg-black text-white mx-auto rounded border-black py-2'>See more</button>
                    )}
                    {agentReview.length === 0 && (
                        <p className='font-bold text-2xl text-center'>No reviews yet.</p>
                    )}
                </div>
            )}
            {writeReview && (
                <form action="POST" onSubmit={handlePostReview}>
                    <div className='absolute p-5 flex flex-col gap-5 bg-blend-saturation w-[500px] h-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white border border-1 border-black rounded-2xl'>
                        <div>
                            <p className='font-bold text-3xl'>Select star :-</p>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={80}
                                activeColor="#ffd700"
                            />
                        </div>
                        <div className='flex gap-3 flex-col'>
                            <p className='font-bold text-3xl'>Write a review :- </p>
                            <textarea name="review" rows="10" placeholder='write a message' className='w-[100%] rounded px-3 border border-1 border-black' ></textarea>
                        </div>
                        <button type="Submit" className='bg-black px-5 py-2 text-white'>Submit</button>
                        <button onClick={() => { setWriteReview(!writeReview) }} className='bg-black px-5 py-2 text-white'>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ReviewSection