import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';

const VideoCard = ({ video, onMoreInfo }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState(null);
  const hoverTimeout = useRef(null);
  const hideTimeout = useRef(null);
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(hideTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
        setIsHovered(true);
      }
    }, 400);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    hideTimeout.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    navigate(`/watch/${video.youtubeId}`);
  };

  const handleInfo = (e) => {
    e.stopPropagation();
    if (onMoreInfo) onMoreInfo(video);
  };

  const genreTags = video.category ? [video.category.name] : ['Travel'];
  const imageUrl = video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <>
      <div 
        ref={cardRef}
        className="video-card-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={imageUrl}
          alt={video.title}
          className="video-thumbnail-base"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
          }}
        />
      </div>

      {isHovered && coords && createPortal(
        <div 
          className="video-card-hover-portal"
          onMouseEnter={() => { clearTimeout(hideTimeout.current); clearTimeout(hoverTimeout.current); setIsHovered(true); }}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'absolute',
            top: coords.top + coords.height / 2,
            left: coords.left + coords.width / 2,
            zIndex: 9999
          }}
        >
          <img
            src={imageUrl}
            alt={video.title}
            className="video-thumbnail-expanded"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            }}
          />
          
          <div className="video-info-box">
            <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>{video.title}</h4>
            
            <div className="video-card__actions">
              <div className="video-card__actions-left">
                <button className="video-card__btn video-card__btn--play" onClick={handlePlay} title="Play">
                  <Play size={16} fill="#000" />
                </button>
                <button className="video-card__btn" title="Add to My List">
                  <Plus size={16} />
                </button>
                <button className="video-card__btn" title="I like this">
                  <ThumbsUp size={16} />
                </button>
              </div>
              <button className="video-card__btn" onClick={handleInfo} title="More Info">
                <ChevronDown size={16} />
              </button>
            </div>

            <div className="video-card__meta">
              <span className="video-card__match">98% Match</span>
              <span className="video-card__rating">U/A 13+</span>
              <span className="video-card__hd">HD</span>
            </div>

            <div className="video-card__tags">
              {genreTags.map((tag, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="video-card__tag-dot">•</span>}
                  <span>{tag}</span>
                </React.Fragment>
              ))}
              <span className="video-card__tag-dot">•</span>
              <span>{video.releaseDate ? new Date(video.releaseDate).getFullYear() : '2026'}</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default VideoCard;
