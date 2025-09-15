import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.png";
import Particle from "../Particle";
import CryptoBackground from "../CryptoBackground";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Hi There! 👋🏻";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <CryptoBackground />
        <Particle />
        <div className="matrix-bg"></div>
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <div className="terminal-container">
                <div className="terminal-header">
                  <div className="terminal-buttons">
                    <span className="terminal-button red"></span>
                    <span className="terminal-button yellow"></span>
                    <span className="terminal-button green"></span>
                  </div>
                  <div className="terminal-title">oussama@portfolio:~$</div>
                </div>
                <div className="terminal-body">
                  <div className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-command">whoami</span>
                  </div>
                  <div className="terminal-output">
                    <h1 className="heading terminal-greeting">
                      {displayText}
                      <span className="terminal-cursor">|</span>
                    </h1>
                  </div>
                  
                  <div className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-command">cat /etc/identity</span>
                  </div>
                  <div className="terminal-output">
                    <h1 className="heading-name glitch-effect" data-text="I'M Oussama AHJLI">
                      I'M
                      <strong className="main-name"> Oussama AHJLI</strong>
                    </h1>
                  </div>

                  <div className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-command">echo $ROLE</span>
                  </div>
                  <div className="terminal-output typewriter-container">
                    <Type />
                  </div>
                </div>
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <div className="home-image-container">
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid home-image"
                  style={{ maxHeight: "450px" }}
                />
                <div className="image-glow"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
