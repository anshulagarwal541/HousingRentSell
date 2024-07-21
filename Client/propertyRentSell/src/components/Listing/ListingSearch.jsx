import React, { useState, useEffect, useContext } from 'react'
import PropertyCard from '../home/PropertyCard';
import axios from 'axios';
import ContactUs from '../home/ContactUs';
import { AuthContext } from '../../Helpers/AuthContext';
function ListingSearch() {
    const { setAlert, setAlertMessage, setAlertType, url } = useContext(AuthContext);
    const [allProperty, setProperty] = useState(null);
    const [property, setProp] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    useEffect(() => {
        axios.get(`${url}/properties`).then((response) => {
            if (!response.data.error) {
                setProperty(response.data);
                setProp(response.data.slice(0, 3));
                setStartIndex(startIndex + 3)
            }
            else {
                setAlertMessage(response.data.error)
                setAlertType("error")
                setAlert(true)
            }
        })
    }, [])

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = {
            category: formData.get('category'),
            minPrice: formData.get('minPrice'),
            maxPrice: formData.get('maxPrice'),
            rooms: formData.get('beds'),
            country: formData.get('country'),
            city: formData.get('city')
        };
        console.log(data)
        axios.post(`${url}/properties`, data).then((response) => {
            if (!response.data.error) {
                setProperty(response.data);
                setProp(response.data.slice(0, 3));
                setStartIndex(3)
            }
            else {
                setAlertMessage(response.data.error)
                setAlertType("error")
                setAlert(true)
            }
        })
    }

    const setNextButton = () => {
        setProp(allProperty.slice(startIndex, startIndex + 3));
        setStartIndex(startIndex + 3)
    }

    const setPrevButton = () => {
        setProp(allProperty.slice(startIndex - 6, startIndex - 3));
        setStartIndex(startIndex - 3)
    }

    return (
        <div>
            <div className=' mx-auto py-10'>
                <div className='py-10 w-[80%] mx-auto'>
                    <p className='font-bold text-5xl'>
                        Find Property
                    </p>
                </div>
                <div className='flex flex-row justify-center gap-10 py-10 items-center'>
                    <form action="POST" className='flex flex-row gap-10 justify-center items-center' onSubmit={formSubmit}>
                        <div className='overflow-x-scroll flex gap-2 w-[80%] px-5 py-3'>
                            <input name="country" type="text" placeholder='enter country' className='py-3 px-2 w-fit rounded-2xl border border-1 border-black' />
                            <input name="city" type="text" placeholder='enter city' className='py-3 px-2 rounded-2xl border border-1 border-black' />
                            <select name="category" id="category" className='py-3 px-2 rounded-2xl border border-1 border-black'>
                                <option value='' selected>Category : None</option>
                                <option value="industrial">Industrial</option>
                                <option value="commercial">Commercial</option>
                                <option value="residential">Residential</option>
                            </select>
                            <input type="number" placeholder='min-price' name="minPrice" className='py-3 px-2 rounded-2xl border border-1 border-black' />
                            <input type="number" placeholder='max-price' name="maxPrice" className='py-3 px-2 rounded-2xl border border-1 border-black' />
                            <input type="number" placeholder='enter beds required' name="beds" className='py-3 px-2 rounded-2xl border border-1 border-black' />
                        </div>
                        <button className='bg-black text-white font-bold px-6 py-2 h-[50px] rounded-2xl'>Search</button>
                    </form>
                </div>
                <div className='flex flex-row flex-wrap gap-5 justify-center'>
                    <div className='w-[100%] flex flex-row flex-wrap gap-5 justify-center'>
                        {property && property.map((property, i) => {
                            return <PropertyCard key={i} property={property} />
                        })}
                    </div>
                    <div className='flex justify-end mx-auto gap-5 w-[80%] py-5'>
                        {property && (startIndex != 3) && (
                            <button onClick={setPrevButton} className='font-bold bg-black text-white rounded-xl p-5'>Previous</button>
                        )}

                        {allProperty && (startIndex <= allProperty.length) && (
                            <button onClick={setNextButton} className='font-bold bg-black text-white rounded-xl p-5'>Next</button>
                        )}

                    </div>
                </div>
            </div >
        </div>

    )
}

export default ListingSearch