import React, { useState, useEffect } from 'react'
import password from "../assets/authentication/password.svg";
import user from "../assets/authentication/user.svg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Helpers/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
const googleClientId = import.meta.env.VITE_CLIENTID;
function Login() {
    const { user, setUser, setLoginSuccess, notLoggedIn, setNotLoggedIn, url } = useContext(AuthContext);
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        }
        axios.post(`${url}/login`, data).then((response) => {
            if (!response.data.error) {
                setUser(localStorage.setItem('accessToken', response.data));
                setLoginSuccess(true)
                navigate("/");
            }
            else {
                console.log(response.data.error)
                setAlertMessage(response.data.error);
                setAlert(true);
            }
        })
    }

    const handleLoginSuccess = (res) => {
        console.log("logged in = ", jwtDecode(res.credential))
    }

    const handleLoginError = (res) => {
        console.log("failure = ", res)
    }

    return (
        <div className='h-[100vh] w-[100vw] flex justify-center flex-col gap-5 items-center bg-[#ffffff] '>
            {alert && (<div className='w-[500px] font-bold text-lg'>
                <Alert severity="error" variant="filled" onClose={() => { setAlert(false) }}>
                    {alertMessage}
                </Alert>
            </div>)}
            {notLoggedIn && (<div className='w-[500px] font-bold text-lg'>
                <Alert severity="error" variant="filled" onClose={() => { setNotLoggedIn(false) }}>
                    You must Log-In first... !!
                </Alert>
            </div>)}
            <div className='w-[500px] border border-1 border-black p-5 rounded-xl flex flex-col gap-5'>
                <p className='font-bold text-4xl'>Log in</p>
                <form action="POST" onSubmit={handleLogin} className='flex flex-col gap-5 pb-10 border-b border-b-black'>
                    <div className='relative'>
                        <img src={user} alt="" className='absolute right-3 bottom-3' />
                        <input name="username" type="text" placeholder='username' className='rounded-xl w-[100%] px-10 py-3 border border-1 border-black' />
                    </div>
                    <div className='relative'>
                        <img src={password} alt="" className='absolute right-3 bottom-3' />
                        <input name="password" type="password" placeholder='password' className='rounded-xl w-[100%] px-10 py-3 border border-1 border-black' />
                    </div>
                    <button className='bg-black text-white rounded-xl py-3 font-semibold text-lg px-1'>Log in</button>
                </form>
                <p className='text[#6e6e6e] text-xl text-center'>Don't have an account ? <Link to="/signup" className='text-xl font-semibold'>Create Account</Link></p>
                <p className='text[#6e6e6e] text-xl text-center'>Sign-in as a member :- <Link to="/loginMember" className='text-xl font-semibold'>SignIn</Link></p>
            </div>
        </div>
    )
}

export default Login;