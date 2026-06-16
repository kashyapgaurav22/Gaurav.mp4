import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ youtubeId: '', title: '', description: '', thumbnailUrl: '', categoryId: '', isFeatured: false });
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const catRes = await axios.get('http://localhost:5000/api/categories');
      setCategories(catRes.data);
      const vidRes = await axios.get('http://localhost:5000/api/videos');
      setVideos(vidRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const config = { headers: { Authorization: `Bearer ${user?.token}` } };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/videos', newVideo, config);
      fetchData();
      setNewVideo({ youtubeId: '', title: '', description: '', thumbnailUrl: '', categoryId: '', isFeatured: false });
    } catch (err) {
      alert('Error adding video');
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/categories', newCategory, config);
      fetchData();
      setNewCategory({ name: '', description: '' });
    } catch (err) {
      alert('Error adding category');
    }
  };

  const handleDeleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`, config);
      fetchData();
    } catch (err) {
      alert('Error deleting video');
    }
  };

  const handleSetHero = async (id) => {
    try {
      // First, unset all current featured videos
      for (const v of videos) {
        if (v.isFeatured) {
          await axios.put(`http://localhost:5000/api/videos/${v.id}`, { isFeatured: false }, config);
        }
      }
      // Then set the selected one as featured
      await axios.put(`http://localhost:5000/api/videos/${id}`, { isFeatured: true }, config);
      fetchData();
      alert('Hero banner updated!');
    } catch (err) {
      alert('Error setting hero banner');
    }
  };

  if (!user || user.role !== 'ADMIN') return null;

  const inputStyle = { padding: '12px 14px', borderRadius: '4px', border: 'none', backgroundColor: '#333', color: '#fff', fontSize: '14px' };
  const labelStyle = { fontSize: '13px', color: '#aaa', marginBottom: '4px' };

  return (
    <div style={{ padding: '80px 4% 40px', color: '#fff', minHeight: '100vh', backgroundColor: '#141414' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Admin Dashboard</h1>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: 'transparent', border: '1px solid #555', color: '#fff', borderRadius: '4px', transition: 'background 0.2s' }}
          onMouseOver={e => e.target.style.backgroundColor = '#333'}
          onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
        >← Back to Home</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        {/* Add Category */}
        <div style={{ backgroundColor: '#1e1e1e', padding: '28px', borderRadius: '8px', border: '1px solid #2a2a2a' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '12px' }}>Add Category</h2>
          <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={labelStyle}>Category Name</label>
              <input type="text" placeholder="e.g. Japan, Mountains, Food" value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value})} required style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={labelStyle}>Description</label>
              <textarea placeholder="Brief description of this category" value={newCategory.description} onChange={e => setNewCategory({...newCategory, description: e.target.value})} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
            </div>
            <button type="submit" style={{ padding: '12px', backgroundColor: '#e50914', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 600, fontSize: '14px', transition: 'background 0.2s' }}
              onMouseOver={e => e.target.style.backgroundColor = '#f40612'}
              onMouseOut={e => e.target.style.backgroundColor = '#e50914'}
            >Add Category</button>
          </form>
        </div>

        {/* Add Video */}
        <div style={{ backgroundColor: '#1e1e1e', padding: '28px', borderRadius: '8px', border: '1px solid #2a2a2a' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '12px' }}>Add Video</h2>
          <form onSubmit={handleAddVideo} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={labelStyle}>YouTube ID</label>
                <input type="text" placeholder="e.g. dQw4w9WgXcQ" value={newVideo.youtubeId} onChange={e => setNewVideo({...newVideo, youtubeId: e.target.value})} required style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={labelStyle}>Title</label>
                <input type="text" placeholder="Video title" value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} required style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={labelStyle}>Description</label>
              <textarea placeholder="Detailed description of this video" value={newVideo.description} onChange={e => setNewVideo({...newVideo, description: e.target.value})} required style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={labelStyle}>Thumbnail URL (optional)</label>
                <input type="text" placeholder="https://..." value={newVideo.thumbnailUrl} onChange={e => setNewVideo({...newVideo, thumbnailUrl: e.target.value})} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={labelStyle}>Category</label>
                <select value={newVideo.categoryId} onChange={e => setNewVideo({...newVideo, categoryId: e.target.value})} required style={inputStyle}>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" checked={newVideo.isFeatured} onChange={e => setNewVideo({...newVideo, isFeatured: e.target.checked})} style={{ width: '18px', height: '18px', accentColor: '#e50914' }} />
              <span style={{ fontSize: '14px' }}>Set as Hero Banner (plays in background on homepage)</span>
            </label>
            <button type="submit" style={{ padding: '12px', backgroundColor: '#e50914', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 600, fontSize: '14px', transition: 'background 0.2s' }}
              onMouseOver={e => e.target.style.backgroundColor = '#f40612'}
              onMouseOut={e => e.target.style.backgroundColor = '#e50914'}
            >Add Video</button>
          </form>
        </div>
      </div>

      {/* Manage Videos Table */}
      <div style={{ backgroundColor: '#1e1e1e', padding: '28px', borderRadius: '8px', border: '1px solid #2a2a2a' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '12px' }}>Manage Videos</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #333', textAlign: 'left' }}>
                <th style={{ padding: '12px 10px', color: '#aaa', fontWeight: 500 }}>Thumbnail</th>
                <th style={{ padding: '12px 10px', color: '#aaa', fontWeight: 500 }}>Title</th>
                <th style={{ padding: '12px 10px', color: '#aaa', fontWeight: 500 }}>Category</th>
                <th style={{ padding: '12px 10px', color: '#aaa', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '12px 10px', color: '#aaa', fontWeight: 500, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map(v => (
                <tr key={v.id} style={{ borderBottom: '1px solid #2a2a2a', transition: 'background 0.15s' }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#252525'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '10px' }}>
                    <img src={v.thumbnailUrl || `https://img.youtube.com/vi/${v.youtubeId}/default.jpg`} alt={v.title} style={{ width: '80px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                  </td>
                  <td style={{ padding: '10px', fontWeight: 500 }}>{v.title}</td>
                  <td style={{ padding: '10px', color: '#aaa' }}>{v.category?.name || '—'}</td>
                  <td style={{ padding: '10px' }}>
                    {v.isFeatured ? (
                      <span style={{ backgroundColor: '#e50914', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>HERO</span>
                    ) : (
                      <span style={{ color: '#666', fontSize: '12px' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => handleSetHero(v.id)} 
                        disabled={v.isFeatured}
                        style={{ 
                          backgroundColor: v.isFeatured ? '#333' : 'transparent', 
                          color: v.isFeatured ? '#666' : '#46d369', 
                          border: `1px solid ${v.isFeatured ? '#333' : '#46d369'}`, 
                          padding: '6px 14px', cursor: v.isFeatured ? 'default' : 'pointer', 
                          borderRadius: '4px', fontSize: '12px', fontWeight: 600,
                          transition: 'all 0.2s'
                        }}
                      >
                        {v.isFeatured ? 'Current Hero' : 'Set as Hero'}
                      </button>
                      <button onClick={() => handleDeleteVideo(v.id)} style={{ backgroundColor: 'transparent', color: '#e50914', border: '1px solid #e50914', padding: '6px 14px', cursor: 'pointer', borderRadius: '4px', fontSize: '12px', fontWeight: 600, transition: 'all 0.2s' }}
                        onMouseOver={e => { e.target.style.backgroundColor = '#e50914'; e.target.style.color = '#fff'; }}
                        onMouseOut={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#e50914'; }}
                      >Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
