import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveContainer } from 'recharts';

import glasses from '../assets/sunglasses.png';

import logo from '../assets/logo.png';
import moderate from '../assets/moderate1.png';
import high from '../assets/high.png';
import veryhigh from '../assets/veryhigh.png';
import extreme from '../assets/extreme.png';
import swing from '../assets/swing.png';
import sunscreen from '../assets/sunscreen.png';
import hat from '../assets/pamela-hat.png';
import shelter from '../assets/shelter.png';
import shirt from '../assets/tshirt.png';

const UvIndex = ({ location, setData, setUvIndex, uvIndex }) => {
 
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
      return { rating: 'Low', icon: swing, message: 'Basic precautions', color: '#67BE4D', animation: 1 };
    } else if (uvi >= 2.5 && uvi < 5.5) {
      return { rating: 'Moderate', icon: moderate, message: 'Standard precautions', color: '#FCBC22', animation: 2.5 };
    } else if (uvi >= 5.5 && uvi < 7.5) {
      return { rating: 'High', icon: high, message: 'Slip, slop, slap, seek shade at midday', color: '#F66B33', animation: 5.5 };
    } else if (uvi >= 7.5 && uvi < 10.5) {
      return { rating: 'Very high', icon: veryhigh, message: 'Avoid the outdoors at midday, slip, slop, slap is a must!', color: '#ED164A', animation: 7.5 };
    } else if (uvi >= 10.5 && uvi <= 16) {
      return { rating: 'Extreme', icon: extreme, message: 'Avoid the outdoors at midday, slip, slop, slap is a must!', color: '#7D439B', animation: 10.5 };
    } else {
      return { rating: 'unknown', icon: moderate, message: 'No data', color: 'grey' };
    }
  };

  let localTimeString = '';
  let rating = '';
  let icon = '';
  let message = '';
  let color = '';
  let animation = '';
 

  const uvi = testUvi || (uvIndex && uvIndex.now.uvi); // Use testUvi if available, otherwise use fetched UVI

  if (uvi) {
    const uvIndexRating = getUvIndexRating(uvi);
    ({ rating, icon, message, color, animation } = uvIndexRating);

    if (uvIndex) {
      localTimeString = convertGMTToLocalTime(uvIndex.now.time);
    }
  }
  

  return (
    <ResponsiveContainer>
    <div className='container'>
        <div className='row1'>
      <div className='item item-1'>
        <img src={logo} className='logo' alt='UV Index logo' />
      </div>
      <div className='item item-2'>
        <h1>Where's the UV rating at?</h1>
      </div>
      </div>

    <div className='row2'>
      
      <div className='rating'>
      <p className='text'
          style={{
            color: 'white',
            backgroundColor: color,
          }}
        >
          {rating}
        </p>
        </div>

      <p className='item-5 u' style={{ color: 'white' }}>{uvi} UVI</p>
      
        {icon && <img className='rating-icon' src={icon} alt='UV Rating icon' />}
     
      </div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
       
      ) : (
       
        <div className='item item-4'>
          <h4>
            {uvIndex ? (
              <span>
                <img style={{ border: `3px solid ${color}`, borderRadius: '50%' }} className={animation >= 1 ? 'rating-icon interactive' : 'rating-icon'}   src={glasses} alt='sunglasses' />
                {animation >= 2.5 ? <img style={{ border: `3px solid ${color}`, borderRadius: '50%' }} className={'rating-icon interactive'} src={shirt} alt='t-shirt' /> 
                : <img className='rating-icon' src={shirt}></img> }
                {animation >= 2.5 ? <img style={{ border: `3px solid ${color}`, borderRadius: '50%' }} className={'rating-icon interactive'} src={sunscreen} alt='t-shirt' /> 
                : <img className='rating-icon' src={sunscreen}></img> }
                {animation >= 2.5 ? <img style={{ border: `3px solid ${color}`, borderRadius: '50%' }} className={'rating-icon interactive'} src={hat} alt='t-shirt' /> 
                : <img className='rating-icon' src={hat}></img> }
                {animation >= 7.5 ? <img style={{ border: `3px solid ${color}`, borderRadius: '50%' }} className={'rating-icon interactive'} src={shelter} alt='t-shirt' /> 
                : <img className='rating-icon' src={shelter}></img> }
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
    </ResponsiveContainer>
  );
};

export default UvIndex;
