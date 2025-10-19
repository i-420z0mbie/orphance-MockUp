import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button, Navbar, Nav, Modal } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true });
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCloseMobileMenu = () => setShowMobileMenu(false);
  const handleShowMobileMenu = () => setShowMobileMenu(true);

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const menuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  useEffect(() => {
    // guard for SSR
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let running = true;

    // helpers
    const isTouchMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent || '');
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    const resizeCanvas = () => {
      // set canvas to section size rather than full viewport on small devices
      const width = window.innerWidth;
      const height = Math.max(window.innerHeight * 0.85, 500); // give some min height for hero aesthetics

      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      // scale so drawing units are CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    class Particle {
      constructor(w, h, mobile) {
        this.reset(w, h, mobile);
      }
      reset(w, h, mobile) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = (Math.random() * (mobile ? 2 : 3)) + (mobile ? 0.5 : 1);
        this.speedX = (Math.random() * (mobile ? 0.6 : 1)) - (mobile ? 0.3 : 0.5);
        this.speedY = (Math.random() * (mobile ? 0.6 : 1)) - (mobile ? 0.3 : 0.5);
        this.color = `hsl(${Math.random() * 60 + 30}, 70%, 60%)`;
        this.alpha = Math.random() * 0.4 + 0.2;
      }
      update(w, h) {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > w || this.x < 0) this.speedX *= -1;
        if (this.y > h || this.y < 0) this.speedY *= -1;
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      const area = width * height;
      // keep particle count conservative on mobile and on small viewports
      const base = clamp(Math.floor(area / 14000), 8, 80);
      const mobileFactor = isTouchMobile ? 0.55 : 1;
      const particleCount = Math.floor(base * mobileFactor);

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height, isTouchMobile));
      }
    };

    const draw = () => {
      if (!running) return;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        p.update(width, height);
        p.draw(ctx);
      }
      animationRef.current = requestAnimationFrame(draw);
    };

    // Debounced resize handler for performance
    const onResize = () => {
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 150);
    };

    // Pause when tab is not visible to save battery on mobile
    const handleVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animationRef.current);
      } else {
        running = true;
        draw();
      }
    };

    // Respect reduced motion preference: skip animation / keep very light
    if (prefersReducedMotion) {
      // single draw frame to render subtle background but no animation
      resizeCanvas();
      initParticles();
      particles.forEach(p => p.draw(ctx));
    } else {
      resizeCanvas();
      initParticles();
      draw();

      window.addEventListener('resize', onResize, { passive: true });
      document.addEventListener('visibilitychange', handleVisibilityChange, false);
    }

    // cleanup
    return () => {
      running = false;
      cancelAnimationFrame(animationRef.current);
      clearTimeout(resizeTimeoutRef.current);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isMounted, prefersReducedMotion]);

  // framer variants
  const containerVariants = prefersReducedMotion
    ? { visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.28, duration: 0.9 } }
      };

  const itemVariants = prefersReducedMotion
    ? { visible: { y: 0, opacity: 1 } }
    : { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } } };

  // Navigation items
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Impact', href: '#impact' },
    { name: 'Contact', href: '#contact' },
    { name: 'Donate', href: '#donate', variant: 'warning' }
  ];

  // make CTA buttons responsive (full-width on small screens)
  return (
    <>
      {/* Navigation Bar */}
      <Navbar 
        expand="lg" 
        className="fixed-top" 
        style={{ 
          zIndex: 9999,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(10px)',
          padding: '0.5rem 0'
        }}
      >
        <Container>
          <Navbar.Brand 
            href="#home" 
            className="fw-bold text-white"
            style={{ 
              background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Giving Them A Future
          </Navbar.Brand>
          
          {/* Desktop Navigation */}
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="align-items-center">
              {navItems.map((item, index) => (
                <Nav.Link 
                  key={item.name}
                  href={item.href}
                  className={`mx-2 fw-semibold ${item.variant ? 'btn btn-warning text-dark' : 'text-white'}`}
                  style={!item.variant ? { 
                    transition: 'all 0.3s ease',
                    borderBottom: '2px solid transparent'
                  } : {}}
                  onMouseEnter={(e) => {
                    if (!item.variant) {
                      e.target.style.borderBottomColor = '#ffd700';
                      e.target.style.color = '#ffd700';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.variant) {
                      e.target.style.borderBottomColor = 'transparent';
                      e.target.style.color = 'white';
                    }
                  }}
                >
                  {item.name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>

          {/* Mobile Menu Button */}
          <Button
            variant="outline-light"
            className="d-lg-none border-0"
            onClick={handleShowMobileMenu}
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Open navigation menu"
          >
            <div style={{ position: 'relative', width: '20px', height: '16px' }}>
              <span 
                style={{
                  position: 'absolute',
                  height: '2px',
                  width: '100%',
                  background: '#fff',
                  top: '0',
                  left: '0',
                  transition: 'all 0.3s ease'
                }}
              />
              <span 
                style={{
                  position: 'absolute',
                  height: '2px',
                  width: '100%',
                  background: '#fff',
                  top: '7px',
                  left: '0',
                  transition: 'all 0.3s ease'
                }}
              />
              <span 
                style={{
                  position: 'absolute',
                  height: '2px',
                  width: '100%',
                  background: '#fff',
                  top: '14px',
                  left: '0',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          </Button>
        </Container>
      </Navbar>

      {/* Mobile Navigation Modal */}
      <AnimatePresence>
        {showMobileMenu && (
          <Modal
            show={showMobileMenu}
            onHide={handleCloseMobileMenu}
            dialogAs={() => (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  position: 'fixed',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  zIndex: 99999,
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(106,17,203,0.9) 50%, rgba(37,117,252,0.9) 100%)',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2rem'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseMobileMenu}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    backdropFilter: 'blur(10px)'
                  }}
                  aria-label="Close menu"
                >
                  ×
                </button>

                {/* Navigation Items */}
                <div 
                  style={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1.5rem'
                  }}
                >
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={handleCloseMobileMenu}
                      className={`fw-bold text-decoration-none ${
                        item.variant 
                          ? 'btn btn-warning btn-lg text-dark' 
                          : 'text-white'
                      }`}
                      style={{
                        fontSize: '1.5rem',
                        padding: item.variant ? '0.75rem 2rem' : '0.5rem 1rem',
                        borderRadius: item.variant ? '50px' : '0',
                        background: item.variant ? '' : 'transparent',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        textAlign: 'center',
                        width: item.variant ? 'auto' : '100%',
                        maxWidth: '300px'
                      }}
                      onMouseEnter={(e) => {
                        if (!item.variant) {
                          e.target.style.color = '#ffd700';
                          e.target.style.transform = 'translateX(10px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!item.variant) {
                          e.target.style.color = 'white';
                          e.target.style.transform = 'translateX(0)';
                        }
                      }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    padding: '2rem 0 1rem'
                  }}
                >
                  <p>Together we can make a difference</p>
                  <small>© {new Date().getFullYear()} Giving Them A Future</small>
                </motion.div>
              </motion.div>
            )}
            centered
            className="border-0"
            contentClassName="border-0"
            style={{ 
              border: 'none',
              zIndex: 99999
            }}
            backdropStyle={{
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(5px)'
            }}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="home"
        className="hero-section d-flex align-items-center"
        style={{
          position: 'relative',
          minHeight: '100vh',
          color: '#fff',
          overflow: 'hidden',
          paddingTop: '76px', // Account for fixed navbar
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.35)), url('/children-2704878_1920.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        aria-label="Hero section - Giving Them A Future"
      >
        {/* lightweight animated canvas placed behind content */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        {/* subtle colored overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, rgba(106,17,203,0.25) 0%, rgba(37,117,252,0.18) 50%, rgba(255,193,7,0.2) 100%)',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />

        <Container style={{ position: 'relative', zIndex: 3 }}>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Row className="align-items-center">
              <Col xs={12} lg={8}>
                <motion.div ref={ref} variants={itemVariants} className="mb-4">
                  <motion.h1
                    className="hero-title fw-bold mb-3"
                    style={{
                      background: 'linear-gradient(45deg, #ffd700, #ffed4e, #ffffff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '0 4px 20px rgba(255, 215, 0, 0.2)'
                    }}
                  >
                    Giving Them A Future
                  </motion.h1>

                  <motion.p className="hero-subtitle mb-3" variants={itemVariants}>
                    Transforming lives, one child at a time. Join us in our mission to provide
                    love, care, and opportunities for orphaned children around the world.
                  </motion.p>

                  <Row className="g-2 mb-3">
                    <Col xs={12} md={4} className="text-center">
                      <div className="stat-card p-3 rounded w-100">
                        <h2 className="stat-number mb-1">{inView ? <CountUp end={5000} duration={3} /> : 0}+</h2>
                        <p className="stat-label mb-0">Children Helped</p>
                      </div>
                    </Col>

                    <Col xs={12} md={4} className="text-center">
                      <div className="stat-card p-3 rounded w-100">
                        <h2 className="stat-number mb-1">{inView ? <CountUp end={127} duration={3} /> : 0}+</h2>
                        <p className="stat-label mb-0">Projects Completed</p>
                      </div>
                    </Col>

                    <Col xs={12} md={4} className="text-center">
                      <div className="stat-card p-3 rounded w-100">
                        <h2 className="stat-number mb-1">{inView ? <CountUp end={42} duration={3} /> : 0}</h2>
                        <p className="stat-label mb-0">Countries Reached</p>
                      </div>
                    </Col>
                  </Row>

                  <div className="d-grid d-md-flex gap-2">
                    <Button
                      role="link"
                      href="#contact"
                      variant="warning"
                      size="lg"
                      className="btn-glow fw-bold"
                      style={{ minWidth: '180px' }}
                    >
                      💝 Donate Now
                    </Button>

                    <Button
                      role="link"
                      href="#contact"
                      variant="outline-light"
                      size="lg"
                      className="fw-bold mt-2 mt-md-0"
                      style={{ minWidth: '180px' }}
                    >
                      📚 Learn More
                    </Button>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Container>

        {/* scroll indicator (hidden for reduced motion) */}
        {!prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}
            aria-hidden="true"
          >
            <div className="scroll-indicator">
              <div className="scroll-dot" />
            </div>
          </motion.div>
        )}

        <style jsx>{`
          @media (prefers-reduced-motion: reduce) {
            .hero-title, .hero-subtitle, .stat-card { transition: none !important; }
          }

          .hero-title {
            font-size: clamp(1.8rem, 6vw, 3rem);
            line-height: 1.05;
          }

          .hero-subtitle {
            font-size: clamp(1rem, 3vw, 1.1rem);
            color: rgba(255,255,255,0.95);
            line-height: 1.6;
          }

          .btn-glow {
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            border: none;
            box-shadow: 0 4px 16px rgba(255,215,0,0.25);
            padding: 0.85rem 1rem;
            width: 100%;
          }

          @media(min-width: 768px) {
            .btn-glow { width: auto; }
          }

          .stat-card {
            background: rgba(255,255,255,0.06);
            backdrop-filter: blur(6px);
            border: 1px solid rgba(255,255,255,0.06);
            transition: transform 0.28s ease, box-shadow 0.28s ease;
          }

          .stat-number {
            font-size: clamp(1.6rem, 4.5vw, 2rem);
            color: #ffd700;
            font-weight: 700;
          }

          .stat-label {
            font-size: 0.95rem;
          }

          /* subtle scroll indicator styles */
          .scroll-indicator {
            width: 30px;
            height: 50px;
            border: 2px solid rgba(255,255,255,0.45);
            border-radius: 16px;
            display: flex;
            justify-content: center;
            padding-top: 8px;
          }

          .scroll-dot {
            width: 4px;
            height: 10px;
            background: rgba(255,255,255,0.85);
            border-radius: 2px;
            animation: scrollY 2s infinite ease-in-out;
          }

          @keyframes scrollY { 0% { transform: translateY(0);} 50% { transform: translateY(12px);} 100% { transform: translateY(0);} }
        `}</style>
      </section>
    </>
  );
};

export default Hero;