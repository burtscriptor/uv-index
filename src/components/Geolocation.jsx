import React, { useEffect }  from 'react';

const Geolocation = ({ setLocation }) => {
    
    useEffect(()=> {
    const handleLocation = () => {

        function success(position) {
            const { coords } = position;
            console.log(coords);
            setLocation({ latitude: coords.latitude, longitude: coords.longitude });
        };

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            setLocation(null);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.warn('Geolocation is not supported by this browser.');
            setLocation(null);
        }
    };
    handleLocation();
    }, [])

};

export default Geolocation;
