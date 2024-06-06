import { useState } from 'react';

const Geolocation = () => {
    const [location, setLocation] = useState(null);
    
    const handleLocation = () => {
        console.log('button clicked');

        function success(position) {
            const { coords } = position;
            console.log(coords);
            setLocation({ latitude: coords.latitude, longitude: coords.longitude });
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            setLocation(null); // Optional: Set a specific error message in the state
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.warn('Geolocation is not supported by this browser.');
            setLocation(null); // Optional: Set a specific message indicating geolocation is not supported
        }
    };

    return (
        <div className='location'>
            <h1>UV Index</h1>
            <button type='button' onClick={handleLocation}>Get Location</button>
            <p>
                {location 
                    ? `Latitude: ${location.latitude}, Longitude: ${location.longitude}` 
                    : 'No location available'}
            </p>
        </div>
    );
};

export default Geolocation;
