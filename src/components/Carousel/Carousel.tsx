import React, { useState } from 'react';
import './Carousel.css';

import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpeg';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [image1, image2, image3, image4];
  const imagesToShow = 2;

 

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const getVisibleImages = () => {
    let visibleImages = [];
    for (let i = 0; i < imagesToShow; i++) {
      visibleImages.push(images[(currentIndex + i) % images.length]);
    }
    return visibleImages;
  };

  return (
    <div className="carousel">
      
      <div className="carousel-images">
        {getVisibleImages().map((image, index) => (
          <img 
            src={image} 
            alt={`Slide ${currentIndex + index}`} 
            key={index} 
            className={`carousel-image ${index === 0 ? 'carousel-image-large' : ''}`} 
          />
        ))}
      </div>
      <button className="carousel-button next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
