import React, { useState } from 'react';
import Geolocation from './components/Geolocation';
import UvIndex from './components/UvIndex';
import Chart from './components/Chart';
import Loading from './components/Loading'
import './App.css';


// Colors used: Orange (#F9B872, #FAE7A5), powder blue (#B6E1E7)

function App() {
  const [uvIndex, setUvIndex] = useState(null);
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null)

  return (
    <div className="App">
      <Geolocation setLocation={setLocation} />
      {location ? <UvIndex location={location} setData={setData} setUvIndex={setUvIndex} uvIndex={uvIndex}/> : ''}
     {data ? <Chart data={data} uvIndex={uvIndex}/> : <Loading /> }
    </div>
  );
};

export default App;
