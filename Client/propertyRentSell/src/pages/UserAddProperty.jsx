import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CircularProgress } from '@mui/material';
import ImagesCarousel from '../components/AddProperty/ImagesCarousel';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Helpers/AuthContext';
function UserAddProperty() {
    const navigate = useNavigate();
    const [selectedImages, setSelectedImages] = useState(null);
    const [user, setUser] = useState(null)
    const {url}=useContext(AuthContext);
    useEffect(() => {
        axios.get(`${url}/getUser`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            if (!response.data.error) {
                setUser(response.data);
            }
            else {
                console.log(response.data.error);
            }
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = {
            category: fd.get('category'),
            address: fd.get('address'),
            urls: selectedImages,
            totalPrice: fd.get('totalPrice'),
            emiPrice: fd.get('emiPrice'),
            rooms: fd.get('rooms'),
            area: fd.get('area'),
            bath: fd.get('bath'),
            userName: fd.get('name'),
            userEmail: fd.get('email'),
            userPhone: fd.get('phone')
        }
        axios.post(`${url}/userSellProperty`, data, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            if (response.data.error) {
                console.log(response.data.error);
            }
            else {
                navigate("/");
            }
        })
    };

    const handleImageChange = (e) => {
        const formData = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('file', e.target.files[i]);
        }
        let urls;
        axios.post(`${url}/upload`, formData).then((response) => {
            if (!response.data.error) {
                console.log(response.data)
                setSelectedImages(response.data.urls);
            }
            else {
                console.log(response.data.error);
            }
        })
    }

    return (
        <form method="POST" onSubmit={handleSubmit} className='bg-[#fff9f6] py-10 flex flex-col justify-center gap-5'>
            <div className='relative bg-white py-10 w-[90%] mx-auto flex flex-col flex-wrap gap-5 border border-1 border-black rounded-2xl my-5'>
                <p className='w-fit text-5xl font-bold text-center mx-auto'>
                    Welcome to the selling section
                </p>
                <p className='w-fit text-lg text-center mx-auto'>
                    Our company truly value your choices and opinions. We pledge to give best rates for the selected properties.
                </p>
            </div>
            <div className='relative bg-white py-10 w-[90%] mx-auto flex flex-col flex-wrap gap-5 border border-1 border-black rounded-2xl my-5'>
                <div className='flex flex-wrap gap-5 justify-center items-center'>
                    <label htmlFor="images" className='font-bold text-xl'>Select images from the devie :</label>
                    <input onChange={handleImageChange} name="image" id="images" type="file" multiple placeholder='enter images' className='w-[30%] rounded-2xl px-5 py-2 border border-1 border-black' />
                </div>
            </div>
            <div className='flex flex-col gap-5 w-[90%] mx-auto justify-between'>
                <div className='flex px-10 py-5 gap-5 flex-col bg-white rounded-2xl border border-1 border-black'>
                    <p className='font-bold text-4xl'>Trovilla Plan in Sereno Canyon - Estate Collection by Toll Brothers</p>
                    <p className='font-bold text-2xl'>
                        <input name="address" type="text" placeholder='enter the address of the property' className='w-full px-5 py-2 rounded-2xl border border-1 border-black' />
                    </p>

                    <div className='flex flex-row gap-5 mt-10'>
                        <div className='border border-1 border-black p-5 rounded-3xl'>
                            <span className='font-bold text-xl'>
                                <input name="totalPrice" type="number" placeholder='enter one-time price' className='px-5 py-2 rounded-2xl border border-1 border-black' />
                            </span>
                            <p className='font-bold text-xl w-full py-2'>Online / Cash Payment</p>
                        </div>
                        <div className='border border-1 border-black p-5 rounded-3xl'>
                            <span className='font-bold text-xl'>
                                <input name="emiPrice" type="text" placeholder='enter monthly EMI' className='px-5 py-2 rounded-2xl border border-1 border-black' />
                            </span>
                            <p className='font-bold text-xl w-full py-2'>0% EMI for 6 Months</p>
                        </div>
                    </div>
                    <p className='text-lg flex flex-col gap-2'>
                        <span className='font-bold text-3xl mt-5'>
                            Well-constructed 1562 Sq Ft Home Is Now Offering To You In Uttara For Sale
                        </span>
                        A slider is great way to display a slideshow featuring images or videos, usually on your homepage.Adding sliders to your site is no longer difficult. You don’t have to know coding anymore. Just use a slider widget and it will automatically insert the slider on your web page.So, the Elementor slider would be a great tool to work with when building a WordPress site.</p>
                </div>

                <div className='flex px-10 py-5 gap-5 flex-col bg-white rounded-2xl border border-1 border-black'>
                    <p className='font-bold text-xl flex gap-2 items-center'>
                        <label htmlFor="category" >enter category of the property</label>
                        <select name="category" id="category" className='border border-1 px-5 py-2 rounded-xl border-black'>
                            <option className='border border-1 border-black' value="none" default>Select here</option>
                            <option value="industrial">Industrial</option>
                            <option value="commercial">Commercial</option>
                            <option value="residential">Residential</option>
                        </select>
                    </p>
                    <p className='font-bold text-2xl'>
                        <label htmlFor="bath" >Bathrooms :-</label>
                        <input id="bath" name="bath" type="text" placeholder='enter no.of bathrooms for the property' className='w-full px-5 py-2 rounded-2xl border border-1 border-black' />
                    </p>
                    <p className='font-bold text-2xl'>
                        <label htmlFor="bath" >Rooms :-</label>
                        <input id="rooms" name="rooms" type="text" placeholder='enter no.of rooms for the property' className='w-full px-5 py-2 rounded-2xl border border-1 border-black' />
                    </p>
                    <p className='font-bold text-2xl'>
                        <label htmlFor="area">Enter area :- in (sqft)</label>
                        <input id="area" name="area" type="text" placeholder='enter area on which this property is spread' className='w-full px-5 py-2 rounded-2xl border border-1 border-black' />
                    </p>
                </div>

                {user && (
                    <div className='flex px-10 py-5 gap-5 flex-col bg-white rounded-2xl border border-1 border-black'>
                        <p className='font-bold text-2xl'>Please provide your contact details</p>
                        <div>
                            <label className='w-[20%]' htmlFor="agent">Your Name :- </label>
                            <input value={user.username} className='w-[70%] px-5 py-2 rounded-xl border border-1 border-black' type="text" name="name" placeholder="enter your name" />
                        </div>
                        <div>
                            <label className='w-[20%]' htmlFor="agent">Your Email :- </label>
                            <input value={user.email} className='w-[70%] px-5 py-2 rounded-xl border border-1 border-black' type="email" required name="email" placeholder="enter your email" />
                        </div>
                        <div>
                            <label className='w-[20%]' htmlFor="agent">Your Phone :- </label>
                            <input value={user.phone} className='w-[70%] px-5 py-2 rounded-xl border border-1 border-black' type="number" name="phone" placeholder="enter your phone Number" />
                        </div>
                    </div>
                )}
            </div>
            {selectedImages ? (
                <div className='flex flex-col gap-5 w-[90%] mx-auto justify-between'>
                    <div className='relative w-[90%] mx-auto'>
                        <ImagesCarousel selectedImages={selectedImages} />
                    </div>
                    <button type="submit" className='py-2 px-5 mx-auto bg-black text-white font-bold rounded text-center'>Add Property</button>
                </div>
            )
                :
                (
                    <div className='py-2 px-5 mx-auto font-bold rounded-2xl text-center border border-1 border-black'>
                        <p className='font-bold text-xl'>Please wait while your image in uploading....</p>
                        <CircularProgress />
                    </div>
                )}
        </form>
    )
}

export default UserAddProperty