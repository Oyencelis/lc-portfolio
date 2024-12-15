import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const eyes = document.querySelectorAll('.eye');
      eyes.forEach((eye) => {
        const box = (eye as HTMLElement).getBoundingClientRect();
        const centerX = box.left + box.width / 2;
        const centerY = box.top + box.height / 2;
        const rad = Math.atan2(e.pageX - centerX, e.pageY - centerY);
        const degree = (rad * (180 / Math.PI) * -1) + 180;
        (eye as HTMLElement).style.transform = `rotate(${degree}deg)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="not-found-container">
      <div className="glitch-wrapper">
        <div className="glitch" data-text="404">404</div>
      </div>
      
      <div className="robot">
        <div className="robot-head">
          <div className="eye-container">
            <div className="eye-wrapper">
              <div className="eye"></div>
            </div>
            <div className="eye-wrapper">
              <div className="eye"></div>
            </div>
          </div>
          <div className="mouth"></div>
        </div>
      </div>

      <div className="error-message">
        <h2>Oops! Page Not Found</h2>
        <p>Looks like you've ventured into the void...</p>
      </div>

      <Link to="/" className="home-button">
        <span className="button-content">
          <span className="button-text">Return Home</span>
          <span className="button-icon">→</span>
        </span>
      </Link>
    </div>
  );
};

export default NotFound;
