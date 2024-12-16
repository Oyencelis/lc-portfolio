import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaGithub } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import WaveBackground from '../components/WaveBackground';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    to_name: 'Lawrence Celis', // Static or dynamic based on your needs
  });


  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await emailjs.send(
        'service_rmfh97n', // Replace with your EmailJS Service ID
        'template_y9g3wli', // Replace with your EmailJS Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to_name: formData.to_name,
        },
        'VWPYxaWiIXEsHDZWY' // Replace with your EmailJS Public Key
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '', to_name: 'Lawrence Celis' }); // Clear form data on success
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Failed...', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(formData => ({
      ...formData,
      [e.target.name]: e.target.value
    }));
    // Clear error when user starts typing
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors(formData => ({
        ...formData,
        [e.target.name]: ''
      }));
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-section">
        <div className="contact-container">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">Let's create something amazing together</p>
          <div className="contact-info">
            <p>Currently a college student pursuing Information Technology. I'm always excited to discuss new opportunities and collaborations!</p>
            <p>Expected response time: Within 24-48 hours</p>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Your name"
                disabled={isSubmitting}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                placeholder="Your message here..."
                rows={5}
                disabled={isSubmitting}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              className={`submit-button ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              <span className="button-content">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </span>
            </button>

            {submitStatus === 'success' && (
              <div className="status-message success">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="status-message error">
                Oops! Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>

        <div className="social-contact-container">
          <h2 className="social-title">Connect With Me</h2>
          <p className="social-subtitle">Find me on social media or reach out directly</p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <MdEmail className="contact-icon" />
              <div className="contact-details">
                <h3>Email</h3>
                <a href="mailto:oyencelis@gmail.com">oyencelis@gmail.com</a>
              </div>
            </div>

            <div className="contact-method">
              <MdLocationOn className="contact-icon" />
              <div className="contact-details">
                <h3>Location</h3>
                <p>Laguna, Philippines</p>
              </div>
            </div>
          </div>

          <div className="social-links-container">
            <h3 className="social-links-title">Social Media</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/lawrence.celis.31" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebook />
                <span>Facebook</span>
              </a>
              <a href="https://www.instagram.com/10.oyen/" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <a href="https://www.threads.net/@10.oyen" target="_blank" rel="noopener noreferrer" className="social-link">
                <SiThreads />
                <span>Threads</span>
              </a>
              <a href="https://www.tiktok.com/@_risuuuuu" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTiktok />
                <span>TikTok</span>
              </a>
              <a href="https://github.com/Oyencelis" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <WaveBackground />
    </div>
  );
};

export default ContactPage;