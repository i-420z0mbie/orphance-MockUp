import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { motion, useReducedMotion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // keep year current in case site stays up across years
    const y = new Date().getFullYear();
    setYear(y);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    // simulate network call (replace with real API call)
    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkVariants = prefersReducedMotion
    ? { visible: { opacity: 1 } }
    : { hover: { y: -3, transition: { type: 'spring', stiffness: 300 } } };

  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <Container>
        <Row className="gy-4">
          <Col xs={12} md={4}>
            <div className="brand">
              <div className="logo">Hope<span>Haven</span></div>
              <p className="tag">Restoring childhoods with care, education and community.</p>

              <div className="social" aria-label="Social media links">
                <motion.a href="#" aria-label="Facebook" whileHover="hover" variants={linkVariants} className="social-link">
                  <FaFacebookF />
                </motion.a>
                <motion.a href="#" aria-label="Twitter" whileHover="hover" variants={linkVariants} className="social-link">
                  <FaTwitter />
                </motion.a>
                <motion.a href="#" aria-label="Instagram" whileHover="hover" variants={linkVariants} className="social-link">
                  <FaInstagram />
                </motion.a>
                <motion.a href="#" aria-label="LinkedIn" whileHover="hover" variants={linkVariants} className="social-link">
                  <FaLinkedinIn />
                </motion.a>
              </div>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <h6 className="section-title">Quick Links</h6>
            <nav aria-label="Footer quick links">
              <ul className="links-list">
                <li><a href="#about">About Us</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Volunteer</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
          </Col>

          <Col xs={12} md={4}>
            <h6 className="section-title">Stay in touch</h6>
            <p className="small muted">Sign up for updates, stories, and urgent needs.</p>

            <Form onSubmit={handleSubscribe} className="subscribe-form" aria-label="Newsletter signup">
              <InputGroup className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  required
                />
                <Button type="submit" variant="warning" disabled={status === 'sending'} aria-label="Subscribe">
                  {status === 'sending' ? 'Sending…' : 'Join'}
                </Button>
              </InputGroup>
            </Form>

            {status === 'success' && <div className="subscribe-msg success">Thanks — you’re subscribed!</div>}
            {status === 'error' && <div className="subscribe-msg error">Please enter a valid email.</div>}

            <div className="contact mt-3">
              <div className="muted small">Contact</div>
              <a href="mailto:info@hopehaven.org" className="contact-link">info@hopehaven.org</a>
              <div className="muted small mt-1">Phone: +233 530 487 116</div>
            </div>
          </Col>
        </Row>

        <Row className="mt-4 align-items-center">
          <Col xs={12} md={6}>
            <small className="muted">© {year} Hope Haven. All rights reserved.</small>
          </Col>
          <Col xs={12} md={6} className="text-md-end">
            <Button variant="link" className="back-top" onClick={scrollToTop} aria-label="Back to top">
              <FaArrowUp />
            </Button>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        :root {
          --accent-1: #6A11CB;
          --accent-2: #2575FC;
          --bg: linear-gradient(180deg,#06061a,#081026);
          --muted: rgba(255,255,255,0.72);
        }

        .site-footer {
          background: var(--bg);
          color: #fff;
          padding: 2.25rem 0;
          border-top: 1px solid rgba(255,255,255,0.03);
        }

        .brand .logo {
          font-weight: 800; font-size: 1.35rem; letter-spacing: -0.6px;
        }
        .brand .logo span { background: linear-gradient(90deg,var(--accent-1),var(--accent-2)); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .brand .tag { color: var(--muted); margin-top: 0.5rem; max-width: 36ch; }

        .social { margin-top: 0.6rem; display:flex; gap: 0.5rem; }
        .social-link { width: 42px; height: 42px; display: inline-grid; place-items: center; border-radius: 10px; background: rgba(255,255,255,0.02); color: white; border: 1px solid rgba(255,255,255,0.03); text-decoration: none; }
        .social-link:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(106,17,203,0.08); }

        .section-title { margin-bottom: 0.5rem; font-weight: 700; }
        .links-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.45rem; }
        .links-list a { color: var(--muted); text-decoration: none; }
        .links-list a:hover { color: white; transform: translateX(4px); }

        .muted { color: var(--muted); }
        .small { font-size: 0.9rem; }

        .subscribe-form .form-control { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); color: #fff; }
        .subscribe-form .btn { font-weight: 700; }

        .subscribe-msg { margin-top: 0.5rem; font-size: 0.95rem; }
        .subscribe-msg.success { color: #8ee5a1; }
        .subscribe-msg.error { color: #ff9b9b; }

        .contact-link { display:block; color: white; text-decoration: none; margin-top: 0.25rem; }

        .back-top { color: var(--muted); border: 1px solid rgba(255,255,255,0.03); background: rgba(255,255,255,0.02); width: 44px; height: 44px; display: inline-grid; place-items: center; border-radius: 8px; }
        .back-top:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(37,117,252,0.08); }

        @media (max-width: 575px) {
          .brand .tag { max-width: 100%; }
          .back-top { margin-left: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .social-link, .back-top, .social-link:hover, .back-top:hover { transition: none !important; transform: none !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
