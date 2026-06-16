import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Account = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <div style={{ color: 'white', padding: '100px' }}>Please log in to view account details.</div>;

  return (
    <div className="app-container">
      <Navbar />
      <div style={{ paddingTop: '100px', paddingLeft: '4%', paddingRight: '4%', flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', fontWeight: '500', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Account</h1>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: '#e50914', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>{user.name}</p>
            <p style={{ color: '#737373' }}>{user.email}</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #333', borderBottom: '1px solid #333', padding: '20px 0', marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ color: '#737373', fontSize: '1.1rem', fontWeight: '400', marginBottom: '10px' }}>PLAN DETAILS</h3>
            <p style={{ fontWeight: 'bold' }}>Premium</p>
          </div>
          <button style={{ color: '#0080ff', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Change plan</button>
        </div>

        <button 
          onClick={logout}
          style={{ width: '100%', padding: '15px', backgroundColor: '#e5e5e5', color: '#000', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}
        >
          Sign Out
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
