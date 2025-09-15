import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiLinux,
  SiVisualstudiocode,
  SiDocker,
  SiGit,
  SiPostman,
  SiSlack,
} from "react-icons/si";
import { TbShieldCheck, TbEye, TbBug, TbNetwork } from "react-icons/tb";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {/* Security Tools */}
      <Col xs={4} md={2} className="tech-icons">
        <TbShieldCheck />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <TbEye />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <TbBug />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <TbNetwork />
      </Col>
      
      {/* Development Tools */}
      <Col xs={4} md={2} className="tech-icons">
        <SiLinux />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiDocker />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGit />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostman />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiSlack />
      </Col>
    </Row>
  );
}

export default Toolstack;
