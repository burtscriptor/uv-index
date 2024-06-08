import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UvIndex = ({ location, setData }) => {
    const [uvIndex, setUvIndex] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUVIndex = async () => {
            try {
                const response = await axios.get(`https://currentuvindex.com/api/v1/uvi?latitude=${location.latitude}&longitude=${location.longitude}`);
                setUvIndex(response.data);
                setData(response.data.forecast)
            } catch (err) {
                console.error(err);
                setError('Unable to fetch UV Index');
            }
        };
        if (location) {
            fetchUVIndex();
           
        }
    }, [location]);

    const convertGMTToLocalTime = (gmtTimeString) => {
        const gmtDate = new Date(gmtTimeString);
        const localDate = gmtDate.toLocaleDateString();
        const localTime = gmtDate.toLocaleTimeString();
        return `${localTime} ${localDate}`;
    };


   
    let localTimeString = '';
    if (uvIndex) {
        localTimeString = convertGMTToLocalTime(uvIndex.now.time);
        
    };

    const getUvIndexRating = (uvIndex) => {
        if (uvIndex > 0 && uvIndex < 2.5) {
            return 'low';
        } else if (uvIndex > 2.5 && uvIndex < 5.5) {
            return 'moderate';
        } else if (uvIndex > 5.5 && uvIndex < 7.5) {
            return 'high';
        } else if (uvIndex > 7.5 && uvIndex < 10.5) {
            return 'very high';
        } else if (uvIndex > 10.5 && uvIndex < 16) {
            return 'extreme';
        }
    };
    

    const rating = uvIndex ? getUvIndexRating(uvIndex.now.uvi) : null;

    return (
        <div className='uv-index'>
            <h1>Do I need to slip, slop, slap? Whats the Uv Index at?</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <p>
                    {uvIndex ? (
                        <span>
                            The current UV index is {rating} at {uvIndex.now.uvi} 
                        </span>
                    ) : (
                        'Fetching UV Index...'
                    )}
                </p>
            )}
        </div>
    );
};

export default UvIndex;
