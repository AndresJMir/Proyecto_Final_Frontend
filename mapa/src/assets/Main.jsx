import React from 'react';
import ChargingPoints from '../components/ChargingPoints';

const Main = () => {
  return (
    <main style={{ backgroundColor: '#ff00ff', padding: '2rem', margin: '1rem' }}>
      <h2>MAPA</h2>
      <ChargingPoints />
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna a fringilla egestas, felis justo feugiat augue, ac bibendum metus eros eu augue.</p>
    </main>
  );
};

export default Main;
