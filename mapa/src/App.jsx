import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './assets/Header';
import Main from './assets/Main';
import Footer from './assets/Footer';
import LoginPage from './auth/login';
import UserPage from './components/user';
import { AuthProvider } from './auth/AuthContext';
import RegisterPage from './auth/register';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <div style={{ display: 'flex' }}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/user" element={<UserPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}


export default App;
