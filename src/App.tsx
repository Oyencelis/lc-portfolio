import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import TestimonialPage from "./pages/TestimonialPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import ResourcePage from "./pages/ResourcePage";
import NotFound from "./pages/NotFound";
import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AnimatedBackground from "./components/AnimatedBackground.tsx";
import BackToTopButton from "./components/BackToTopButton.tsx";
const App: React.FC = () => {
  return (
    <Router>
      <AnimatedBackground />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/testimonial" element={<TestimonialPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resource" element={<ResourcePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <BackToTopButton />
    </Router>
  );
};

export default App;
