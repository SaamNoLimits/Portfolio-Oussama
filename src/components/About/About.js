import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import { AiOutlineDownload, AiOutlineEye } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import pdf from "../../Assets/cv_Oussama_AHJLI-3.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function About() {
  const [width, setWidth] = useState(1200);
  const [showCV, setShowCV] = useState(false);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container fluid className="about-section">
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
              Know Who <strong className="green">I'M</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>

        {/* CV Section */}
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          <Col md={12} className="cv-section">
            <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
              My <strong className="green">Resume</strong>
            </h1>
            
            <div className="cv-controls" style={{ textAlign: "center", marginBottom: "30px" }}>
              <Button
                variant="primary"
                href={pdf}
                target="_blank"
                className="cv-button"
                style={{ margin: "10px" }}
              >
                <AiOutlineDownload />
                &nbsp;Download CV
              </Button>
              
              <Button
                variant="outline-success"
                onClick={() => setShowCV(!showCV)}
                className="cv-button"
                style={{ margin: "10px" }}
              >
                <AiOutlineEye />
                &nbsp;{showCV ? 'Hide Preview' : 'Show Preview'}
              </Button>
            </div>

            {showCV && (
              <div className="cv-preview" style={{ textAlign: "center" }}>
                <div className="cv-container">
                  <Document file={pdf} className="d-flex justify-content-center">
                    <Page 
                      pageNumber={1} 
                      scale={width > 786 ? 1.2 : 0.8}
                      className="cv-page"
                    />
                  </Document>
                </div>
              </div>
            )}
          </Col>
        </Row>

        <h1 className="project-heading">
          Professional <strong className="green">Skillset</strong>
        </h1>

        <Techstack />

        <h1 className="project-heading">
          <strong className="green">Tools</strong> I use
        </h1>
        <Toolstack />

        <Github />
      </Container>
    </Container>
  );
}

export default About;
