import React, { useState } from 'react';
import Geolocation from './components/Geolocation';
import UvIndex from './components/UvIndex';
import Chart from './components/Chart';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null)

  return (
    <div className="App">
      <Geolocation setLocation={setLocation} />
      {location ? <UvIndex location={location} setData={setData} /> : <p>Awaiting Location</p>}
     {data ? <Chart data={data}/> : <p>Awaiting data</p> }
    </div>
  );
};

export default App;
