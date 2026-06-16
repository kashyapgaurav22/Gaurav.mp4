import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipForward, SkipBack, ArrowLeft
} from 'lucide-react';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const controlsTimeout = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [brightness, setBrightness] = useState(1); // Default brightness 100%
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#000';

    const fetchVideo = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/videos');
        const videos = await res.json();
        const found = videos.find(v => v.youtubeId === id || v.id.toString() === id);
        if (found) setVideoTitle(found.title);
      } catch(e) { console.error(e); }
    };
    fetchVideo();

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.backgroundColor = '';
    };
  }, [id]);

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    resetControlsTimer();
    return () => clearTimeout(controlsTimeout.current);
  }, [isPlaying, resetControlsTimer]);

  useEffect(() => {
    const handleKey = (e) => {
      resetControlsTimer();
      switch(e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'm':
          toggleMute();
          break;
        case 'ArrowLeft':
          skip(-10);
          break;
        case 'ArrowRight':
          skip(10);
          break;
        case 'ArrowUp':
          setVolume(v => Math.min(1, v + 0.1));
          if (videoRef.current) videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1);
          break;
        case 'ArrowDown':
          setVolume(v => Math.max(0, v - 0.1));
          if (videoRef.current) videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1);
          break;
        case 'Escape':
          if (document.fullscreenElement) document.exitFullscreen();
          else navigate(-1);
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    if (video) video.currentTime += seconds;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted && volume === 0) {
      setVolume(1);
      video.volume = 1;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (video.buffered.length > 0) {
      setBuffered(video.buffered.end(video.buffered.length - 1));
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current?.duration || 0);
    setIsLoading(false);
  };

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const video = videoRef.current;
    if (video) video.currentTime = pos * video.duration;
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleBrightnessChange = (e) => {
    setBrightness(parseFloat(e.target.value));
  };

  const formatTime = (s) => {
    if (isNaN(s)) return '0:00';
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    return `${m}:${String(sec).padStart(2,'0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferProgress = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      onMouseMove={resetControlsTimer}
      onClick={resetControlsTimer}
      style={{
        width: '100vw', height: '100vh', backgroundColor: '#000',
        position: 'relative', cursor: showControls ? 'default' : 'none',
        overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
    >
      {/* Screen Brightness Dimmer Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,1)',
        opacity: 1 - brightness, /* brightness=1 -> opacity=0, brightness=0.2 -> opacity=0.8 */
        pointerEvents: 'none',
        zIndex: 9999 /* Must sit above everything to dim the entire screen including controls */
      }} />

      {/* Native HTML5 Video Player */}
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        onClick={togglePlay}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          zIndex: 5, width: '60px', height: '60px', pointerEvents: 'none',
          border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #e50914',
          borderRadius: '50%', animation: 'spin 0.8s linear infinite'
        }} />
      )}

      {/* Left Brightness Slider */}
      <div style={{
        position: 'absolute', left: '40px', top: '50%', transform: 'translateY(-50%)',
        zIndex: 10, opacity: showControls ? 1 : 0, transition: 'opacity 0.3s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', pointerEvents: showControls ? 'auto' : 'none'
      }}>
        <input 
          type="range" min="0.2" max="2" step="0.1" value={brightness} onChange={handleBrightnessChange}
          style={{ transform: 'rotate(-90deg)', width: '150px', height: '4px', accentColor: '#fff', cursor: 'pointer', marginBottom: '70px' }}
        />
        <span style={{ color: '#fff', fontSize: '12px', marginTop: '70px', fontWeight: 'bold', textShadow: '1px 1px 2px #000' }}>BRIGHTNESS</span>
      </div>

      {/* Right Volume Slider */}
      <div style={{
        position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)',
        zIndex: 10, opacity: showControls ? 1 : 0, transition: 'opacity 0.3s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', pointerEvents: showControls ? 'auto' : 'none'
      }}>
        <input 
          type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume} onChange={handleVolumeChange}
          style={{ transform: 'rotate(-90deg)', width: '150px', height: '4px', accentColor: '#e50914', cursor: 'pointer', marginBottom: '70px' }}
        />
        <span style={{ color: '#fff', fontSize: '12px', marginTop: '70px', fontWeight: 'bold', textShadow: '1px 1px 2px #000' }}>VOLUME</span>
      </div>

      {/* Top Header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '120px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
        zIndex: 10, opacity: showControls ? 1 : 0, transition: 'opacity 0.3s',
        display: 'flex', alignItems: 'flex-start', padding: '30px 40px',
        pointerEvents: showControls ? 'auto' : 'none'
      }}>
        <button 
          onClick={(e) => { e.stopPropagation(); navigate(-1); }}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            background: 'none', border: 'none', color: '#fff',
            cursor: 'pointer', fontSize: '18px', fontWeight: 600
          }}
        >
          <ArrowLeft size={28} /> 
          <span style={{ fontSize: '22px', fontWeight: 700 }}>{videoTitle || 'Back to Browse'}</span>
        </button>
      </div>

      {/* Bottom Controls */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
        zIndex: 10, opacity: showControls ? 1 : 0, transition: 'opacity 0.3s',
        padding: '0 40px 24px', pointerEvents: showControls ? 'auto' : 'none'
      }}>
        {/* Progress Bar */}
        <div 
          ref={progressRef}
          onClick={handleProgressClick}
          style={{
            width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.2)',
            cursor: 'pointer', borderRadius: '2px', marginBottom: '16px',
            position: 'relative', transition: 'height 0.1s'
          }}
          onMouseOver={(e) => e.currentTarget.style.height = '8px'}
          onMouseOut={(e) => e.currentTarget.style.height = '4px'}
        >
          {/* Buffered */}
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: `${bufferProgress}%`, backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '2px'
          }} />
          {/* Played */}
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: `${progress}%`, backgroundColor: '#e50914',
            borderRadius: '2px', transition: 'width 0.1s linear'
          }}>
            {/* Thumb */}
            <div style={{
              position: 'absolute', right: '-8px', top: '50%', transform: 'translateY(-50%)',
              width: '16px', height: '16px', borderRadius: '50%',
              backgroundColor: '#e50914', opacity: 1, boxShadow: '0 0 5px rgba(0,0,0,0.5)'
            }} />
          </div>
        </div>

        {/* Controls Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} style={btnStyle}>
              {isPlaying ? <Pause size={32} fill="#fff" /> : <Play size={32} fill="#fff" />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); skip(-10); }} style={btnStyle}>
              <SkipBack size={28} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); skip(10); }} style={btnStyle}>
              <SkipForward size={28} />
            </button>

            {/* Volume */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="volume-control">
              <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} style={btnStyle}>
                {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                onClick={(e) => e.stopPropagation()}
                style={{ width: '100px', accentColor: '#e50914', cursor: 'pointer' }}
              />
            </div>

            {/* Time */}
            <span style={{ fontSize: '15px', color: '#fff', fontWeight: 500, fontVariantNumeric: 'tabular-nums', marginLeft: '10px' }}>
              {formatTime(currentTime)} <span style={{ color: '#aaa', margin: '0 4px' }}>/</span> {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} style={btnStyle}>
              {isFullscreen ? <Minimize size={28} /> : <Maximize size={28} />}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
      `}</style>
    </div>
  );
};

const btnStyle = {
  background: 'none', border: 'none', color: '#fff',
  cursor: 'pointer', display: 'flex', alignItems: 'center',
  padding: '4px', transition: 'transform 0.1s'
};

export default Player;
