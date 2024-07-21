import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CircularProgress } from '@mui/material';
import ImagesCarousel from '../components/AddProperty/ImagesCarousel';
import { isMobile, isTablet } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Helpers/AuthContext';
function AddProperty() {
    const {url}=useContext(AuthContext)
    const navigate = useNavigate();
    const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
    const [agents, setAgents] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [selectedImages, setSelectedImages] = useState(null);
    useEffect(() => {
        axios.get(`${url}/teams`).then((response) => {
            if (!response.data.error) {
                setAgents(response.data.filter((agent) => agent.memberId !== "HRS12092002-1"));
            }
            else {
                console.log(response.data.error);
            }
        })
    }, [])

    const handleSelect = (e) => {
        const a = agents.find((agent) => agent.memberId === e.target.value);
        setSelectedAgent(a);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fd = new FormData(e.target);
        const data = {
            category: fd.get('category'),
            address: fd.get('address'),
            urls: selectedImages,
            totalPrice: fd.get('totalPrice'),
            emiPrice: fd.get('emiPrice'),
            monthlyPrice: fd.get('monthlyPrice'),
            agentId: fd.get('agent'),
            rooms: fd.get('rooms'),
            area: fd.get('area'),
            bath: fd.get('bath')
        }
        axios.post(`${url}/addProperties`, data, {
            headers: {
                accessMemberToken: localStorage.getItem('accessMemberToken')
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
        // <div className='bg-[#fff9f6] py-10'>
        <form method="POST" onSubmit={handleSubmit} className='bg-[#fff9f6] py-10 flex flex-col justify-center gap-5'>

            <div className='relative bg-white py-10 w-[90%] mx-auto flex flex-col flex-wrap gap-5 border border-1 border-black rounded-2xl my-5'>
                <div className='flex flex-wrap gap-5 justify-center items-center'>
                    <label htmlFor="images" className='font-bold text-xl'>Select images from the devie :</label>
                    <input required onChange={handleImageChange} name="image" id="images" type="file" multiple placeholder='enter images' className='w-[30%] rounded-2xl px-5 py-2 border border-1 border-black' />
                </div>
            </div>
            <div className='flex flex-col gap-5 w-[90%] mx-auto justify-between'>
                <div className='flex px-10 py-5 gap-5 flex-col bg-white rounded-2xl border border-1 border-black'>
                    <p className='font-bold text-4xl'>Trovilla Plan in Sereno Canyon - Estate Collection by Toll Brothers</p>
                    <p className='font-bold text-2xl'>
                        <input required name="address" type="text" placeholder='enter the address of the property' className='w-full px-5 py-2 rounded-2xl border border-1 border-black' />
                    </p>

                    <div className='flex flex-row gap-5 mt-10'>
                        <div className='border border-1 border-black p-5 rounded-3xl'>
                            <span className='font-bold text-xl'>
                                <input required name="totalPrice" type="number" placeholder='enter one-time price' className='px-5 py-2 rounded-2xl border border-1 border-black' />
                            </span>
                            <p className='font-bold text-xl w-full py-2'>Online / Cash Payment</p>
                        </div>
                        <div className='border border-1 border-black p-5 rounded-3xl'>
                            <span className='font-bold text-xl'>
                                <input required name="emiPrice" type="text" placeholder='enter monthly EMI' className='px-5 py-2 rounded-2xl border border-1 border-black' />
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
                        <select required name="category" id="category" className='border border-1 px-5 py-2 rounded-xl border-black'>
                            <option className='border border-1 border-black' value="none" default>Select here</option>
                            <option value="industrial">Industrial</option>
                            <option value="commercial">Commercial</option>
                            <option value="residential">Residential</option>
                        </select>
                    </p>
                    <p className='font-bold text-2xl'>
                        <label htmlFor="bath" >Bathrooms :-</label>
                        <input requied id="bath" name="bath" type="text" placeholder='enter no.of bathrooms for the property' className='w-full px-5 py-2 rounded-2xl border border-1 border-black' />
                    </p>
                    <p className='font-bold text-2xl'>
                        <label htmlFor="bath" >Rooms :-</label>
                        <input required id="rooms" name="rooms" type="text" placeholder='enter no.of rooms for the property' className='w-full px-5 py-2 rounded-2xl border border-1 border-black' />
                    </p>
                    <p className='font-bold text-2xl'>
                        <label htmlFor="area">Enter area :-</label>
                        <input required id="area" name="area" type="text" placeholder='enter area on which this property is spread' className='w-full px-5 py-2 rounded-2xl border border-1 border-black' />
                    </p>
                </div>

                <div className='flex px-10 py-5 gap-5 flex-col bg-white rounded-2xl border border-1 border-black'>
                    <label htmlFor="agent">Select Agent you wish to assign for this property</label>
                    <select required name="agent" onChange={handleSelect} id="agent" placeholder="select agents here.." className='px-5 py-2 border border-1 border-black rounded-2xl'>
                        <option value="default" default>Please select agent</option>
                        {agents && agents.map((agent, i) => {
                            return (
                                <option className='border border-1 border-black' key={i} value={agent.memberId}>
                                    {agent.name} - ( {agent.memberId} )
                                </option>
                            )
                        })}
                    </select>
                    <p className='font-black text-3xl'>Agent Information</p>
                    <div className='flex gap-5'>
                        {/* <img src={profilePic} alt="" className='h-[150px] w-[150px] rounded-3xl' /> */}
                        <div className='text-lg flex flex-col justify-start gap-5 w-fit h-[8rem] flex-wrap'>
                            <p className='font-semibold'>Name : {selectedAgent ? selectedAgent.name : "NIL"}</p>
                            <p className='font-semibold'>Email : {selectedAgent ? selectedAgent.email : "NIL"}</p>
                            <p className='font-semibold'>Phone : {selectedAgent ? selectedAgent.phone : "NIL"}</p>
                            <p className='font-semibold'>member-id : {selectedAgent ? selectedAgent.memberId : "NIL"}</p>
                            <p className='font-semibold'>Position : {selectedAgent ? selectedAgent.position : "NIL"}</p>
                            <p className='font-semibold'>Total-Rating : {selectedAgent ? selectedAgent.totalRating : "NIL"}</p>
                        </div>
                    </div>
                </div>
            </div>
            {console.log("selected", selectedImages)}
            {selectedImages ? (
                <div className='flex flex-col gap-5 w-[90%] mx-auto justify-between'>
                    <div className='relative w-[90%] mx-auto'>
                        {/* <div className='flex h-[600px] flex-col flex-wrap gap-5'>
                            {selectedImages.slice(0, 3).map((image, i) => {
                                return <img key={i} src={image} alt="" className={`${i === 0 ? "h-[550px] w-[850px]" : "h-[263px]"} rounded-3xl`} />
                            })}
                        </div> */}
                        <ImagesCarousel selectedImages={selectedImages} />

                        {/* <div className='absolute w-fit h-fit bottom-20 right-10'>
                            <Link to={`/property/${id}/images`}><button className='bg-white text-black border-2 rounded-3xl w-fit px-5 py-2'>See more</button></Link>
                        </div> */}
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
        // </div>
    )
}

export default AddProperty