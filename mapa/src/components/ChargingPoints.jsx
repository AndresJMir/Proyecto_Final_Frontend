import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import L from 'leaflet';
import PointMarker from './PointMarker';
import Filters from './Filters';
import TypesSelector from './TypesSelector';
import { Link } from "react-router-dom";
import 'leaflet/dist/leaflet.css';

const ChargingPoints = () => {
  const [points, setPoints] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Este código crea un conjunto de tipos de puntos de recarga y devuelve un array único de tipos.
  const getUniqueTypes = () => {
    const types = [...new Set(points.map(point => point.type))];
    return types;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/charging-points');
        // console.log(response);
        if (!response.ok) {
          throw new Error('No se pudo obtener los datos de la API');
        }
        const data = await response.json();
        setPoints(data);
        console.log("Datos recibidos: "+data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTypeSelect = (typeId, checked) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, typeId]);
    } else {
      setSelectedTypes(selectedTypes.filter(id => id !== typeId));
    }
  };

  const filteredPoints = points.filter(point => {
    //console.log("Contenido de filteredPoints: "+filteredPoints);
    return (
      selectedTypes.length === 0 ||
      selectedTypes.includes(point.type)
    ) &&
      (filterStatus === '' || point.status === filterStatus);
  });
  const position = [51.505, -0.09]

  // if (loading) {
  //   return <div>Cargando...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="page-container" >
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '50vh'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
    // loading && <div>Cargando...</div> ||
    // <div className="page-container">
    //   <Map center={[40.3167, -3.3033]} zoom={12}>
    //     <TileLayer url="https://example.com/tile/{z}/{x}/{y}.png" />
    //     {filteredPoints.map(point => (
    //       <PointMarker key={point.id} point={point} />
    //     ))}
    //   </Map>
    //   <Filters onStatusChange={setFilterStatus} />
    //   <TypesSelector types={getUniqueTypes()} onTypeSelect={handleTypeSelect} />
    // </div>
  );
};

export default ChargingPoints;
