import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineMail,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import CryptoBackground from "../CryptoBackground";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <CryptoBackground />
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="green"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I fell in love with cybersecurity and programming, and I have at least learnt
              something, I think… 🤷‍♂️
              <br />
              <br />I am fluent in security tools and languages like
              <i>
                <b className="green"> Python, JavaScript, and Bash. </b>
              </i>
              <br />
              <br />
              My field of Interest's are building secure &nbsp;
              <i>
                <b className="green">Web Applications and Security Tools </b> and
                also in areas related to{" "}
                <b className="green">
                  Penetration Testing and Vulnerability Assessment.
                </b>
              </i>
              <br />
              <br />
              Whenever possible, I also apply my passion for developing secure applications
              with <b className="green">Node.js</b> and
              <i>
                <b className="green">
                  {" "}
                  Modern Security Frameworks
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="green"> OWASP and Metasploit</b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="green">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/SaamNoLimits"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="mailto:ahjli.contact@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineMail />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/oussama-ahjli/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/Oussama.AHJLI"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
