import React from 'react';

interface Testimonial {
  id: string;
  image: string;
  name: string;
  text: string;
}

interface TestimonialCardProps extends Testimonial {
  index: number;
  activeIndex: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, name, text, index, activeIndex }) => {
  return (
    <div className={`testimonial-card ${index === activeIndex ? 'active' : ''}`} role="article">
      <div className="testimonial-image-wrapper">
        <img 
          src={image} 
          alt={`${name}'s profile`}
          className="testimonial-image"
          loading="lazy"
        />
      </div>
      <div className="testimonial-content">
        <blockquote className="testimonial-text">{text}</blockquote>
        <cite className="testimonial-name">{name}</cite>
      </div>
    </div>
  );
};

export default TestimonialCard;
