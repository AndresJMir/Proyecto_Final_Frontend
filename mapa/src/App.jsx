import React from 'react';
import Header from './assets/Header';
import Main from './assets/Main';
import Sidebar from './assets/Sidebar';
import Footer from './assets/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ display: 'flex' }}>
        <Main />
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
