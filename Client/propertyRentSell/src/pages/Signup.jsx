import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import password from "../assets/authentication/password.svg";
import user from "../assets/authentication/user.svg";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Helpers/AuthContext';
import { Alert } from '@mui/material';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { RecaptchaVerifier, signInWithPhoneNumber, getAuth } from "firebase/auth";
import { auth } from '../Firebase/setup';


function Signup() {
    const { setAlert, setAlertMessage, setAlertType, url } = useContext(AuthContext)
    const [phone, setPhone] = useState("");
    const [verify, setVerify] = useState(false);
    const { setUser, setLoginSuccess } = useContext(AuthContext);
    const [phoneConfirm, setPhoneConfirm] = useState(null)
    const [phoneOTP, setPhoneOTP] = useState(null)
    const [showSubmit, setShowSubmit] = useState(false)
    const [signUpData, setSignUpData] = useState(null)
    const navigate = useNavigate();


    const sendOTP = async (e) => {
        e.preventDefault();
        setShowSubmit(true)
        const fd = new FormData(e.target);
        const data = {
            email: fd.get('email'),
            username: fd.get('username'),
            password: fd.get('password'),
            phone: phone
        }
        setSignUpData(data);
        axios.post(`${url}/signup`, data).then((response) => {
            if (!response.data.error) {
                setUser(localStorage.setItem('accessToken', response.data));
                setAlert(true)
                setAlertMessage("Registered successfully ..!!!")
                setAlertType("success")
                navigate("/");
            }
            else {
                setAlert(true)
                setAlertMessage(response.data.error)
                setAlertType("error")
            }
        })
    }

    return (
        <div className='h-[100vh] w-[100vw] flex justify-center items-center bg-[#ffffff]'>
            <div className='w-[600px] border border-1 border-black p-5 rounded-xl flex flex-col gap-5'>
                <p className='font-bold text-4xl'>Create Account</p>
                {/* <div className='w-full flex justify-center items-center'>
                    <div id='recaptcha-div'></div>
                </div> */}
                <form action="POST" onSubmit={sendOTP} className='flex flex-col gap-5 pb-10 border-b border-b-black'>
                    <div className='flex flex-row flex-wrap justify-center gap-5'>
                        <div className='relative w-[40%]'>
                            <img src={user} alt="" className='absolute right-3 bottom-3' />
                            <input name="email" type="text" placeholder='email address' className='rounded-xl w-[100%] px-10 py-3 border border-1 border-black' />
                        </div>
                        <div className='relative w-[40%]'>
                            <img src={password} alt="" className='absolute right-3 bottom-3' />
                            <input name='password' type="password" placeholder='Password' className='rounded-xl w-[100%] px-10 py-3 border border-1 border-black' />
                        </div>
                        <div className='relative w-[40%]'>
                            <PhoneInput
                                country={"us"}
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={setPhone}
                                className='rounded-xl w-[100%] px-2 py-3 border border-1 border-black'
                            />
                        </div>
                        <div className='relative w-[40%]'>
                            <img src={password} alt="" className='absolute right-3 bottom-3' />
                            <input name="username" type="text" placeholder='username' className='rounded-xl w-[100%] px-10 py-3 border border-1 border-black' />
                        </div>
                    </div>
                    {/* {!showSubmit && ( */}
                    <button onSubmit="submit" className='text-white bg-green-950 rounded-xl py-3 font-semibold text-lg px-1'>Sign up</button>
                    {/* )} */}
                </form>
                <div className='flex gap-5 items-center mx-auto'>
                    <p className='text-xl font-bold'>Already a user ?</p>
                    <Link to="/login" className='text-xl font-semibold border border-1 px-5 py-3 rounded-xl border-black'>Sign in</Link>
                </div>
                {/* <div className='w-full flex justify-center items-center'>
                    <div id='recaptcha-div'></div>
                </div> */}
                {/* {showSubmit && (
                    <button onClick={() => setVerify(true)} className='text-white bg-green-950 rounded-xl py-3 font-semibold text-lg px-1'>Send OTP</button>
                )}
                <p className='text[#6e6e6e] text-xl text-center'>Have an account ? <Link to="/login" className='text-xl font-semibold'>Log in</Link></p> */}
            </div>
            {/* {verify && (
                <div className='absolute backdrop-blur-md w-full h-full flex justify-center items-center'>
                    <div className=' bg-white flex flex-col w-[30rem] border border-1 border-black p-5 rounded-xl gap-5'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="phone" className='font-bold'>Enter OTP sent to your mobile no </label>
                            <input onChange={(e) => { setPhoneOTP(e.target.value) }} placeholder='OTP sent to phone' type="number" id="phone" className='border border-1 border-black px-5 rounded-xl py-2' />
                        </div>
                        <button onClick={(verifyOTP)} className='bg-green-950 text-white px-5 py-2'>Verify</button>
                        <button onClick={() => { setVerify(false) }} className='bg-red-700 text-white px-5 py-2'>Cancel</button>
                    </div>
                </div>
            )} */}
        </div>
    )
}


export default Signup
