import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { AuthContext } from '../../Helpers/AuthContext';
function MapBox() {
    const {url}=useContext(AuthContext)
    const [viewPort, setViewPort] = useState({
        latitude: 36.310699,
        longitude: 59.599457,
        zoom: 3,
        bearing: 0,
        pitch: 0
    })
    const [properties, setProperties] = useState(null);
    const [selected, setSelected] = useState(null)


    useEffect(() => {
        axios.get(`${url}/properties`).then((response) => {
            if (response.data.error) {
                
            }
            else {
                setProperties(response.data);
            }
        })
    }, [])

    return (
        <div>
            <ReactMapGL
                {...viewPort}
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                style={{
                    width: "100%",
                    height: '500px'
                }}
                mapStyle='mapbox://styles/anshulagarwal541/clx0nzeqh000301qs7gl2978k'
                onMove={event => setViewPort(event.viewState)}
                scrollZoom={false}
                setFog={true}
            >
                {properties && properties.map((property, i) => (
                    <Marker
                        key={i}
                        latitude={property.latitude}
                        longitude={property.longitude}
                    >
                    </Marker>
                ))}
                <NavigationControl style={{ marginRight: "50px" }} />
            </ReactMapGL>
        </div >
    )
}

export default MapBox