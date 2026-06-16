import React from 'react';

const Footer = () => {
  return (
    <div style={{ maxWidth: '980px', margin: '40px auto 0', padding: '0 4%', color: 'grey', fontSize: '13px', paddingBottom: '40px' }}>
      <div style={{ display: 'flex', gap: '25px', marginBottom: '20px', color: 'white' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" style={{ cursor: 'pointer' }}><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" style={{ cursor: 'pointer' }}><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" style={{ cursor: 'pointer' }}><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" style={{ cursor: 'pointer' }}><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '20px' }}>
        <a href="#" style={{ color: 'grey', textDecoration: 'none' }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>Audio Description</a>
        <a href="#" style={{ color: 'grey', textDecoration: 'none' }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>Help Centre</a>
        <a href="#" style={{ color: 'grey', textDecoration: 'none' }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>Gift Cards</a>
        <a href="#" style={{ color: 'grey', textDecoration: 'none' }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>Media Centre</a>
        <a href="#" style={{ color: 'grey', textDecoration: 'none' }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>Investor Relations</a>
        <a href="#" style={{ color: 'grey', textDecoration: 'none' }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>Jobs</a>
        <a href="#" style={{ color: 'grey', textDecoration: 'none' }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>Terms of Use</a>
        <a href="#" style={{ color: 'grey', textDecoration: 'none' }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>Privacy</a>
        <a href="#" style={{ color: 'grey', textDecoration: 'none' }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>Legal Notices</a>
        <a href="#" style={{ color: 'grey', textDecoration: 'none' }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>Cookie Preferences</a>
        <a href="#" style={{ color: 'grey', textDecoration: 'none' }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>Corporate Information</a>
        <a href="#" style={{ color: 'grey', textDecoration: 'none' }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>Contact Us</a>
      </div>
      <button style={{ background: 'transparent', border: '1px solid grey', color: 'grey', padding: '8px 12px', cursor: 'pointer', marginBottom: '20px', fontSize: '13px' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'grey'}>
        Service Code
      </button>
      <p style={{ fontSize: '11px' }}>© 1997-2026 Gaurav.mp4, Inc.</p>
    </div>
  );
};

export default Footer;
