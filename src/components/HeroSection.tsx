import React from 'react';
import '../styles/HeroSection.css';
import '../App.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>ThunderDome Innovations</h1>
      <p>Try out our ground breaking blockchain backed voting system!</p>
    </div>
  );
}

export default HeroSection;
