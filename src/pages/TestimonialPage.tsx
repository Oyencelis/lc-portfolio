// src/pages/TestimonialPage.tsx
import React, { useState, useCallback } from 'react';
import TestimonialCard from '../components/TestimonialCard';
import WaveBackground from '../components/WaveBackground';
import { testimonialData } from '../data/testimonials'; // Move data to separate file
import useIntersectionObserver from '../hooks/useIntersectionObserver'; // Create this hook

interface Testimonial {
  id: string;
  image: string;
  name: string;
  text: string;
}

const TestimonialPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const handlePrevious = useCallback(() => {
    setActiveIndex((prev) => 
      prev === 0 ? testimonialData.length - 1 : prev - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => 
      prev === testimonialData.length - 1 ? 0 : prev + 1
    );
  }, []);

  return (
    <section 
      className={`testimonial-section ${isVisible ? 'fade-in' : ''}`}
      ref={ref}
      aria-label="Testimonials"
    >
      <h1 className="testimonial-header">What People Say</h1>
      
      <div className="testimonial-grid">
        {testimonialData.map((testimonial: Testimonial, index: number) => (
          <TestimonialCard
            key={testimonial.id}
            {...testimonial}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </div>

      <div className="carousel-controls" aria-label="Testimonial navigation">
        <button
          className="carousel-arrow prev"
          onClick={handlePrevious}
          aria-label="Previous testimonial"
        >
          ←
        </button>
        <div className="carousel-dots">
          {testimonialData.map((_: any, index: number) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>
        <button
          className="carousel-arrow next"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
      <WaveBackground />
    </section>
  );
};

export default TestimonialPage;