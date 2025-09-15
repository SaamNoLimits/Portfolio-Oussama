import React from "react";
import { Col, Row, Card } from "react-bootstrap";

function SkillsSection() {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["English (Intermediate)", "French (B2)", "Arabic (Native)"],
      icon: "🌐"
    },
    {
      title: "Programming",
      skills: [
        "JavaScript (React, React Native, Next.js, Node.js)",
        "TypeScript",
        "Python",
        "Java",
        "SQL",
        "Shell Scripts",
        "YAML"
      ],
      icon: "💻"
    },
    {
      title: "Cybersecurity Frameworks",
      skills: [
        "OWASP",
        "NIST",
        "ISO 27001",
        "MITRE ATT&CK",
        "CIS Controls"
      ],
      icon: "🛡️"
    },
    {
      title: "Security Tools and Technologies",
      skills: [
        "SIEM/SOAR",
        "EDR",
        "XDR",
        "IDS/IPS",
        "Nmap"
      ],
      icon: "🔧"
    },
    {
      title: "DevOps and Infrastructure",
      skills: [
        "Docker",
        "Jenkins",
        "Ansible",
        "CI/CD Pipelines"
      ],
      icon: "⚙️"
    },
    {
      title: "Monitoring and Logging",
      skills: [
        "ELK Stack",
        "Splunk"
      ],
      icon: "📊"
    }
  ];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {skillCategories.map((category, index) => (
        <Col xs={12} md={6} lg={4} className="mb-4" key={index}>
          <Card className="skill-card h-100" style={{
            backgroundColor: "rgba(74, 222, 128, 0.05)",
            border: "1px solid rgba(74, 222, 128, 0.2)",
            borderRadius: "15px",
            transition: "all 0.3s ease"
          }}>
            <Card.Body>
              <div className="text-center mb-3">
                <span style={{ fontSize: "2rem" }}>{category.icon}</span>
                <h5 className="green mt-2" style={{ 
                  fontWeight: "bold",
                  fontSize: "1.2rem"
                }}>
                  {category.title}
                </h5>
              </div>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0
              }}>
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} style={{
                    padding: "8px 0",
                    borderBottom: skillIndex < category.skills.length - 1 ? "1px solid rgba(74, 222, 128, 0.1)" : "none",
                    color: "#fff",
                    fontSize: "0.9rem",
                    lineHeight: "1.4"
                  }}>
                    <span style={{
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      backgroundColor: "#4ade80",
                      borderRadius: "50%",
                      marginRight: "10px",
                      marginTop: "6px",
                      verticalAlign: "top"
                    }}></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default SkillsSection;
