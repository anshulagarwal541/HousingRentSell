import React, { useContext } from 'react';
import NavBar from "../components/navBar.jsx";
import ListingSearch from '../components/Listing/ListingSearch.jsx';
import { AuthContext } from '../Helpers/AuthContext.js';

function Listing() {
    const { setAlert, setAlertMessage, setAlertType, url } = useContext(AuthContext);
    return (
        <AuthContext.Provider value={{setAlert, setAlertMessage, setAlertType, url}}>
            <div>
                <div className='bg-[#fbeee6]'>
                    <ListingSearch />
                </div>
            </div>
        </AuthContext.Provider>)
}

export default Listing