import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Play, Plus, ThumbsUp, X, Volume2, VolumeX } from 'lucide-react';
import ReactPlayer from 'react-player';
import VideoCard from './VideoCard';

const VideoModal = ({ video, onClose }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fetchRecs = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/videos?categoryId=${video.categoryId}`);
        setRecommendations(data.filter(v => v.id !== video.id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecs();
    return () => { document.body.style.overflow = 'auto'; };
  }, [video]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>
          <X size={22} />
        </button>

        {/* Hero Section with Video Player */}
        <div className="modal-hero">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            playing={true}
            muted={isMuted}
            controls={false}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            config={{
              youtube: {
                playerVars: { modestbranding: 1, controls: 0, showinfo: 0, disablekb: 1, fs: 0, autoplay: 1, mute: 1, playsinline: 1, rel: 0, iv_load_policy: 3 }
              }
            }}
          />
          {/* Gradient at bottom of hero */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
            background: 'linear-gradient(to top, #181818, transparent)'
          }} />

          {/* Title & Buttons overlayed */}
          <div style={{ position: 'absolute', bottom: '40px', left: '48px', zIndex: 5 }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '20px', textShadow: '2px 2px 6px rgba(0,0,0,0.6)' }}>
              {video.title}
            </h1>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button className="banner-button play" onClick={() => window.location.href = `/watch/${video.youtubeId}`}>
                <Play size={22} fill="currentColor" /> Play
              </button>
              <button className="modal-icon-btn" title="Add to My List"><Plus size={22} /></button>
              <button className="modal-icon-btn" title="I like this"><ThumbsUp size={22} /></button>
            </div>
          </div>

          {/* Mute/Unmute + Rating */}
          <div style={{ position: 'absolute', bottom: '50px', right: '48px', zIndex: 5, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{
                width: '38px', height: '38px', borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.6)', backgroundColor: 'rgba(0,0,0,0.4)',
                color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <span style={{
              padding: '3px 12px 3px 18px', borderLeft: '3px solid #ddd',
              backgroundColor: 'rgba(51,51,51,0.6)', fontSize: '13px'
            }}>U/A 13+</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="modal-details">
          <div className="modal-details__left">
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ color: '#46d369', fontWeight: 700 }}>98% Match</span>
              <span style={{ color: '#bcbcbc' }}>{video.releaseDate ? new Date(video.releaseDate).getFullYear() : '2026'}</span>
              <span style={{ border: '1px solid #777', padding: '1px 6px', fontSize: '12px', color: '#bcbcbc' }}>HD</span>
              <span style={{ border: '1px solid #777', padding: '1px 6px', fontSize: '12px', color: '#bcbcbc' }}>U/A 13+</span>
            </div>
            <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#d2d2d2' }}>
              {video.description}
            </p>
          </div>
          <div className="modal-details__right">
            <p style={{ marginBottom: '10px', fontSize: '14px', color: '#777' }}>
              <span style={{ color: '#777' }}>Genres: </span>
              <span style={{ color: '#fff' }}>{video.category?.name || 'Travel Vlogs'}</span>
            </p>
            <p style={{ marginBottom: '10px', fontSize: '14px', color: '#777' }}>
              <span style={{ color: '#777' }}>This vlog is: </span>
              <span style={{ color: '#fff' }}>Exciting, Scenic, Adventurous</span>
            </p>
          </div>
        </div>

        {/* More Like This */}
        {recommendations.length > 0 && (
          <div style={{ padding: '0 48px 48px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px' }}>More Like This</h3>
            <div className="modal-recs">
              {recommendations.slice(0, 6).map(rec => (
                <div key={rec.id} className="modal-rec-card" onClick={() => window.location.href = `/watch/${rec.youtubeId}`}>
                  <img 
                    src={rec.thumbnailUrl || `https://img.youtube.com/vi/${rec.youtubeId}/hqdefault.jpg`}
                    alt={rec.title}
                    style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px 4px 0 0' }}
                  />
                  <div style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ color: '#46d369', fontSize: '13px', fontWeight: 600 }}>98% Match</span>
                      <span style={{ border: '1px solid #777', padding: '1px 5px', fontSize: '11px', color: '#bcbcbc' }}>U/A 13+</span>
                    </div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>{rec.title}</h4>
                    <p style={{ fontSize: '12px', color: '#d2d2d2', lineHeight: 1.4, maxHeight: '50px', overflow: 'hidden' }}>
                      {rec.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
