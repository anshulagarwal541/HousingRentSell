import React, { useState, useEffect, useContext } from 'react'
import QueryCard from '../components/Queries/QueryCard';
import axios from 'axios';
import { AuthContext } from '../Helpers/AuthContext';
function Queries() {
    const [button, setButton] = useState("pending");
    const [queries, setQueries] = useState();
    const {url}=useContext(AuthContext)
    useEffect(() => {
        const data = {
            status: "pending"
        }
        axios.post(`${url}/getQueriesTeam`, data, {
            headers: {
                accessMemberToken: localStorage.getItem('accessMemberToken')
            }
        }).then((response) => {
            if (!response.data.error) {
                setQueries(response.data);
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
        axios.post(`${url}/getQueriesTeam`, data, {
            headers: {
                accessMemberToken: localStorage.getItem('accessMemberToken')
            }
        }).then((response) => {
            if (!response.data.error) {
                setQueries(response.data);
            }
            else {
                console.log("opps error occcured")
            }
        })
        setButton(option)
    }

    return (
        <AuthContext.Provider value={{setQueries, url}}>
            <div className='bg-[#ffe0ce] py-5'>
                <p className='text-2xl font-bold flex justify-center items-center'>Queries Section</p>
                <div className='flex justify-center items-center gap-5 py-5'>
                    <button onClick={() => { handleClick("pending") }} className={`${button == "pending" ? "bg-white text-red-500 border-2 border-red-500" : "bg-red-500 text-white"} font-bold text-2xl rounded-xl px-5 py-2`}>Pending</button>
                    <button onClick={() => { handleClick("resolved") }} className={`${button == "resolved" ? "bg-white text-green-950 border-2 border-green-950" : "bg-green-950 text-white"} font-bold text-2xl rounded-xl px-5 py-2`}>Resolved</button>
                </div>
                <div className=''>
                    {(queries && queries.length) ?
                        (
                            <div className='flex flex-col gap-5'>
                                {queries.map((query, i) => {
                                    return <QueryCard key={i} query={query} />
                                })}
                            </div>
                        )
                        :
                        (
                            <div className='w-1/2 mx-auto bg-[#fff9f5] text-center font-bold text-3xl h-[10rem] rounded-xl flex items-center justify-center'>
                                No queries found
                            </div>
                        )
                    }
                </div>
            </div>
        </AuthContext.Provider>
    )
}

export default Queries