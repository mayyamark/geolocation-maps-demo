import GoogleMapReact from 'google-map-react';

const Map = ({ center, zoom }) => {
  return (
  <div style={{ height: '600px', width: '600px' }}>
    <GoogleMapReact
      // bootstrapURLKeys={{ key: GOOGLE_API_KEY }} // Без Google API key, ще излиза съобщение "Тази страница не може да зареди Google Карти правилно." и върху картата ще има надписи "For development purposes only"
      defaultCenter={center}
      defaultZoom={zoom}
      yesIWantToUseGoogleMapApiInternals={true}
      onGoogleApiLoaded={({ map, maps }) => (
        new maps.Marker({
          position: center,
          map,
          title: "User Location"
        })
      )}
    >
      </GoogleMapReact>
  </div>
  );
}

export default Map;