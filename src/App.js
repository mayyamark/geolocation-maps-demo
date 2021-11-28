import React, { useCallback, useState, useEffect} from "react";
import Map from './Map'

const App = () => {
  const [allowLocation, setAllowLocation] = useState(false); // този флаг ще се използва, за да се изпълни useEffect-a
  const [coordinates, setCoordinates] = useState(null); // state за lat и long

  const handleGetPosition = useCallback((position) => { // тази функция се подава като първи параметър на navigator.geolocation.getCurrentPosition
    setCoordinates({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    setAllowLocation(false)
  }, []);

  const handleGetPositionError = useCallback(() => { // тази функция се подава като втори параметър на navigator.geolocation.getCurrentPosition
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(res => {
          if (res.state === 'denied') {
            alert('Enable location permissions for this website in your browser settings.')
          }
        });
    }
  }, []);

  useEffect(() => {
    if (allowLocation && navigator.geolocation) { // трябва да направим проверка дали браузърът поддържа navigator.geolocation
      navigator.geolocation.getCurrentPosition(handleGetPosition, handleGetPositionError)
    } else if (!navigator.geolocation) {
      alert("Sorry, Geolocation is not supported by this browser.");
    }
  }, [allowLocation, handleGetPosition, handleGetPositionError]);

    return (
      <div>
        <h4>Using geolocation & Google Maps APIs in React</h4>
        <button onClick={() => { setAllowLocation(true)}}>Get location</button>
        {allowLocation && !coordinates && <p>Loading...</p>}
        {coordinates 
          ? (
            <div>
              <p>Latitude: {coordinates.latitude}</p>
              <p>Longitude: {coordinates.longitude}</p>
              <Map 
                center={{
                  lat: coordinates.latitude,
                  lng: coordinates.longitude
                }}
                zoom={15}
           />
            </div>
          )
          : null}
      </div>
    );
}

export default App;