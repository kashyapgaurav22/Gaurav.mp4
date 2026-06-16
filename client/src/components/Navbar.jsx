import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Search, Bell } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showGenres, setShowGenres] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-left">
        <Link to="/" className="logo">
          Gaurav.mp4
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li 
            onMouseEnter={() => setShowGenres(true)} 
            onMouseLeave={() => setShowGenres(false)}
            style={{ position: 'relative', cursor: 'pointer' }}
          >
            <span style={{ color: 'var(--text-secondary)', fontSize: '14px', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'}
                  onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
              Genres ▼
            </span>
            {showGenres && (
              <div style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid #333', padding: '10px', minWidth: '150px', zIndex: 100 }}>
                {categories.map(c => (
                  <div key={c.id} style={{ padding: '8px', cursor: 'pointer', color: '#fff' }} onClick={() => navigate(`/?category=${c.id}`)}>
                    {c.name}
                  </div>
                ))}
              </div>
            )}
          </li>
          <li><a href="#" onClick={() => navigate('/?category=destinations')}>Destinations</a></li>
          <li><a href="#" onClick={() => navigate('/')}>All Vlogs</a></li>
        </ul>
      </div>
      
      <div className="nav-right">
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: showSearch ? 'rgba(0,0,0,0.75)' : 'transparent', border: showSearch ? '1px solid #fff' : 'none', padding: showSearch ? '5px' : '0', transition: 'all 0.3s' }}>
          <Search className="nav-icon" size={20} style={{ cursor: 'pointer' }} onClick={() => setShowSearch(!showSearch)} />
          {showSearch && (
            <input 
              type="text" 
              placeholder="Titles, people, genres" 
              autoFocus
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if(e.target.value) navigate(`/?search=${e.target.value}`);
                else navigate('/');
              }}
              style={{ background: 'transparent', border: 'none', color: 'white', marginLeft: '10px', outline: 'none', width: '200px' }}
            />
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <Bell className="nav-icon" size={20} style={{ cursor: 'pointer' }} onClick={() => setShowNotif(!showNotif)} />
          {showNotif && (
            <div style={{ position: 'absolute', top: '40px', right: '-50px', backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid #333', padding: '15px', width: '300px', zIndex: 100, borderRadius: '4px' }}>
              <h4 style={{ borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '10px', color: '#fff' }}>Notifications</h4>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}>
                <img src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=100" alt="notif" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                <p style={{ fontSize: '13px', color: '#e5e5e5' }}>New Arrival: Exploring Tokyo!</p>
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', cursor: 'pointer' }}>
                <img src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=100" alt="notif" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                <p style={{ fontSize: '13px', color: '#e5e5e5' }}>Trending: Backpacking across Switzerland</p>
              </div>
            </div>
          )}
        </div>
        {user ? (
          <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {user.role === 'ADMIN' && (
              <Link to="/admin" style={{ fontSize: '14px', color: '#e5e5e5' }}>Admin</Link>
            )}
            <div 
              onClick={() => navigate('/account')}
              style={{ width: '32px', height: '32px', backgroundColor: '#e50914', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
              title="Account"
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        ) : (
          <Link to="/login" style={{ color: '#fff', fontSize: '14px', backgroundColor: '#e50914', padding: '5px 15px', borderRadius: '4px' }}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
