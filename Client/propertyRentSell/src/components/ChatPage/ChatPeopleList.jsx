import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../Helpers/AuthContext';
import axios from 'axios';
import ChatCard from './ChatCard';
import { Link } from 'react-router-dom';
function ChatPeopleList() {
    const { employee, setEmployee, setClickedId, clickedId, messageSent, currentId, setCurrentId, url } = useContext(AuthContext);
    const [chats, setChats] = useState(null);
    useEffect(() => {
        // if (employee && employee.chats.length!=0) {
        //     setChats(employee.chats);
        // }
        axios.get(`${url}/getMember`, {
            headers: {
                accessMemberToken: localStorage.getItem('accessMemberToken')
            }
        }).then((response) => {
            if (response.data.error) {
                console.log(response.data.error);
            }
            else {
                console.log("response", response.data);
                setChats(response.data.chats)
            }
        })
    }, [messageSent])

    const handleClick = (chat) => {
        setClickedId(!clickedId)
        { chat.from.name === employee.name ? setCurrentId(chat.to._id) : setCurrentId(chat.from._id) }
    }

    return (
        <div className='mx-auto w-[100%] flex flex-col gap-2 h-[100%]'>
            <input className='w-[90%] mx-auto my-5 py-2 rounded-2xl px-3 border border-[#626262]' type="text" placeholder='search names..' />
            <div className='w-[90%] mx-auto '>
                <p className='font-bold text-3xl'>Inbox</p>
            </div>
            <div className='w-[90%] mx-auto '>
                <ul className='list-none text-black font-bold flex gap-10'>
                    <li className='border-b-2 border-b-transparent py-2 hover:border-b-black'>Direct Messages</li>
                    <li className='border-b-2 border-b-transparent py-2 hover:border-b-black'>Archived</li>
                </ul>
            </div>
            <div className='h-[100%] flex justify-center items-center overflow-y-scroll'>
                {(chats && chats.length && employee) ? (
                    <div className='h-[100%] w-[100%]'>
                        {chats.map((chat, i) => {
                            return <Link onClick={() => handleClick(chat)} to={`/chat/${chat.from.name === employee.name ? chat.to._id : chat.from._id}`} ><ChatCard key={i} image={chat.from.name === employee.name ? chat.to.image : chat.from.image} name={chat.from.name === employee.name ? chat.to : chat.from} chat={chat} currentId={currentId} /></Link>
                        })}
                    </div>
                ) : (
                    <div className='text-black text-5xl'>
                        <p>No Chats Yet</p>
                    </div>
                )}
            </div>
        </div>
    )

}

export default ChatPeopleList