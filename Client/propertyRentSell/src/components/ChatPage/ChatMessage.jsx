// import React, { useContext, useEffect, useState } from 'react'
// import { AuthContext } from '../../Helpers/AuthContext'
// import ChatDashboard from '../../pages/ChatDashboard';
// import Avatar from '@mui/material/Avatar';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import MessageCard from './MessageCard';
// function ChatMessage() {
//     const { id } = useParams();
//     const [messages, setMessages] = useState(null);
//     const [contact, setContact] = useState(null);
//     const [opponentMessaged, setOpponentMessaged] = useState(false);
//     const { employee, member, clickedId, messageSent, setMessageSent, setCurrentId, url } = useContext(AuthContext);
//     useEffect(() => {
//         // setCurrentId(id);
//         if (employee) {
//             const data = {
//                 user1: employee._id,
//                 user2: id
//             }
//             console.log("data", data)
//             axios.post(`${url}/fetchMessages`, data, {
//                 headers: {
//                     accessMemberToken: localStorage.getItem('accessMemberToken')
//                 }
//             }).then((response) => {
//                 if (response.data.error) {

//                 }
//                 else {
//                     setMessages(response.data);
//                 }
//             })
//         }

//         axios.get(`${url}/getMember/${id}`).then((response) => {
//             if (!response.data.error) {
//                 setContact(response.data);
//             }
//             else {
//                 console.log(response.data.error);
//             }
//         })

//     }, [clickedId, opponentMessaged])

//     const handleChat = (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const data = {
//             message: formData.get('message'),
//             to: contact._id,
//             from: employee._id
//         }
//         e.target.reset();
//         axios.post(`${url}/postMessages`, data, {
//             headers: {
//                 accessMemberToken: localStorage.getItem('accessMemberToken')
//             }
//         }).then((response) => {
//             if (response.data.error) {
//                 console.log("Error occured");
//             }
//             else {
//                 console.log("done successfully");
//                 setMessages(response.data);
//             }
//         })
//         setMessageSent(!messageSent)
//         setOpponentMessaged(!opponentMessaged);
//     }

//     return (
//         <div className='w-[100%] h-[100%] flex flex-col justify-center items-center'>
//             {/* {console.log("message", messages)} */}
//             {contact && (
//                 <div className='w-[100%] h-[100%] flex justify-between flex-col  bg-[#626262]'>
//                     <div className='flex gap-10 w-[100%] h-[4rem]  py-5 px-10 bg-[#fff9f6]'>
//                         <Avatar alt="Remy Sharp" src={contact.image} />
//                         <p className="text-xl">{contact.name}</p>
//                     </div>
//                     {/* ${employee._id===messages.drom._id ? "items-end" : "items-start"} */}
//                     <div className='overflow-y-scroll px-3 h-[550px] flex flex-col gap-4 '>
//                         {messages && employee && messages.map((message, i) => {
//                             return <div key={i} className={`${employee._id === message.from._id ? "items-end" : "items-start"} flex flex-col gap-4 `}>
//                                 <MessageCard key={i} message={message.message} />
//                             </div>
//                         })}
//                     </div>
//                     <form onSubmit={handleChat} action="POST" className='flex w-[100%] gap-2 justify-between h-[5rem] py-5 px-5 bg-[#fff9f6]'>
//                         <input type="text" name="message" placeholder='enter message' className='w-[80%] border-2 border-[#626262] py-3 px-5 rounded-full' />
//                         <button type="Submit" className='bg-[#626262] text-white px-5 py-2 rounded-3xl'>Send</button>
//                     </form>
//                 </div>
//             )}

//         </div>

//     )
// }

// export default ChatMessage




import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Helpers/AuthContext';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MessageCard from './MessageCard';

function ChatMessage() {
    const { id } = useParams();
    const [messages, setMessages] = useState(null);
    const [contact, setContact] = useState(null);
    const [opponentMessaged, setOpponentMessaged] = useState(false);
    const { employee, messageSent, setMessageSent, url } = useContext(AuthContext);

    useEffect(() => {
        if (employee) {
            const data = {
                user1: employee._id,
                user2: id,
            };
            axios.post(`${url}/fetchMessages`, data, {
                headers: {
                    accessMemberToken: localStorage.getItem('accessMemberToken'),
                },
            }).then((response) => {
                if (!response.data.error) {
                    setMessages(response.data);
                }
            });
        }

        axios.get(`${url}/getMember/${id}`).then((response) => {
            if (!response.data.error) {
                setContact(response.data);
            }
        });
    }, [id, employee, messageSent, opponentMessaged]);

    const handleChat = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            message: formData.get('message'),
            to: contact._id,
            from: employee._id,
        };
        e.target.reset();
        axios.post(`${url}/postMessages`, data, {
            headers: {
                accessMemberToken: localStorage.getItem('accessMemberToken'),
            },
        }).then((response) => {
            if (!response.data.error) {
                setMessages(response.data);
            }
        });
        setMessageSent(!messageSent);
        setOpponentMessaged(!opponentMessaged);
    };

    return (
        <div className='w-full h-full flex flex-col items-center'>
            {contact && (
                <div className='w-full h-full justify-between flex flex-col bg-[#626262]'>
                    {/* Chat Header */}
                    <div className='flex items-center gap-5 w-full h-[4rem] py-3 px-4 bg-transparent md:bg-[#fff9f6]'>
                        <Avatar alt={contact.name} src={contact.image} />
                        <p className="text-lg md:text-xl font-bold">{contact.name}</p>
                    </div>

                    {/* Chat Messages */}
                    <div className='overflow-y-scroll px-3 h-[400px] md:h-[550px] flex flex-col gap-4'>
                        {messages && employee && messages.map((message, i) => (
                            <div
                                key={i}
                                className={`flex flex-col gap-4 ${employee._id === message.from._id ? "items-end" : "items-start"}`}
                            >
                                <MessageCard key={i} message={message.message} />
                            </div>
                        ))}
                    </div>

                    {/* Message Input Form */}
                    <form onSubmit={handleChat} className='flex w-full gap-2 justify-between h-[4rem] md:h-[5rem] py-3 px-3 bg-[#fff9f6]'>
                        <input
                            type="text"
                            name="message"
                            placeholder='Enter message...'
                            className='w-[80%] border-2 border-[#626262] py-2 md:py-3 px-4 md:px-5 rounded-full text-sm md:text-base'
                        />
                        <button type="submit" className='bg-[#626262] text-white px-4 md:px-5 py-2 rounded-3xl'>
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ChatMessage;
