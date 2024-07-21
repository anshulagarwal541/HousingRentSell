import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Helpers/AuthContext'
function ApplicationCard({ application, number }) {
    const { setApplications, url } = useContext(AuthContext);
    const handleContacted = () => {
        const data = {
            _id: application._id
        }
        axios.post(`${url}/updateApplication`, data, {
            headers: {
                accessMemberToken: localStorage.getItem('accessMemberToken')
            }
        }).then((response) => {
            if (!response.data.error) {
                setApplications(response.data);
            }
            else {
                console.log(response.data.error);
            }
        })
    }
    return (
        <div className='flex h-[25rem] px-5 py-5 rounded-xl mx-auto bg-[#fff9f5] w-[40rem] justify-between'>
            <div className='w-[45%] flex flex-col justify-evenly'>
                <p className='text-center bg-yellow-600 text-white text-2xl font-bold rounded border border-black'>S.No - {number}</p>
                <p className='text-center text-2xl font-bold'>Client</p>
                <p className='font-semibold'>Name - {application.user.username}</p>
                <p className='font-semibold'>Phone - {application.user.phone}</p>
                <p className='font-semibold'>Email - {application.user.email}</p>
                <p className='font-semibold'>Submitted on - {application.user.date}</p>
                <p className=''>Message - {application.message}</p>
                <p className='font-semibold'>Property - <Link to={`/property/${application.property._id}`} className='bg-black text-white px-8 py-3 rounded-2xl'>View Details</Link></p>
            </div>
            <div className='w-[45%] flex flex-col justify-between'>
                <p className='font-semibold'>Agent Name - {application.agent.name}</p>
                <p className='font-semibold'>Position - {application.agent.position}</p>
                <p className='font-semibold'>Email - {application.agent.email}</p>
                <p className='font-semibold'>Rating - {application.agent.totalRating}</p>
                <p className='font-semibold'>Property Head - {application.controller.name} (CEO)</p>
                <p className='font-semibold'>Status - <span className={`${application.status == "pending" ? "text-red-600 border-red-600" : "text-green-950 border-green-950"} rounded-xl text-xl w-fit px-5 py-2 border-2 font-bold`}>{application.status}</span></p>
                {application.status == "pending" ? (<button onClick={handleContacted} className='bg-green-950 text-white px-8 py-3 rounded-2xl '>Mark as Contacted</button>) : ""}
                {/* {query.reply ?
                    (
                        <div className='flex flex-col gap-5 justify-start w-full h-full'>
                            <p className='font-bold text-center h-[24px]'>Reply</p>
                            <p className='text-justify text-sm -[180px]'>
                                {query.reply}
                            </p>
                        </div>
                    )
                    :
                    (
                        <form onSubmit={handleQuerySubmit} action="POST" className='w-full flex flex-col gap-5'>
                            <textarea className='w-full rounded-xl px-3 py-1 border border-1 border-black' rows="8" name="reply" id="reply" placeholder='enter your reply here..'></textarea>
                            <button type="Submit" className='bg-black px-5 py-2 font-bold text-white w-full rounded-xl'>Reply</button>
                        </form>
                    )
                } */}

            </div >
        </div >
    )
}

export default ApplicationCard