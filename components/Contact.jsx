// components/Contact.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    interest: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-5 bg-dark text-white">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-4 fw-bold" data-aos="fade-up">
              Get Involved
            </h2>
            <p className="lead" data-aos="fade-up" data-aos-delay="200">
              Join our mission to transform children's lives
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="bg-secondary border-0 shadow-lg" data-aos="zoom-in">
              <Card.Body className="p-5">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>I'm interested in</Form.Label>
                    <Form.Select 
                      name="interest" 
                      value={formData.interest}
                      onChange={handleChange}
                    >
                      <option value="">Select an option</option>
                      <option value="donation">Making a Donation</option>
                      <option value="volunteer">Volunteering</option>
                      <option value="sponsor">Child Sponsorship</option>
                      <option value="partner">Partnership</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how you'd like to help..."
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button variant="warning" size="lg" type="submit" className="px-5">
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Contact Info */}
        <Row className="mt-5 text-center">
          <Col md={4} data-aos="fade-up" data-aos-delay="200">
            <div className="contact-info">
              <i className="fas fa-map-marker-alt fa-2x text-warning mb-3"></i>
              <h5>Visit Us</h5>
              <p>123 Hope Street<br />Greater Accra, Tema</p>
            </div>
          </Col>
          <Col md={4} data-aos="fade-up" data-aos-delay="400">
            <div className="contact-info">
              <i className="fas fa-phone fa-2x text-warning mb-3"></i>
              <h5>Call Us</h5>
              <p>+(233) 20-181-4258<br />Mon-Fri, 9AM-5PM</p>
            </div>
          </Col>
          <Col md={4} data-aos="fade-up" data-aos-delay="600">
            <div className="contact-info">
              <i className="fas fa-envelope fa-2x text-warning mb-3"></i>
              <h5>Email Us</h5>
              <p>info@hopehaven.org<br />support@hopehaven.org</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;