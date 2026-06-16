import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import VideoCard from './VideoCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Row = ({ title, categoryId, onMoreInfo }) => {
  const [videos, setVideos] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const url = categoryId 
          ? `http://localhost:5000/api/videos?categoryId=${categoryId}` 
          : 'http://localhost:5000/api/videos';
        const { data } = await axios.get(url);
        setVideos(data);
      } catch (error) {
        console.error('Error fetching row videos:', error);
      }
    };
    fetchVideos();
  }, [categoryId]);

  const scrollLeft = () => {
    if (rowRef.current) rowRef.current.scrollBy({ left: -800, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (rowRef.current) rowRef.current.scrollBy({ left: 800, behavior: 'smooth' });
  };

  if (videos.length === 0) return null;

  return (
    <div className="row fade-in">
      <h2>{title}</h2>
      <div className="row-wrapper">
        <button className="row-arrow row-arrow--left" onClick={scrollLeft}>
          <ChevronLeft size={32} />
        </button>
        <div className="row-posters" ref={rowRef}>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onMoreInfo={onMoreInfo} />
          ))}
        </div>
        <button className="row-arrow row-arrow--right" onClick={scrollRight}>
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default Row;
