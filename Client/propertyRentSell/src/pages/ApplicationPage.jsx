import React, { useState, useEffect, useContext } from 'react'
import QueryCard from '../components/Queries/QueryCard';
import ApplicationCard from '../components/Application/ApplicationCard';
import axios from 'axios';
import { AuthContext } from '../Helpers/AuthContext';
function ApplicationPage() {
    const [button, setButton] = useState("pending");
    const [applications, setApplications] = useState();
    const {url}=useContext(AuthContext)
    useEffect(() => {
        const data = {
            status: "pending"
        }
        axios.post(`${url}/getApplications`, data, {
            headers: {
                accessMemberToken: localStorage.getItem('accessMemberToken')
            }
        }).then((response) => {
            if (!response.data.error) {
                setApplications(response.data);
            }
            else {
                console.log(response.data.error)
            }
        })

    }, [])

    const handleClick = (option) => {
        const data = {
            status: option
        }
        axios.post(`${url}/getApplications`, data, {
            headers: {
                accessMemberToken: localStorage.getItem('accessMemberToken')
            }
        }).then((response) => {
            if (!response.data.error) {
                setApplications(response.data);
            }
            else {
                console.log(response.data.error)
            }
        })
        setButton(option)
    }

    return (
        <AuthContext.Provider value={{ setApplications, url }}>
            <div className='bg-[#ffe0ce] py-5'>
                <p className='text-2xl font-bold flex justify-center items-center'>Applications</p>
                <div className='flex justify-center items-center gap-5 py-5'>
                    <button onClick={() => { handleClick("pending") }} className={`${button == "pending" ? "bg-white text-red-500 border-2 border-red-500" : "bg-red-500 text-white"} font-bold text-2xl rounded-xl px-5 py-2`}>Pending</button>
                    <button onClick={() => { handleClick("contacted") }} className={`${button == "contacted" ? "bg-white text-green-950 border-2 border-green-950" : "bg-green-950 text-white"} font-bold text-2xl rounded-xl px-5 py-2`}>Contacted</button>
                </div>
                <div className='h-[90vh]'>
                    {(applications && applications.length) ?
                        (
                            <div className='flex flex-wrap gap-5 overflow-y-scroll h-[100%]'>
                                {applications.map((application, i) => {
                                    return <ApplicationCard key={i} application={application} number={i} />
                                })}
                            </div>
                        )
                        :
                        (
                            <div className='w-1/2 mx-auto bg-[#fff9f5] text-center font-bold text-3xl h-[20rem] rounded-xl flex items-center justify-center'>
                                No applications found
                            </div>
                        )
                    }
                </div>
            </div>
        </AuthContext.Provider>
    )
}

export default ApplicationPage