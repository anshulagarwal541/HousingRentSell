import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import PropertyCard from './PropertyCard';
import { stringify } from 'postcss';
import { AuthContext } from '../../Helpers/AuthContext';

function Property() {
    const { setAlert, setAlertMessage, setAlertType, url } = useContext(AuthContext);
    const [properties, setProperties] = useState(null);
    const [category, setCategory] = useState("residential");
    useEffect(() => {
        console.log("url",url)
        axios.get(`${url}/properties`).then((response) => {
            const property=response.data.filter((house)=>house.category==="residential")
            setProperties(property);
        });
    }, [])

    const updateCategory = (d) => {
        const data = {
            category: d
        }
        axios.post(`${url}/propertyCategory`, data).then((response) => {
            if (!response.data.error) {
                setProperties(response.data);
            }
            else {
                setAlertMessage(response.data.error);
                setAlertType('error');
                setAlert(true);
            }
        })
    }

    return (
        <div className="py-10">
            <div className='flex flex-row justify-between items-center w-[80%] mx-auto'>
                <p className='font-bold text-5xl'>
                    Featured Properties
                </p>
                <p className='text-orange-700 font-bold text-2xl'>
                    Explore More 👉
                </p>
            </div>
            <div className='flex flex-row w-[80%] mx-auto justify-evenly items-center text-2xl py-10'>
                <button id="residentail" className='hover:font-bold' onClick={() => updateCategory("residential")}>Residential</button>
                <button id="industrial" className='hover:font-bold' onClick={() => updateCategory("industrial")}>Industrial</button>
                <button id="commercial" className='hover:font-bold' onClick={() => updateCategory("commercial")}>Commercial</button>
            </div>
            <div className='flex flex-row flex-wrap justify-center gap-5'>
                {properties && properties.map((property, i) => {
                    return <PropertyCard key={i} property={property} />
                })}
            </div>
        </div>
    )
}

export default Property