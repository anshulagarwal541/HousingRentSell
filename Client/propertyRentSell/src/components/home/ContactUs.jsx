import React from 'react';
import logo from "../../assets/logo.png";

function ContactUs() {
    return (
        <div className='flex flex-row items-center gap-3 justify-evenly'>
            <div>
                <img src={logo} alt="" className='w-[200px] h-[200px] rounded-full' />
            </div>
            <div className='flex flex-col gap-5'>
                <div className='font-bold text-center'>
                    <p>
                        Nitte Meenakshi Institute Of Technology,
                    </p>
                    <p>Bangalore</p>
                    <p>560064</p>
                </div>
                <p>Contact me at : +917348233507</p>
                <p>Email us at : 1nt21cs138.rachit@nmit.ac.in</p>
            </div>
        </div>
    )
}

export default ContactUs