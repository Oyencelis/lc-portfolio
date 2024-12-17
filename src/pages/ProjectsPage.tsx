import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import elanceImage from "../assets/img/elance.png";
import elanceImage1 from "../assets/img/elance1.png";
import elanceImage2 from "../assets/img/elance2.png";
import scholarlyImage from "../assets/img/scholarly.png";
import scholarlyImage1 from "../assets/img/scholarly1.png";
import scholarlyImage2 from "../assets/img/scholarly2.png";
import holImage from "../assets/img/hol.png";
import holsImage from "../assets/img/hols.png";
import holsImage1 from "../assets/img/hols1.png";
import holsImage2 from "../assets/img/hols2.png";
import fnihsImage from "../assets/img/fnihs.png";
import fnihsImage1 from "../assets/img/fnihs1.png";
import fnihsImage2 from "../assets/img/fnihs2.png";
import fnihsImage3 from "../assets/img/fnihs3.png";
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
import { motion } from "framer-motion";
import WaveBackground from "../components/WaveBackground";

interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  image: string;
  techStack: string[];
  screenshots: string[];
  liveLink: string;
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
  Springboot: <SiSpringboot />,
  Java: <FaJava />,
  MySQL: <SiMysql />,
};

const ProjectTags: React.FC<{ categories: string[] }> = ({ categories }) => (
  <div className="project-tags">
    {categories.map((category) => (
      <span
        key={category}
        className="project-tag"
        style={{
          animationDelay: `${Math.random() * 0.5}s`,
        }}
      >
        {category}
      </span>
    ))}
  </div>
);

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
        "E-Lance is a revolutionary smartphone marketplace that connects buyers and sellers in real-time. With a sleek design and secure login, it offers a seamless experience for managing profiles and transactions. Explore the latest gadgets with exclusive promotions and analytics for both buyers and sellers. (Academic Project - Not Deployed)",
      shortDescription:
        "E-Lance: Your go-to platform for buying and selling smartphones with real-time interaction.",
      category: "Not Deployed",
      image: elanceImage,
      techStack: ["HTML", "CSS", "JavaScript", "Flask", "MySQL", "Python"],
      screenshots: [elanceImage, elanceImage1, elanceImage2],
      liveLink: "",
    },

    {
      id: 2,
      title: "Scholarly",
      description:
        "Scholarly is an innovative platform designed to enhance academic collaboration. It connects students and educators, allowing for resource sharing and seamless communication. With customizable profiles and organized resources, it fosters a productive academic environment. (Academic Project - Not Deployed)",
      shortDescription:
        "Scholarly: A platform for students and educators to collaborate and share resources.",
      category: "Not Deployed",
      image: scholarlyImage,
      techStack: ["HTML", "CSS", "JavaScript", "SpringBoot", "MySQL", "Java"],
      screenshots: [scholarlyImage, scholarlyImage1, scholarlyImage2],
      liveLink: "",
    },

    {
      id: 3,
      title: "Hol's Kitchen",
      description:
        "Hols Kitchen is a restaurant management system 🍴 designed to optimize operations for small restaurant businesses 🚀. Developed using Java 💻 and powered by a MySQL database 🚀, it provides an efficient platform for managing orders 🛍️, inventory 🛍️, staff schedules 🕒, and menu updates 🍴. With features like order tracking 🚚 and sales reporting 📈, the system helps streamline workflows 💪 and improve customer service 🤝, making it an ideal solution for modernizing small restaurant operations 🚀. (Academic Project - Not Deployed)",
      shortDescription:
        "Hols Kitchen: Restaurant management system developed with Java and MySQL.",
      category: "Not Deployed",
      image: holImage,
      techStack: ["MySQL", "Java"],
      screenshots: [holImage, holsImage, holsImage1, holsImage2],
      liveLink: "",
    },

    {
      id: 4,
      title: "Famy National Integrated High School",
      description:
        "🎉 Famy National Integrated High School (FNIHS) is a public school in Famy, Laguna, Philippines, offering a holistic approach to education 🌱. With a focus on academic excellence 📚, social responsibility 🤝, and cultural preservation 🎨, the school provides various tracks like STEM 🧬, ABM 📈, and HUMSS 📚. It also promotes student growth through strong sports 🏀 and cultural programs 🎭. The school's website, created by a programming major 💻, offers seamless navigation 🚀, visually appealing design 🎨, and comprehensive information for both prospective students 🎓 and the school community 🌟. This is the first web project created 🚀!",
      shortDescription:
        "Famy National Integrated High School: Website for academic programs, student resources, and community activities.",
      category: "Deployed",
      image: fnihsImage,
      techStack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      screenshots: [fnihsImage, fnihsImage1, fnihsImage2, fnihsImage3],
      liveLink:
        "https://minmin2225.github.io/FamyNIHighschool.github.io/index.html",
    },
  ]);

  const categories = ["All", "Not Deployed", "Deployed"];

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
          entry.target.classList.add("animate-pulse");
        }
      });
    });

    const targetElements = document.querySelectorAll(".project-card");
    targetElements.forEach((el) => observer.observe(el));

    return () => {
      targetElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="projects-section">
      <div className="projects-page">
        <header className="projects-header">
          <h1>My Projects</h1>
          <p>Where code meets creativity 💻</p>
          <div className="project-notice">
            <p>
              Heads up! 🚨 These projects are part of my student project portfolio 
              📚, showcasing my skills and progress as a dev 💻. Some are already deployed and rocking 
              🚀!
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
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              onClick={() => openModal(project)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-details">
                    <h3>{project.title}</h3>
                    <p>{project.shortDescription}</p>
                    <ProjectTags categories={[project.category]} />
                    <div className="tech-stack">
                      {project.techStack.map((tech) => (
                        <a
                          key={tech}
                          href={
                            techStackUrls[tech as keyof typeof techStackUrls]
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tech-tag"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {techStackIcons[tech as keyof typeof techStackIcons]}{" "}
                          {tech}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
              {selectedProject.liveLink && (
                <div className="live-link-container">
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="live-link-button"
                  >
                    View Live Site 🚀
                  </a>
                </div>
              )}
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
      <WaveBackground />
    </section>
  );
};

export default ProjectsPage;
