import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="green">Projects </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are my cybersecurity and AI projects focused on threat detection, automation, and security enhancement.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Malware Detection Pipeline"
              description="Development of an automated malware detection pipeline using machine learning algorithms and static/dynamic analysis to identify and classify threats with high accuracy. Technologies: Python, Machine Learning, Deep Learning, YARA."
              ghLink="https://github.com/SaamNoLimits"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="AI Agent for Security Enhancement"
              description="Development of autonomous intelligent agents for proactive security enhancement, automating incident response, threat orchestration and dynamic adaptation of security policies based on behavioral analysis. Technologies: DL, Python, Wazuh, ELK, Automation."
              ghLink="https://github.com/SaamNoLimits"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="IoT Intrusion Detection and Prevention System"
              description="Development of an intelligent IoT security system combining ML/AI algorithms with blockchain technology for real-time threat detection and prevention. Technologies: Machine Learning, AI, Blockchain, Python."
              ghLink="https://github.com/SaamNoLimits"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Advanced Phishing Detection System"
              description="Design of an intelligent phishing detection system combining natural language processing and URL analysis to identify phishing attempts in real-time with minimal false positive rate. Technologies: NLP, TensorFlow, Python, Feature Engineering."
              ghLink="https://github.com/SaamNoLimits"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Secure Movie File Protection System"
              description="Building a secure blockchain-based file protection system for cinematic content with encryption, digital rights management and tamper-proof storage. Technologies: OWASP MASVS, Cryptography, Node.js."
              ghLink="https://github.com/SaamNoLimits"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Infrastructure as Code Automation"
              description="Automation of infrastructure provisioning and configuration management using Ansible playbooks, reducing deployment time and ensuring consistency across environments. Technologies: Ansible, DevOps, YAML, Linux."
              ghLink="https://github.com/SaamNoLimits"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
