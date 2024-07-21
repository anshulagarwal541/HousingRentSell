import { useState, useEffect } from "react";
import React from 'react'
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Alert } from '@mui/material';
import password from "../assets/authentication/password.svg";
import user from "../assets/authentication/user.svg";
import { AuthContext } from "../Helpers/AuthContext";
import { useContext } from "react";
function LoginMember() {
    const { member, setMember, setLoginSuccess, url } = useContext(AuthContext);
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            memberId: formData.get('memberId'),
            pin: formData.get('pin')
        }
        axios.post(`${url}/memberLogin`, data).then((response) => {
            if (!response.data.error) {
                setMember(localStorage.setItem('accessMemberToken', response.data));
                setLoginSuccess(true)
                navigate("/");
            }
            else {
                setAlertMessage(response.data.error);
                setAlert(true);
            }
        })
    }
    return (
        <div className='h-[100vh] w-[100vw] flex justify-center flex-col gap-5 items-center bg-[#ffffff] '>
            {alert && (<div className='w-[500px] font-bold text-lg'>
                <Alert severity="error" variant="filled" onClose={() => { setAlert(false) }}>
                    {alertMessage}
                </Alert>
            </div>)}
            <div className='w-[500px] border border-1 border-black p-5 rounded-xl flex flex-col gap-5'>
                <p className='font-bold text-4xl'>Log in</p>
                <form action="POST" onSubmit={handleLogin} className='flex flex-col gap-5 pb-10 border-b border-b-black'>
                    <div className='relative'>
                        <img src={user} alt="" className='absolute right-3 bottom-3' />
                        <input name="memberId" type="text" placeholder='enter member-id' className='rounded-xl w-[100%] px-10 py-3 border border-1 border-black' />
                    </div>
                    <div className='relative'>
                        <img src={password} alt="" className='absolute right-3 bottom-3' />
                        <input name="pin" type="password" placeholder='enter pin' className='rounded-xl w-[100%] px-10 py-3 border border-1 border-black' />
                    </div>
                    <button className='bg-black text-white rounded-xl py-3 font-semibold text-lg px-1'>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default LoginMember;