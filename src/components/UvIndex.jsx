import React, { useState, useEffect } from 'react';
import axios from 'axios';

import logo from '../assets/logo.png';
import moderate from '../assets/moderate.png';
import high from '../assets/high.png';
import veryhigh from '../assets/veryhigh.png';
import extreme from '../assets/extreme.png';
import swing from '../assets/swing.png';
import sunscreen from '../assets/sunscreen.png';
import hat from '../assets/pamela-hat.png';
import shade from '../assets/sunburn.png';
import shelter from '../assets/shelter.png'
import shirt from '../assets/tshirt.png';


const UvIndex = ({ location, setData }) => {
  const [uvIndex, setUvIndex] = useState(null);
  const [error, setError] = useState(null);
  const [testUvi, setTestUvi] = useState(0); // State for test UVI

  useEffect(() => {
    const fetchUVIndex = async () => {
      try {
        const response = await axios.get(`https://currentuvindex.com/api/v1/uvi?latitude=${location.latitude}&longitude=${location.longitude}`);
        setUvIndex(response.data);
        setData(response.data.forecast);
      } catch (err) {
        console.error(err);
        setError('Unable to fetch UV Index');
      }
    };

    if (location) {
      fetchUVIndex();
    }
  }, [location, setData]);

  const convertGMTToLocalTime = (gmtTimeString) => {
    const gmtDate = new Date(gmtTimeString);
    const localDate = gmtDate.toLocaleDateString();
    const localTime = gmtDate.toLocaleTimeString();
    return `${localTime} ${localDate}`;
  };

  const getUvIndexRating = (uvi) => {
    if (uvi >= 0 && uvi < 2.5) {
      return { rating: 'low', icon: swing, message: 'Basic precautions', color: '#20BF55' };
    } else if (uvi >= 2.5 && uvi < 5.5) {
      return { rating: 'moderate', icon: moderate, message: 'Standard precautions', color: 'yellow' };
    } else if (uvi >= 5.5 && uvi < 7.5) {
      return { rating: 'high', icon: high, message: 'Slip, slop, slap, seek shade at midday', color: 'orange' };
    } else if (uvi >= 7.5 && uvi < 10.5) {
      return { rating: 'very high', icon: veryhigh, message: 'Avoid the outdoors at midday, slip, slop, slap is a must!', color: 'red' };
    } else if (uvi >= 10.5 && uvi <= 16) {
      return { rating: 'extreme', icon: extreme, message: 'Avoid the outdoors at midday, slip, slop, slap is a must!', color: 'purple' };
    } else {
      return { rating: 'unknown', icon: moderate, message: 'No data', color: 'grey' };
    }
  };

  let localTimeString = '';
  let rating = '';
  let icon = '';
  let message = '';
  let color = '';

  const uvi = testUvi || (uvIndex && uvIndex.now.uvi); // Use testUvi if available, otherwise use fetched UVI

  if (uvIndex) {
    localTimeString = convertGMTToLocalTime(uvIndex.now.time);
    const uvIndexRating = getUvIndexRating(uvi);
    ({ rating, icon, message, color } = uvIndexRating);
  }

  return (
    <div className='container'>
      <div className='item item-1'>
        <img src={logo} alt='UV Index logo' />
      </div>
      <div className='item item-2'>
        <h1>Where's the UV rating at?</h1>
      </div>
      <div className='item item-3'></div>
      <div className='item item-5'>
        <p
          style={{
            color: color,
            backgroundColor: color === 'lightgreen' ? 'white' : 'transparent',
            ...(color === 'lightgreen' && {
              padding: '5px',
              border: '2px solid',
              borderRadius: '50px',
            }),
          }}
        >
          {rating}
          {/* {rating} {message && <b>{message}</b>} */}
        </p>
        {icon && <img className='rating-icon' src={icon} alt='UV Rating icon' />}
        <p  style={{
            color: color}}>{} uvi</p>
      </div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className='item item-4'>
          <h4>
            {uvIndex ? (
              <span>
                <img className='rating-icon' src={shirt} alt='t-shirt'></img>
                <img className='rating-icon' src={sunscreen} alt='sunscreen'></img>
                <img className='rating-icon' src={hat} alt='hat'></img>
                <img className='rating-icon' src={shelter} alt='shade'></img>
                <p>test</p>
                {/* At your location the current UV index is <span style={{ color: `${color}`, textDecoration: 'underline' }}>{rating} at {uvIndex.now.uvi}</span> */}
              </span>
            ) : (
              ''
            )}
          </h4>
        </div>
      )}
      <div className='item'>
        <label>Test UVI: {testUvi}</label>
        <input
          type='range'
          min='0'
          max='16'
          step='0.1'
          value={testUvi}
          onChange={(e) => setTestUvi(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default UvIndex;
