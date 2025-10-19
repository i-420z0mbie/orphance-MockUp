import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaGraduationCap, 
  FaHeartbeat, 
  FaChevronLeft, 
  FaChevronRight,
  FaChild,
  FaUsers,
  FaGlobeAmericas
} from 'react-icons/fa';

const About = () => {
  const prefersReducedMotion = useReducedMotion();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Consistent data with Hero component
  const statsData = [
    { number: "5,000+", label: "Children Helped", icon: <FaChild /> },
    { number: "127", label: "Projects", icon: <FaUsers /> },
    { number: "42", label: "Countries", icon: <FaGlobeAmericas /> }
  ];

  const carouselImages = [
    {
      src: "playing.jpg",
      alt: "Children playing in the Hope Haven courtyard",
      caption: "Safe spaces for children to grow and play"
    },
    {
      src: "boy-writing-4379406_1920.jpg", 
      alt: "Students learning in our education program",
      caption: "Quality education for every child"
    },
    {
      src: "ai-generated-8703863_1920.jpg",
      alt: "Medical check-ups at our health center",
      caption: "Comprehensive healthcare services"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = prefersReducedMotion ? 
    { hidden: { opacity: 0 }, visible: { opacity: 1 } } :
    {
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          type: "spring", 
          stiffness: 100,
          damping: 15
        }
      }
    };

  const imageVariants = prefersReducedMotion ?
    { hidden: { opacity: 0 }, visible: { opacity: 1 } } :
    {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.8,
          ease: "easeOut"
        }
      }
    };

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, carouselImages.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <Container>
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <Row className="align-items-center gy-5">
            {/* Text Content Column */}
            <Col xs={12} lg={6}>
              <motion.div variants={itemVariants}>
                <div className="section-header">
                  <motion.span 
                    className="section-label"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.3 }}
                  >
                    Our Mission
                  </motion.span>
                  <h1 id="about-heading" className="about-title">
                    Building Brighter 
                    <span className="gradient-text"> Futures</span>
                  </h1>
                </div>

                <motion.p className="about-lead" variants={itemVariants}>
                  For over <strong className="highlight">20 years</strong>, Hope Haven has been a beacon of 
                  hope for children in need. What started as a small shelter has grown into a global 
                  family — a place where children are nurtured, educated, and empowered.
                </motion.p>

                <motion.p className="about-text" variants={itemVariants}>
                  We believe every child deserves safety, quality education, and the freedom to dream. 
                  Our holistic programs combine safe homes, schooling, healthcare, and mentorship 
                  so children can flourish — mind, body, and spirit.
                </motion.p>

                {/* Features Grid */}
                <motion.div className="features-grid" variants={containerVariants}>
                  <Row className="g-3">
                    {[
                      {
                        icon: <FaHome />,
                        title: "Safe Homes",
                        description: "Warm, stable homes with trained caregivers and loving environments",
                        color: "#6A11CB"
                      },
                      {
                        icon: <FaGraduationCap />,
                        title: "Education",
                        description: "Holistic learning & life skills for lifelong success and independence",
                        color: "#2575FC"
                      },
                      {
                        icon: <FaHeartbeat />,
                        title: "Healthcare",
                        description: "Routine and specialist care to keep children healthy and thriving",
                        color: "#FF416C"
                      }
                    ].map((feature, index) => (
                      <Col xs={12} md={4} key={feature.title}>
                        <motion.div
                          className="feature-card"
                          variants={itemVariants}
                          whileHover={prefersReducedMotion ? {} : { 
                            y: -8,
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 300 }
                          }}
                        >
                          <div 
                            className="feature-icon-wrapper"
                            style={{ '--icon-color': feature.color }}
                          >
                            <div className="feature-icon">{feature.icon}</div>
                          </div>
                          <h5 className="feature-title">{feature.title}</h5>
                          <p className="feature-desc">{feature.description}</p>
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                </motion.div>

                {/* Call to Action Buttons */}
                <motion.div 
                  className="cta-buttons mt-4"
                  variants={itemVariants}
                >
                  <div className="d-flex flex-column flex-sm-row gap-3">
                  </div>
                </motion.div>
              </motion.div>
            </Col>

            {/* Image Carousel Column */}
            <Col xs={12} lg={6}>
              <motion.div 
                className="carousel-section"
                variants={imageVariants}
              >
                <div className="carousel-container">
                  <motion.div 
                    className="image-wrapper"
                    animate={prefersReducedMotion ? {} : {
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={carouselImages[currentImageIndex].src}
                        alt={carouselImages[currentImageIndex].alt}
                        className="carousel-image"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        loading="lazy"
                      />
                    </AnimatePresence>
                    
                    <motion.div 
                      className="image-caption"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {carouselImages[currentImageIndex].caption}
                    </motion.div>
                  </motion.div>

                  <div className="carousel-controls">
                    <button 
                      className="carousel-btn prev"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <FaChevronLeft />
                    </button>
                    
                    <div className="carousel-indicators">
                      {carouselImages.map((_, index) => (
                        <button
                          key={index}
                          className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                    
                    <button 
                      className="carousel-btn next"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>

      {/* Background Elements */}
      <div className="background-elements" aria-hidden="true">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-orbit-1"></div>
        <div className="bg-orbit-2"></div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 6rem 0;
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .section-header {
          margin-bottom: 2.5rem;
        }

        .section-label {
          display: inline-block;
          background: linear-gradient(90deg, #6A11CB, #2575FC);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
        }

        .about-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 0;
          color: #2d3748;
        }

        .gradient-text {
          background: linear-gradient(135deg, #6A11CB 0%, #2575FC 50%, #FFD24D 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: block;
        }

        .about-lead {
          font-size: clamp(1.1rem, 2.5vw, 1.3rem);
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .about-text {
          font-size: 1.05rem;
          color: #718096;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }

        .highlight {
          background: linear-gradient(120deg, transparent 0%, transparent 50%, rgba(255, 210, 77, 0.3) 50%, transparent 100%);
          background-size: 220% 100%;
          background-position: 100% 0;
          transition: all 0.5s ease;
          padding: 0.1rem 0.2rem;
          border-radius: 2px;
        }

        /* Feature Cards */
        .features-grid {
          margin: 2.5rem 0;
        }

        .feature-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 2rem 1.5rem;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          height: 100%;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e0;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(106, 17, 203, 0.05), transparent);
          transition: left 0.6s ease;
        }

        .feature-card:hover::before {
          left: 100%;
        }

        .feature-icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          background: linear-gradient(135deg, var(--icon-color), transparent 70%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .feature-icon-wrapper::after {
          content: '';
          position: absolute;
          inset: 2px;
          background: #ffffff;
          border-radius: 18px;
        }

        .feature-icon {
          font-size: 1.8rem;
          color: var(--icon-color);
          position: relative;
          z-index: 1;
        }

        .feature-title {
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #2d3748;
        }

        .feature-desc {
          font-size: 0.9rem;
          color: #718096;
          line-height: 1.5;
          margin: 0;
        }

        /* Button Styles */
        .btn-glow {
          background: linear-gradient(135deg, #6A11CB, #2575FC);
          border: none;
          border-radius: 12px;
          font-weight: 600;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(106, 17, 203, 0.3);
          transition: all 0.3s ease;
        }

        .btn-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(106, 17, 203, 0.4);
        }

        .btn-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .btn-glow:hover::before {
          left: 100%;
        }

        .btn-programs {
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-weight: 600;
          background: transparent;
          color: #4a5568;
          transition: all 0.3s ease;
        }

        .btn-programs:hover {
          border-color: #6A11CB;
          background: rgba(106, 17, 203, 0.05);
          color: #6A11CB;
        }

        .btn-content {
          position: relative;
          z-index: 1;
        }

        /* Carousel Styles */
        .carousel-container {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(0, 0, 0, 0.05);
        }

        .image-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 4/3;
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 24px;
        }

        .image-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
          padding: 2rem 1.5rem 1.5rem;
          font-weight: 500;
          text-align: center;
        }

        .carousel-controls {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
          z-index: 10;
        }

        .carousel-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.1);
          color: #4a5568;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .carousel-btn:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.1);
          color: #2d3748;
        }

        .carousel-indicators {
          display: flex;
          gap: 8px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 8px 12px;
          border-radius: 20px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.2);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #6A11CB;
          transform: scale(1.2);
        }

        /* Background Elements */
        .background-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-gradient-1 {
          position: absolute;
          top: 10%;
          right: 10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(106, 17, 203, 0.03) 0%, transparent 70%);
          border-radius: 50%;
        }

        .bg-gradient-2 {
          position: absolute;
          bottom: 10%;
          left: 5%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(37, 117, 252, 0.02) 0%, transparent 70%);
          border-radius: 50%;
        }

        .bg-orbit-1, .bg-orbit-2 {
          position: absolute;
          border: 1px solid rgba(0, 0, 0, 0.02);
          border-radius: 50%;
        }

        .bg-orbit-1 {
          top: 20%;
          right: 15%;
          width: 200px;
          height: 200px;
          animation: rotate 20s linear infinite;
        }

        .bg-orbit-2 {
          bottom: 15%;
          left: 10%;
          width: 150px;
          height: 150px;
          animation: rotate 15s linear infinite reverse;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .about-section {
            padding: 4rem 0;
          }

          .carousel-controls {
            padding: 0 0.5rem;
          }

          .carousel-btn {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 768px) {
          .feature-card {
            padding: 1.5rem 1rem;
          }

          .feature-icon-wrapper {
            width: 60px;
            height: 60px;
          }

          .feature-icon {
            font-size: 1.5rem;
          }

          .image-wrapper {
            aspect-ratio: 3/2;
          }
        }

        @media (max-width: 576px) {
          .about-section {
            padding: 3rem 0;
          }

          .carousel-controls {
            position: static;
            transform: none;
            margin-top: 1rem;
            justify-content: center;
            gap: 1rem;
          }

          .carousel-indicators {
            order: -1;
          }

          .cta-buttons .d-flex {
            flex-direction: column;
          }
        }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .feature-card::before,
          .btn-glow::before,
          .bg-orbit-1,
          .bg-orbit-2 {
            display: none;
          }

          .carousel-image {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
};

export default About;