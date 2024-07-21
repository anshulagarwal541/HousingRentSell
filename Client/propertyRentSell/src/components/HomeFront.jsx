import React, { useState, useEffect, useContext } from 'react'
import front from "../assets/front.png";
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';
import { AuthContext } from '../Helpers/AuthContext';
function HomeFront() {
    const {url}=useContext(AuthContext)
    const [found, setFound] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};

        formData.forEach((value, key) => {
            if (value) { // Check if the value is not empty
                data[key] = value;
            }
        });
        axios.post(`${url}/findProperty`, data).then((response) => {
            if (!response.data.error) {
                if (response.data.length > 0) {
                    setFound(true);
                }
                else {
                    setNotFound(true);
                }
            }
            else {
                console.log(response.data.error);
            }
        })
        e.target.city.value = "";
        e.target.category.value = "";
        e.target.price.value = "";
    }

    const handleClose = () => {
        setFound(false)
        setNotFound(false)
    }

    return (
        <div className='flex flex-row justify-evenly bg-[#fff7f0]'>
            {/* #fff7f0] */}
            <div className='w-1/2 flex flex-col justify-center items-center gap-3 mx-5'>
                <div className='font-bold text-5xl w-[90%] text-left flex items-center leading-[-9px]'>
                    Find a perfect property
                    Where you'll love to live
                </div>
                <div className='text-xl'>
                    We helps businesses customize, automate and scale up their ad production and delivery.
                </div>
                <div className='w-full'>
                    <form onSubmit={handleSubmit} action="POST" className='flex flex-col gap-3'>
                        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} key={'top' + 'center'} open={found} autoHideDuration={5000} onClose={handleClose}>
                            <Alert
                                onClose={handleClose}
                                severity="success"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                Yes..!! we have properties according to your wish ..!!
                            </Alert>
                        </Snackbar>
                        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} key={'top' + 'center'} open={notFound} autoHideDuration={5000} onClose={handleClose}>
                            <Alert
                                onClose={handleClose}
                                severity="error"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                Sorry !! we don't have properties matching your search type ..
                            </Alert>
                        </Snackbar>
                        <input type="text" name="city" placeholder='City/Street' className='px-10 py-5 rounded-3xl w-3/2' />
                        <input type="text" name="category" placeholder='Property Type' className='px-10 py-5 rounded-3xl w-3/2' />
                        <input type="number" name="price" placeholder='Price Range' className='px-10 py-5 rounded-3xl w-3/2' />
                        <button type="submit" className='bg-black py-5 px-10 rounded-3xl text-white w-3/2'>Submit</button>
                    </form>
                </div>
            </div>
            <div className='w-1/2'>
                <img src={front} alt="front" className='bg-transparent' />
            </div>
        </div>
    )
}

export default HomeFront