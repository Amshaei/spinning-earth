import React from 'react';
import './App.css';
import GlobeControl from './components/GlobeControl';

function successCallback(position) {
  console.log('Latitude: ', position.coords.latitude);
  console.log('Longitude: ', position.coords.longitude);
}
function App() {
  
  if ("geolocation" in navigator) {
    window.addEventListener("load", function() {
      console.log(this.navigator.geolocation.getCurrentPosition(successCallback))
    })
  }

  return (
    <div className="container flex content-center flex-wrap">
      <GlobeControl />
    </div>
    
  );
}

export default App;
