import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaFacebook, FaInstagram, FaArrowDown } from "react-icons/fa";
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

  const roles = [
    "A College Student",
    "Tech Enthusiast",
    "Web Designer",
    "AI Expert",
    "Coding Ninja",
    "Future Tech Leader",
  ];

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

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    const greetings = {
      morning: ["Rise and shine!"],
      afternoon: ["Hey there!"],
      evening: ["Time to code!"],
      night: ["Working late?"],
    };

    let timeOfDay;
    let emoji;

    if (hour >= 5 && hour < 12) {
      timeOfDay = "morning";
      emoji = "☀️";
    } else if (hour >= 12 && hour < 17) {
      timeOfDay = "afternoon";
      emoji = "🌤️";
    } else if (hour >= 17 && hour < 22) {
      timeOfDay = "evening";
      emoji = "🌅";
    } else {
      timeOfDay = "night";
      emoji = "🌙";
    }

    const randomIndex = Math.floor(
      Math.random() * greetings[timeOfDay as keyof typeof greetings].length
    );
    return `${
      greetings[timeOfDay as keyof typeof greetings][randomIndex]
    } ${emoji}`;
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className={`hero-section ${isVisible ? "visible" : ""}`}>
      <div className="hero-container">
        <div className="hero-header animate-on-scroll">
          <span className="greeting">{getTimeBasedGreeting()} <br /><br /> I'm</span>
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

          <div className="scroll-indicator" onClick={scrollToContent}>
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
                gaming with my squad, crafting the ultimate vibe playlist, or
                experimenting with AI tools to create futuristic magic. 🚀💻🤖
              </p>

              <div className="fun-facts">
                <h3>Fun Facts</h3>
                <ul>
                  <li>🎮 I'm lowkey obsessed with gaming and always down to squad up with friends and take on the latest gaming trends.</li>
                  <li>🎵 Music is, like, my ultimate vibe - I'm all about discovering new artists and creating playlists that are straight fire.</li>
                  <li>☕ Coffee is my love language, and I'm not ashamed to admit that I'm a total caffeine fiend - it's the only way I can keep up with my crazy coding schedule.</li>
                  <li>🤖 AI is, like, the future and stuff, and I'm super stoked to be learning all about it and finding ways to use it to make a real impact.</li>
                </ul>
              </div>

              <a
                href="https://drive.google.com/file/d/1WIPQxRREwZDHSw62X1wJeg73rqGf2dU8/view"
                target="_blank"
                className="download-resume"
              >
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
                    href="https://getbootstrap.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaBootstrap /> Bootstrap
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
                    href="https://www.typescriptlang.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiTypescript /> TypeScript
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
                    href="https://spring.io/projects/spring-boot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiSpringboot /> Spring Boot
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
                    href="https://www.mysql.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiMysql /> MySQL
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
      <div className="wave-background">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="wave-parallax">
            <use
              href="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(99, 170, 255, 0.05)"
            />
            <use
              href="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(99, 170, 255, 0.03)"
            />
            <use
              href="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(99, 170, 255, 0.01)"
            />
            <use
              href="#gentle-wave"
              x="48"
              y="7"
              fill="rgba(99, 170, 255, 0.02)"
            />
          </g>
        </svg>
      </div>
    </section>
  );
};

export default HomePage;
