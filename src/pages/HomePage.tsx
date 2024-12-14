import React, { useState, useEffect, useRef } from "react";
import {
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaArrowDown,
} from "react-icons/fa";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaJava,
  FaPython,
  FaBootstrap,
} from "react-icons/fa";
import { SiTypescript, SiFlask, SiMysql, SiSpringboot } from "react-icons/si";

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isRoleChanging, setIsRoleChanging] = useState(false);

  const roles = ["Frontend Developer", "UI/UX Designer", "Web Designer", "Coding Enthusiast", "React Specialist", "Web Application Developer", "Student Developer", "Future Tech Leader"];

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const roleInterval = setInterval(() => {
      setIsRoleChanging(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsRoleChanging(false);
      }, 500);
    }, 3000);

    return () => clearInterval(roleInterval);
  }, []);

  return (
    <section className={`hero-section ${isVisible ? "visible" : ""}`}>
      <div className="hero-container">
        <div className="hero-header animate-on-scroll">
          <span className="greeting">Hey, I'm</span>
          <h1 className="glitch animate-role" data-text="Lawrence Celis">
            Lawrence Celis
          </h1>
          <h2 className={`role typewriter ${isRoleChanging ? "changing" : ""}`}>
            {roles[roleIndex]}
          </h2>
          <p className="tagline">
            Building digital experiences that{" "}
            <span className="highlight">merge innovation with style ✨</span>
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
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">2</span>
                <span className="stat-label">Years of Learning</span>
              </div>
            </div>

            <div className="bio-section">
              <p className="bio">
                By day, I'm a tech-savvy student, and by night, a coding ninja.
                I fuel my coding sessions with coffee and turn my ideas into
                digital realities. When I'm not squashing bugs, you can find me
                gaming with my squad or crafting the ultimate vibe playlist.
                🚀💻
              </p>

              <div className="fun-facts">
                <h3>Fun Facts</h3>
                <ul>
                  <li>🎮 Avid Gamer</li>
                  <li>🎵 Music Enthusiast</li>
                  <li>☕ Coffee Addict</li>
                </ul>
              </div>

              <a href="/resume.pdf" className="download-resume">
                View Resume
              </a>
            </div>
          </div>

          <div className="right-section">
            <div className="skills-container animate-on-scroll">
              <h3>Tech Stack</h3>
              <div className="skills">
                <span>
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaHtml5 /> HTML
                  </a>
                </span>
                <span>
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaCss3Alt /> CSS
                  </a>
                </span>
                <span>
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaJs /> JavaScript
                  </a>
                </span>
                <span>
                  <a
                    href="https://react.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaReact /> React
                  </a>
                </span>
                <span>
                  <a
                    href="https://www.typescriptlang.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiTypescript /> TypeScript
                  </a>
                </span>
                <span>
                  <a
                    href="https://www.java.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaJava /> Java
                  </a>
                </span>
                <span>
                  <a
                    href="https://flask.palletsprojects.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiFlask /> Flask
                  </a>
                </span>
                <span>
                  <a
                    href="https://www.python.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaPython /> Python
                  </a>
                </span>
                <span>
                  <a
                    href="https://getbootstrap.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaBootstrap /> Bootstrap
                  </a>
                </span>
                <span>
                  <a
                    href="https://www.mysql.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiMysql /> MySQL
                  </a>
                </span>
                <span>
                  <a
                    href="https://spring.io/projects/spring-boot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiSpringboot /> Spring Boot
                  </a>
                </span>
              </div>
            </div>

            <div className="action-section">
              <button
                className="learn-more"
                onClick={() => (window.location.href = "/projects")}
              >
                <span className="circle">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Projects</span>
              </button>

              <div className="collaboration-cta sticky-cta animate-on-scroll">
                <h3>Collab Time!</h3>
                <p>Project idea? Let's do this!</p>
                <button
                  className="cta-button"
                  aria-label="Contact Me For Collaboration"
                >
                  Let's Make Magic
                </button>
              </div>

              <div
                className="social-links"
                role="navigation"
                aria-label="Social media links"
              >
                <a
                  href="https://github.com/Oyencelis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="GitHub Profile"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.facebook.com/lawrence.celis.31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Facebook Profile"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.instagram.com/10.oyen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Instagram Profile"
                >
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
