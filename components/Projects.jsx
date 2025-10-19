// components/Projects.js
import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, threshold: 0.1 });

  const projects = [
    {
      title: "Sankofa Learning Gardens",
      description: "Cultivating young minds through ancestral agricultural wisdom and modern STEM education",
      impact: "2,400+ children blossoming annually",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      status: "Flourishing",
      location: "Ghana & Kenya",
      icon: "🌱",
      gradient: "from-emerald-400 to-green-600",
      color: "#10b981"
    },
    {
      title: "Sacred Waters Initiative",
      description: "Healing communities through traditional medicine and modern pediatric care",
      impact: "18,000+ young souls nourished",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80",
      status: "Flowing",
      location: "Amazon Basin & Congo",
      icon: "💧",
      gradient: "from-blue-400 to-cyan-600",
      color: "#06b6d4"
    },
    {
      title: "Phoenix Rising Program",
      description: "Ancient crafts meet modern innovation in youth vocational training",
      impact: "750+ youth taking flight",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
      status: "Soaring",
      location: "Peru & Indonesia",
      icon: "🔥",
      gradient: "from-orange-400 to-red-600",
      color: "#f97316"
    },
    {
      title: "Moonbeam Scholarships",
      description: "Targeted scholarships for bright students from rural regions",
      impact: "1,200+ scholarships awarded",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
      status: "Open",
      location: "West Africa",
      icon: "🌕",
      gradient: "from-purple-400 to-indigo-600",
      color: "#8b5cf6"
    },
    {
      title: "River Guardians",
      description: "Clean water, sanitation and environmental stewardship with youth-led teams",
      impact: "Communities restored & protected",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      status: "Active",
      location: "South America & SE Asia",
      icon: "🛶",
      gradient: "from-teal-400 to-blue-600",
      color: "#14b8a6"
    },
    {
      title: "Starlight Workshops",
      description: "Creative arts and tech workshops to inspire self-expression and careers",
      impact: "Thousands of workshops held",
      image: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=800&q=80",
      status: "Ongoing",
      location: "Global",
      icon: "✨",
      gradient: "from-yellow-400 to-amber-600",
      color: "#f59e0b"
    }
  ];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 1.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.85,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 1.2
      }
    },
    hover: prefersReducedMotion ? {} : {
      y: -15,
      scale: 1.03,
      rotateX: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const imageVariants = {
    hover: prefersReducedMotion ? {} : {
      scale: 1.15,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: prefersReducedMotion ? {} : {
      scale: 1.3,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: "75%",
      transition: {
        duration: 2.5,
        ease: "easeOut",
        delay: 1.8
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Staggered animation for projects
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setVisibleProjects(projects.map((_, index) => index));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Floating Particles Component
  const FloatingParticles = () => {
    const particles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2
    }));

    return (
      <div className="position-absolute w-100 h-100" style={{ pointerEvents: 'none', zIndex: 0 }}>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="position-absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'radial-gradient(circle, rgba(139, 69, 19, 0.3) 0%, transparent 70%)',
              borderRadius: '50%'
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section 
      id="projects" 
      className="py-5 bg-white" 
      style={{ position: 'relative', overflow: 'hidden' }}
      ref={sectionRef}
    >
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23f8f9fa' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        opacity: 0.6
      }}></div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Floating decorative elements */}
      <motion.div
        className="position-absolute"
        style={{
          top: '10%',
          left: '5%',
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, rgba(139, 69, 19, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}
        variants={floatingVariants}
        animate="float"
      />
      <motion.div
        className="position-absolute"
        style={{
          bottom: '15%',
          right: '7%',
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, rgba(101, 163, 13, 0.08) 0%, transparent 70%)',
          borderRadius: '50%'
        }}
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 1 }}
      />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <Row className="text-center mb-5">
            <Col>
              <motion.h2 
                className="display-5 fw-bold text-dark mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: '0.6px'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
              >
                Sacred Initiatives
              </motion.h2>
              <motion.p 
                className="lead text-muted mb-4"
                style={{
                  fontSize: '1.05rem',
                  fontStyle: 'italic',
                  fontFamily: "'Playfair Display', serif",
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
              >
                Weaving ancient wisdom with modern hope across continents
              </motion.p>
            </Col>
          </Row>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Row className="g-4">
            {projects.map((project, index) => (
              <Col xl={4} lg={6} md={6} sm={12} key={index}>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  onHoverStart={() => setActiveProject(index)}
                  onHoverEnd={() => setActiveProject(null)}
                  className="h-100"
                >
                  <Card
                    className={`h-100 project-card elegant-card ${activeProject === index ? 'active' : ''}`}
                    style={{
                      background: 'white',
                      border: `1px solid ${activeProject === index ? project.color : '#e9ecef'}`,
                      borderRadius: '20px',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.2, 0.9, 0.2, 1)',
                      boxShadow: activeProject === index ?
                        `0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px ${project.color}20, 0 0 30px ${project.color}15` :
                        '0 8px 30px rgba(0,0,0,0.08)',
                      cursor: 'pointer',
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  >
                    {/* Enhanced gradient overlay */}
                    <motion.div 
                      className="position-absolute w-100 h-100"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}20, ${project.color}05, transparent)`,
                        opacity: activeProject === index ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                        zIndex: 1,
                        pointerEvents: 'none'
                      }}
                      animate={{
                        background: activeProject === index ? 
                          `linear-gradient(135deg, ${project.color}25, ${project.color}10, transparent)` :
                          `linear-gradient(135deg, ${project.color}15, transparent 50%)`
                      }}
                    />

                    {/* Ripple effect on hover */}
                    {activeProject === index && (
                      <motion.div
                        className="position-absolute"
                        style={{
                          top: '50%',
                          left: '50%',
                          width: '100%',
                          height: '100%',
                          background: `radial-gradient(circle at center, ${project.color}08 0%, transparent 70%)`,
                          borderRadius: '20px',
                          zIndex: 0
                        }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}

                    <div className="project-image-container position-relative overflow-hidden" style={{ zIndex: 0 }}>
                      <motion.div
                        variants={imageVariants}
                        style={{ height: '180px', overflow: 'hidden' }}
                      >
                        <Card.Img
                          variant="top"
                          src={project.image}
                          style={{
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.6s ease'
                          }}
                        />
                      </motion.div>
                      
                      {/* Status Badge */}
                      <motion.div 
                        className="position-absolute top-0 start-0 m-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <Badge
                          style={{
                            background: `linear-gradient(45deg, ${project.color}, ${project.color}dd)`,
                            border: 'none',
                            fontSize: '0.75rem',
                            padding: '8px 12px',
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: '600',
                            borderRadius: '12px'
                          }}
                        >
                          {project.status}
                        </Badge>
                      </motion.div>

                      {/* Project Icon */}
                      <motion.div 
                        className="position-absolute bottom-0 start-0 m-3"
                        variants={iconVariants}
                        whileHover="hover"
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-white fw-bold" style={{
                          fontSize: '2rem',
                          textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}>
                          {project.icon}
                        </span>
                      </motion.div>
                    </div>

                    <Card.Body className="d-flex flex-column text-dark p-4" style={{ zIndex: 2, position: 'relative' }}>
                      {/* Location */}
                      <motion.div 
                        className="mb-3"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        <small style={{
                          letterSpacing: '1px',
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: '600',
                          color: project.color
                        }}>
                          🌍 {project.location}
                        </small>
                      </motion.div>

                      {/* Title */}
                      <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 + 0.7 }}
                      >
                        <Card.Title className="fw-bold mb-3" style={{
                          fontSize: '1.2rem',
                          fontFamily: "'Playfair Display', serif",
                          color: '#1f2937',
                          lineHeight: '1.4'
                        }}>
                          {project.title}
                        </Card.Title>
                      </motion.div>

                      {/* Description */}
                      <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 + 0.8 }}
                      >
                        <Card.Text className="flex-grow-1 text-muted mb-4" style={{
                          lineHeight: '1.6',
                          fontStyle: 'italic',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.95rem'
                        }}>
                          {project.description}
                        </Card.Text>
                      </motion.div>

                      {/* Impact Badge */}
                      <motion.div 
                        className="impact-badge mb-4 p-3 rounded"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 + 0.9 }}
                        style={{
                          background: `linear-gradient(135deg, ${project.color}08, ${project.color}05)`,
                          borderLeft: `4px solid ${project.color}`,
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <small className="fw-bold" style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.9rem',
                          color: '#374151'
                        }}>
                          ✨ Sacred Impact: {project.impact}
                        </small>
                      </motion.div>

                      {/* Enhanced CTA Button with Sparkle Effect */}
                      <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 + 1 }}
                        className="mt-auto position-relative"
                      >
                        <Button 
                          href='#contact'
                          variant="outline-dark"
                          className="w-100 elegant-btn position-relative overflow-hidden"
                          style={{
                            border: `2px solid ${project.color}`,
                            borderRadius: '50px',
                            padding: '12px 24px',
                            fontWeight: '600',
                            letterSpacing: '0.5px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            background: 'transparent',
                            color: project.color,
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.95rem'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = project.color;
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = `0 12px 30px ${project.color}50`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = project.color;
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          {/* Sparkle particles on hover */}
                          <AnimatePresence>
                            {activeProject === index && (
                              <>
                                {[0, 1, 2].map((i) => (
                                  <motion.span
                                    key={i}
                                    className="position-absolute"
                                    style={{
                                      width: '4px',
                                      height: '4px',
                                      background: 'white',
                                      borderRadius: '50%',
                                      pointerEvents: 'none'
                                    }}
                                    initial={{ 
                                      opacity: 0,
                                      scale: 0,
                                      x: '50%',
                                      y: '50%'
                                    }}
                                    animate={{
                                      opacity: [0, 1, 0],
                                      scale: [0, 1, 0],
                                      x: `calc(50% + ${(Math.random() - 0.5) * 100}px)`,
                                      y: `calc(50% + ${(Math.random() - 0.5) * 60}px)`
                                    }}
                                    transition={{
                                      duration: 0.8,
                                      delay: i * 0.2,
                                      repeat: Infinity,
                                      repeatDelay: 2
                                    }}
                                  />
                                ))}
                              </>
                            )}
                          </AnimatePresence>
                          
                          <span className="position-relative z-1 d-flex align-items-center justify-content-center">
                            Join the Journey 
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              style={{ marginLeft: '8px' }}
                            >
                              →
                            </motion.span>
                          </span>
                        </Button>
                      </motion.div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Enhanced Progress Bar Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-5"
        >
          <Row>
            <Col>
              <motion.div 
                className="fundraising-progress p-4 rounded"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4 }}
                style={{
                  background: 'linear-gradient(135deg, #f8f9fa, #ffffff)',
                  border: '1px solid #e9ecef',
                  boxShadow: '0 20px 40px rgba(139, 69, 19, 0.1)',
                  borderRadius: '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Animated background shine */}
                <motion.div
                  className="position-absolute w-100 h-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(139, 69, 19, 0.05), transparent)',
                    top: 0,
                    left: '-100%'
                  }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                
                <motion.h5 
                  className="fw-bold mb-3 text-dark text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.3rem'
                  }}
                >
                  🌟 Sacred Impact Progress 🌟
                </motion.h5>
                
                <div className="progress mb-3" style={{
                  height: '32px',
                  background: 'linear-gradient(135deg, #f1f5f9, #f8fafc)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)',
                  border: '1px solid #e2e8f0'
                }}>
                  <motion.div
                    className="progress-bar-striped"
                    role="progressbar"
                    variants={progressVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{
                      background: `linear-gradient(45deg, ${projects[0].color}, ${projects[2].color}, ${projects[4].color})`,
                      backgroundSize: '200% 200%',
                      borderRadius: '16px',
                      fontSize: '0.95rem',
                      fontWeight: '700',
                      fontFamily: 'Inter, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Progress bar shimmer */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                        transform: 'skewX(-20deg)'
                      }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <span className="text-white position-relative z-1">✨ 75% ✨</span>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="d-flex justify-content-between text-dark mt-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: '600',
                    fontSize: '0.95rem'
                  }}
                >
                  <motion.span
                    whileHover={{ scale: 1.05, color: projects[0].color }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    🌱 Sacred Funds Raised: $7.5M
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.05, color: projects[2].color }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    🎯 Cosmic Goal: $10M
                  </motion.span>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>

      <style jsx>{`
        .project-card {
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(45deg, #8B4513, #CD853F, #D2691E, #8B4513);
          background-size: 200% 200%;
          z-index: 3;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s ease;
          animation: shimmer 3s ease infinite;
        }

        .project-card:hover::before {
          transform: scaleX(1);
        }

        .elegant-card:hover { 
          border-color: #8B4513 !important;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .project-image-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: linear-gradient(transparent, rgba(0,0,0,0.1));
          pointer-events: none;
          z-index: 1;
        }

        /* Enhanced glow effect */
        .project-card.active {
          animation: gentleGlow 2s ease-in-out infinite alternate;
        }

        @keyframes gentleGlow {
          from { box-shadow: 0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px currentColor20, 0 0 30px currentColor15; }
          to { box-shadow: 0 30px 60px rgba(0,0,0,0.2), 0 0 0 1px currentColor30, 0 0 40px currentColor25; }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .project-card::before {
            transition: none;
            animation: none;
          }
          
          .project-card.active {
            animation: none;
          }
          
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;