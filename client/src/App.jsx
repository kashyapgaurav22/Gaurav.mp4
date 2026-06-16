import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Player from './pages/Player';
import Admin from './pages/Admin';
import Account from './pages/Account';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watch/:id" element={<Player />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
