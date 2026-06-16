import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Play, Info, VolumeX, Volume2 } from 'lucide-react';
import ReactPlayer from 'react-player';

const Banner = ({ onMoreInfo }) => {
  const [video, setVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/videos/featured');
        if (data.length > 0) {
          setVideo(data[Math.floor(Math.random() * data.length)]);
        }
      } catch (error) {
        console.error('Failed to fetch featured video', error);
      }
    };
    fetchFeatured();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  const fallbackImage = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  return (
    <header className="banner fade-in" style={{ 
      position: 'relative', 
      height: '90vh', 
      overflow: 'hidden',
      backgroundColor: '#000'
    }}>
      {/* Fallback Thumbnail Image */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: `url(${video?.thumbnailUrl || fallbackImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 0,
        transition: 'opacity 1s ease',
        opacity: isReady ? 0 : 1
      }} />

      {/* Native HTML5 Video Layer — plays local dummy video */}
      {video && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 1s ease'
        }}>
          <video
            src="/hero-video.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onCanPlay={() => setIsReady(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Content Overlay */}
      <div style={{ 
        zIndex: 3, position: 'absolute', top: '28%', left: '4%', width: '42%',
        animation: 'fadeSlideUp 0.8s ease forwards'
      }}>
        <p style={{ 
          color: '#e50914', fontSize: '14px', fontWeight: 700, letterSpacing: '2px', 
          textTransform: 'uppercase', marginBottom: '10px'
        }}>GAURAV.MP4 ORIGINAL</p>
        <h1 style={{ 
          fontSize: '3.2rem', fontWeight: 800, lineHeight: 1.1, 
          textShadow: '2px 2px 8px rgba(0,0,0,0.6)', marginBottom: '18px'
        }}>
          {video?.title || "Mountain Adventures"}
        </h1>
        <p style={{ 
          fontSize: '1rem', lineHeight: 1.5, color: '#ddd', maxWidth: '500px', 
          textShadow: '1px 1px 3px rgba(0,0,0,0.6)', marginBottom: '24px'
        }}>
          {video ? truncate(video.description, 180) : "Experience breathtaking heights of the world's most majestic peaks."}
        </p>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button className="banner-button play" onClick={() => video && (window.location.href = `/watch/${video.youtubeId}`)}>
            <Play size={22} fill="currentColor" /> Play
          </button>
          <button className="banner-button info" onClick={() => video && onMoreInfo && onMoreInfo(video)}>
            <Info size={22} /> More Info
          </button>
        </div>
      </div>

      {/* Mute/Unmute & Maturity Rating */}
      <div style={{ 
        position: 'absolute', bottom: '35%', right: '4%', zIndex: 3,
        display: 'flex', alignItems: 'center', gap: '15px'
      }}>
        <button 
          onClick={() => setIsMuted(!isMuted)}
          style={{ 
            width: '42px', height: '42px', borderRadius: '50%', 
            border: '2px solid rgba(255,255,255,0.6)', backgroundColor: 'rgba(0,0,0,0.3)',
            color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color 0.2s'
          }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <span style={{ 
          padding: '4px 14px 4px 22px', borderLeft: '3px solid #ddd',
          backgroundColor: 'rgba(51,51,51,0.6)', fontSize: '14px', fontWeight: 500
        }}>U/A 13+</span>
      </div>

      {/* Bottom Fade */}
      <div className="banner-fadeBottom" style={{ zIndex: 2 }} />
    </header>
  );
};

export default Banner;
