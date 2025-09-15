import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Particle from "../Particle";
import CryptoBackground from "../CryptoBackground";
import { AiOutlineMail, AiOutlineUser, AiOutlineMessage } from "react-icons/ai";
import { BsPhone, BsLinkedin, BsGithub } from "react-icons/bs";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setAlertType("danger");
      setAlertMessage("Please fill in all required fields.");
      setShowAlert(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlertType("danger");
      setAlertMessage("Please enter a valid email address.");
      setShowAlert(true);
      return;
    }

    try {
      // Show loading state
      setAlertType("info");
      setAlertMessage("Sending message...");
      setShowAlert(true);

      // Send to backend
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Show success message
        setAlertType("success");
        setAlertMessage("✅ Message sent successfully! I'll get back to you soon.");
        setShowAlert(true);

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback to mailto if backend is not available
      setAlertType("warning");
      setAlertMessage("Backend unavailable. Opening email client as fallback...");
      setShowAlert(true);
      
      // Create mailto link as fallback
      const subject = formData.subject || "Contact from Portfolio";
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const mailtoLink = `mailto:ahjli.contact@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 1000);
    }

    // Hide alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <Container fluid className="contact-section">
      <CryptoBackground />
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Get In <strong className="green">Touch</strong>
            </h1>
            <p style={{ color: "white", textAlign: "justify" }}>
              I'm always interested in discussing new opportunities, 
              collaborations, or cybersecurity challenges. Whether you have 
              a project in mind, need security consultation, or just want to 
              connect, feel free to reach out!
            </p>
            
            {showAlert && (
              <Alert 
                variant={alertType} 
                onClose={() => setShowAlert(false)} 
                dismissible
                style={{ marginBottom: "20px" }}
              >
                {alertMessage}
              </Alert>
            )}

            <Form onSubmit={handleSubmit} className="contact-form">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#4ade80" }}>
                      <AiOutlineUser /> Name *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="contact-input"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#4ade80" }}>
                      <AiOutlineMail /> Email *
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="contact-input"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#4ade80" }}>
                  Subject
                </Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject (optional)"
                  className="contact-input"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#4ade80" }}>
                  <AiOutlineMessage /> Message *
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="contact-input"
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  type="submit"
                  className="contact-btn"
                  size="lg"
                >
                  <AiOutlineMail /> Send Message
                </Button>
              </div>
            </Form>

            <Row style={{ marginTop: "40px" }}>
              <Col md={12}>
                <h3 style={{ color: "#4ade80", textAlign: "center", marginBottom: "20px" }}>
                  Other Ways to Connect
                </h3>
                <div className="contact-links">
                  <a
                    href="mailto:ahjli.contact@gmail.com"
                    className="contact-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineMail /> ahjli.contact@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/oussama-ahjli/"
                    className="contact-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsLinkedin /> LinkedIn Profile
                  </a>
                  <a
                    href="https://github.com/SaamNoLimits"
                    className="contact-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsGithub /> GitHub Profile
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Contact;
