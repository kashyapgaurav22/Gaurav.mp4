import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';
import Footer from '../components/Footer';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const categoryFilterId = queryParams.get('category');
  const searchQuery = queryParams.get('search');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get('http://localhost:5000/api/categories');
        setCategories(catRes.data);
        if (searchQuery) {
          const vidRes = await axios.get('http://localhost:5000/api/videos');
          setAllVideos(vidRes.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [searchQuery]);

  const handleMoreInfo = (video) => {
    setSelectedVideo(video);
  };

  if (searchQuery) {
    const filtered = allVideos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    return (
      <div className="app-container">
        <Navbar />
        <div style={{ paddingTop: '100px', paddingLeft: '4%', paddingRight: '4%', minHeight: '100vh', zIndex: 10, position: 'relative' }}>
          <h2 style={{ color: 'white', marginBottom: '20px', fontSize: '1.5rem', fontWeight: '600' }}>Search Results for "{searchQuery}"</h2>
          {loading ? (
             <div style={{ display: 'flex', gap: '10px' }}>
               {[1,2,3,4].map(i => <div key={i} className="skeleton skeleton-card"></div>)}
             </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {filtered.map(v => <VideoCard key={v.id} video={v} onMoreInfo={handleMoreInfo} />)}
              {filtered.length === 0 && <p style={{ color: '#737373', fontSize: '1.2rem' }}>No videos found.</p>}
            </div>
          )}
        </div>
        <Footer />
        {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <Banner onMoreInfo={handleMoreInfo} />
      <div style={{ marginTop: '-20px', paddingBottom: '40px', position: 'relative', zIndex: 10 }}>
        {loading ? (
          <div style={{ paddingLeft: '4%' }}>
            <div className="skeleton skeleton-title"></div>
            <div style={{ display: 'flex' }}>
              {[1,2,3,4,5].map(i => <div key={i} className="skeleton skeleton-card"></div>)}
            </div>
          </div>
        ) : (
          <>
            {categoryFilterId && categoryFilterId !== 'destinations' ? (
              categories
                .filter(c => c.id === parseInt(categoryFilterId))
                .map(category => (
                  <Row key={category.id} title={`Genre: ${category.name}`} categoryId={category.id} onMoreInfo={handleMoreInfo} />
                ))
            ) : (
              <>
                <Row title="Trending Now" onMoreInfo={handleMoreInfo} />
                {categories.map(category => (
                  <Row key={category.id} title={category.name} categoryId={category.id} onMoreInfo={handleMoreInfo} />
                ))}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
      {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </div>
  );
};

export default Home;
