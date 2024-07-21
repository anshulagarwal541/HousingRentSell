import React, { useContext, useEffect, useState } from 'react'
import ChatMessage from '../components/ChatPage/ChatMessage'
import ChatPeopleList from '../components/ChatPage/ChatPeopleList'
import { AuthContext } from '../Helpers/AuthContext';
import axios from 'axios';
function ChatDashboard({ children }) {
    const { url, employee, setEmployee, member, clickedId, setClickedId, messageSent, setMessageSent, currentId, setCurrentId } = useContext(AuthContext)
    useEffect(() => {
        axios.get(`${url}/getMember`, {
            headers: {
                accessMemberToken: localStorage.getItem('accessMemberToken')
            }
        }).then((response) => {
            if (!response.data.error) {
                setEmployee(response.data);
            }
            else {
                console.log(response.data.error);
            }
        })
    }, [])
    return (
        <AuthContext.Provider value={{ employee, setEmployee, member, clickedId, setClickedId, messageSent, setMessageSent, currentId, setCurrentId, url }}>
            <div className='flex h-[100vh]'>
                <div className='w-[40%] bg-[#fff9f6]'>
                    <ChatPeopleList />
                </div>
                <div className='w-[60%] flex justify-center items-center'>
                    {employee && (
                        children
                    )}
                    {!children && (
                        <div className='font-bold text-3xl'>
                            No messages to show..
                        </div>
                    )}
                </div>
            </div>
        </AuthContext.Provider>
    )
}

export default ChatDashboard