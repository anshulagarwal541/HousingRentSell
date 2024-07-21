import React, { useState, useEffect, useContext } from 'react'
import QueryCard from '../components/Queries/QueryCard';
import axios from 'axios';
import { AuthContext } from '../Helpers/AuthContext';
import SellCard from '../components/UserSellRequest/SellCard';
function UserSellRequest() {
    const { setAlert, setAlertMessage, setAlertType, url } = useContext(AuthContext);
    const [button, setButton] = useState("pending");
    const [houses, setHouses] = useState();
    const [user, setUser] = useState(null);
    const [agent, setAgent] = useState(null);
    useEffect(() => {
        const data = {
            status: "pending"
        }
        axios.post(`${url}/getHouses`, data).then((response) => {
            if (!response.data.error) {
                setHouses(response.data);
            }
            else {
                setAlertType('error');
                setAlertMessage(response.data.error);
                setAlert(true);
            }
        })

        axios.get(`${url}/getUser`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            if (!response.data.error) {
                setUser(response.data)
            }
        })

        axios.get(`${url}/getMember`, {
            headers: {
                accessMemberToken: localStorage.getItem('accessMemberToken')
            }
        }).then((response) => {
            if (!response.data.error) {
                setAgent(response.data)
            }
        })



    }, [])

    const handleClick = (option) => {
        const data = {
            status: option
        }
        axios.post(`${url}/getHouses`, data, {
            headers: {
                accessMemberToken: localStorage.getItem('accessMemberToken')
            }
        }).then((response) => {
            if (!response.data.error) {
                setHouses(response.data);
            }
            else {
                console.log(response.data.error)
            }
        })
        setButton(option)
    }

    return (
        <AuthContext.Provider value={{ setHouses, setAlert, setAlertMessage, setAlertType, url }}>
            <div className='bg-[#ffe0ce] py-5'>
                <p className='text-2xl font-bold flex justify-center items-center'>User Property Sell/Buy Section</p>
                <div className='flex justify-center items-center gap-5 py-5'>
                    <button onClick={() => { handleClick("pending") }} className={`${button == "pending" ? "bg-white text-red-500 border-2 border-red-500" : "bg-red-500 text-white"} font-bold text-2xl rounded-xl px-5 py-2`}>Pending</button>
                    <button onClick={() => { handleClick("waiting") }} className={`${button == "waiting" ? "bg-white text-orange-300 border-2 border-orange-300" : "bg-orange-300 text-white"} font-bold text-2xl rounded-xl px-5 py-2`}>Waiting</button>
                    <button onClick={() => { handleClick("sold") }} className={`${button == "sold" ? "bg-white text-green-950 border-2 border-green-950" : "bg-green-950 text-white"} font-bold text-2xl rounded-xl px-5 py-2`}>Sold</button>
                </div>
                <div className=''>
                    {(houses && houses.length) ?
                        (
                            <div className='flex flex-col gap-5'>
                                {houses.map((house, i) => {
                                    return <SellCard key={i} house={house} user={user} agent={agent} />
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

export default UserSellRequest;