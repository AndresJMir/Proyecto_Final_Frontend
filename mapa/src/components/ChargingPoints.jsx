import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'leaflet';
import L from 'leaflet';
import PointMarker from './PointMarker';
import Filters from './Filters';
import TypesSelector from './TypesSelector';
import { Link } from "react-router-dom";

const ChargingPoints = () => {
  const [points, setPoints] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/charging-points');
        console.log(response);
        if (!response.ok) {
          throw new Error('No se pudo obtener los datos de la API');
        }
        const data = await response.json();
        setPoints(data);
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
    return (
      selectedTypes.length === 0 ||
      selectedTypes.includes(point.type)
    ) &&
      (filterStatus === '' || point.status === filterStatus);
  });

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page-container">
      {/* ... */}
    </div>
  );
};

export default ChargingPoints;