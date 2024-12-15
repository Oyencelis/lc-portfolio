import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import elanceImage from "../assets/img/elance.png";
import elanceImage1 from "../assets/img/elance1.png";
import elanceImage2 from "../assets/img/elance2.png";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaJava,
  FaPython,
  FaBootstrap,
} from "react-icons/fa";
import {
  SiTypescript,
  SiFlask,
  SiMysql,
  SiSpringboot
} from "react-icons/si";

interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  image: string;
  techStack: string[];
  screenshots: string[];
}

const techStackUrls = {
  Bootstrap: "https://getbootstrap.com/",
  React: "https://react.dev/",
  HTML: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  CSS: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  TypeScript: "https://www.typescriptlang.org/",
  Flask: "https://flask.palletsprojects.com/",
  Python: "https://www.python.org/",
  SpringBoot: "https://spring.io/projects/spring-boot",
  Java: "https://www.java.com/",
  MySQL: "https://www.mysql.com/",
};

const techStackIcons = {
  Bootstrap: <FaBootstrap />,
  React: <FaReact />,
  HTML: <FaHtml5 />,
  CSS: <FaCss3Alt />,
  JavaScript: <FaJs />,
  TypeScript: <SiTypescript />,
  Flask: <SiFlask />,
  Python: <FaPython />,
  "Spring Boot": <SiSpringboot />,
  Java: <FaJava />,
  MySQL: <SiMysql />,
};

const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "E - Lance",
      description:
        "E-Lance is like the coolest smartphone bazaar ever 📱, where you can find all the latest gadgets and gizmos 🎉. It's designed to be super easy to use, with a sleek design in green and grey tones 🌿. You can secure your spot in the marketplace with a secure login 🔒 and manage your profile like a boss 💼. Sellers can list their devices 🚀 and keep track of their sales 📈, while buyers can browse through a wide variety of smartphones with special promotions and discounts 🎁. The app is all about real-time interaction 💬, making the checkout process a breeze 💨. Payments are secure 💸 and there are analytics for both buyers and sellers 📊. Whether you're a tech geek 🤖 or a business looking to expand 🚀, E-Lance has got you covered 🎉. (Academic Project - Not Deployed)",
      shortDescription:
        "E-Lance: Academic project - The ultimate smartphone marketplace with a sleek design.",
      category: "Academic Projects",
      image: elanceImage,
      techStack: ["Flask", "MySQL", "Python"],
      screenshots: [elanceImage, elanceImage1, elanceImage2],
    },

    {
      id: 2,
      title: "Scholarly",
      description: "Scholarly is an innovative platform designed to enhance academic collaboration and resource sharing. With a sleek and user-friendly interface, Scholarly allows students and educators to connect, share knowledge, and engage in discussions. It offers features like personalized profiles, resource management, and a seamless communication system. Whether you're looking to collaborate on projects, share research, or track academic progress, Scholarly provides the tools to foster a productive academic environment.",
      shortDescription:
        "Scholarly: Academic platform for collaboration and resource sharing.",
      category: "Academic Projects",
      image: elanceImage,
      techStack: ["Flask", "MySQL", "Python"],
      screenshots: [elanceImage, elanceImage1, elanceImage2],
    },
    // Add more projects here
  ]);

  const categories = ["All", "Academic Projects", "Web Development"];

  const filteredProjects =
    selectedCategory.toLowerCase() === "all"
      ? projects
      : projects.filter(
          (project) =>
            project.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  const openImagePreview = (imageSrc: string) => {
    setPreviewImage(imageSrc);
    document.body.style.overflow = "hidden";
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        closeImagePreview();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-pulse');
        }
      });
    });

    const targetElements = document.querySelectorAll('.project-card');
    targetElements.forEach((el) => observer.observe(el));

    return () => {
      targetElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="projects-section">
      <div className="projects-page">
        <header className="projects-header">
          <h1>My Projects 🚀</h1>
        <p>Where code meets creativity 💻</p>
        <div className="project-notice">
          <p>
            Heads up: These projects were part of my school work 📚 and aren't live yet. They're all about showing off my skills and how far I've come 🚀.
          </p>
        </div>
      </header>

      <div className="filter-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${
              selectedCategory.toLowerCase() === category.toLowerCase()
                ? "active"
                : ""
            }`}
            onClick={() => setSelectedCategory(category.toLowerCase())}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => openModal(project)}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <div className="project-details">
                  <h3>{project.title}</h3>
                  <p>{project.shortDescription}</p>
                  <div className="tech-stack">
                    {project.techStack.map((tech) => (
                      <a
                        key={tech}
                        href={techStackUrls[tech as keyof typeof techStackUrls]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tech-tag"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {techStackIcons[tech as keyof typeof techStackIcons]} {tech}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProject && (
        <div className="project-modal">
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>
              <FaTimes />
            </button>
            <h2>{selectedProject.title}</h2>
            <div className="modal-gallery">
              {selectedProject.screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot}
                  alt={`${selectedProject.title} screenshot ${index + 1}`}
                  onClick={() => openImagePreview(screenshot)}
                  className="gallery-image"
                />
              ))}
            </div>
            <p>{selectedProject.description}</p>
            <div className="tech-stack">
              {selectedProject.techStack.map((tech) => (
                <a
                  key={tech}
                  href={techStackUrls[tech as keyof typeof techStackUrls]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-tag"
                >
                  {techStackIcons[tech as keyof typeof techStackIcons]} {tech}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {previewImage && (
        <div className="image-preview-modal" onClick={closeImagePreview}>
          <div className="preview-overlay" />
          <button className="close-preview" onClick={closeImagePreview}>
            <FaTimes />
          </button>
          <div className="preview-content">
            <img src={previewImage} alt="Preview" />
          </div>
        </div>
        )}
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

export default ProjectsPage;
