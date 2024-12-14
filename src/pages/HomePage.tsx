import React, { useState, useEffect } from "react";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin, FaArrowDown } from "react-icons/fa";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaPython, FaBootstrap } from "react-icons/fa";
import { SiTypescript, SiFlask, SiMysql, SiSpringboot } from "react-icons/si";

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  
  const roles = ["Web Developer", "UI/UX Designer", "E-Commerce Innovator"];

  useEffect(() => {
    setIsVisible(true);
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(roleInterval);
  }, []);

  return (
    <section className={`hero-section ${isVisible ? "visible" : ""}`}>
      <div className="hero-container">
        <div className="hero-header">
          <span className="greeting">Hi, I'm</span>
          <h1 className="glitch" data-text="Lawrence Celis">
            Lawrence Celis
          </h1>
          <h2 className="role animate-role">{roles[roleIndex]}</h2>
          <p className="tagline typewriter">
            Crafting digital experiences that{" "}
            <span className="glitch" data-text="blend innovation with elegance ✨">
              blend innovation with elegance ✨
            </span>
          </p>
          
          <div className="scroll-indicator">
            <span>Scroll Down</span>
            <FaArrowDown className="bounce" />
          </div>
        </div>

        <div className="content-wrapper">
          <div className="left-section">
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">5+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">2</span>
                <span className="stat-label">Years of Learning</span>
              </div>
            </div>

            <div className="bio-section">
              <p className="bio">
                Tech enthusiast by day, code wizard by night. BSIT student
                turning caffeine into code and dreams into websites. When not
                debugging, you'll find me leveling up in games or curating the
                perfect playlist. 🎮 🎵
              </p>
              
              <div className="fun-facts">
                <h3>Fun Facts</h3>
                <ul>
                  <li>🎮 Avid Gamer</li>
                  <li>🎵 Music Enthusiast</li>
                  <li>☕ Coffee Addict</li>
                </ul>
              </div>
              
              <a href="/resume.pdf" className="download-resume" download>
                Download Resume
              </a>
            </div>
          </div>

          <div className="right-section">
            <div className="skills-container">
              <h3>Tech Arsenal</h3>
              <div className="skills">
                <span>
                  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer">
                    <FaHtml5 /> HTML
                  </a>
                </span>
                <span>
                  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer">
                    <FaCss3Alt /> CSS
                  </a>
                </span>
                <span>
                  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">
                    <FaJs /> JavaScript
                  </a>
                </span>
                <span>
                  <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
                    <FaReact /> React
                  </a>
                </span>
                <span>
                  <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
                    <SiTypescript /> TypeScript
                  </a>
                </span>
                <span>
                  <a href="https://www.java.com/" target="_blank" rel="noopener noreferrer">
                    <FaJava /> Java
                  </a>
                </span>
                <span>
                  <a href="https://flask.palletsprojects.com/" target="_blank" rel="noopener noreferrer">
                    <SiFlask /> Flask
                  </a>
                </span>
                <span>
                  <a href="https://www.python.org/" target="_blank" rel="noopener noreferrer">
                    <FaPython /> Python
                  </a>
                </span>
                <span>
                  <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">
                    <FaBootstrap /> Bootstrap
                  </a>
                </span>
                <span>
                  <a href="https://www.mysql.com/" target="_blank" rel="noopener noreferrer">
                    <SiMysql /> MySQL
                  </a>
                </span>
                <span>
                  <a href="https://spring.io/projects/spring-boot" target="_blank" rel="noopener noreferrer">
                    <SiSpringboot /> Spring Boot
                  </a>
                </span>
              </div>
            </div>

            <div className="action-section">
              <button className="learn-more" onClick={() => window.location.href = '/projects'}>
                <span className="circle">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Projects</span>
              </button>

              <div className="collaboration-cta">
                <h3>Let's Work Together!</h3>
                <p>Have a project in mind? Let's make it happen.</p>
              </div>

              <div className="social-links">
                <a href="https://github.com/Oyencelis" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaLinkedin />
                </a>
                <a href="https://www.facebook.com/lawrence.celis.31" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com/10.oyen/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
