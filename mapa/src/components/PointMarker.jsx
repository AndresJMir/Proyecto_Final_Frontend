import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const PointMarker = ({ point }) => {
  const { latitude, longitude, name, status } = point;
  const markerColor = status === 'active' ? 'red' : 'gray';

  return (
    // <Marker position={[latitude, longitude]} icon={L.icon({ iconUrl: `https://example.com/marker-${markerColor}.png`, iconSize: [25, 41] })}>
    <Marker position={[latitude, longitude]} icon={L.icon({ iconUrl: `https://icons.getbootstrap.com/assets/icons/geo-alt-fill.svg`, iconSize: [25, 41] })}>
      <Popup>{name}</Popup>
    </Marker>
  );
};

export default PointMarker;
