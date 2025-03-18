import { RefObject } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./intro.css";
import "../../index.css"; 

type IntroProps = {
  mainRef: RefObject<HTMLDivElement | null>; // Recibir la referencia
};

const Intro = ({ mainRef }: IntroProps) => {
  const handleScroll = () => {
    console.log("funciona");
    if (mainRef.current) {
      const offset = 130; // Ajusta este valor según lo que necesites
      const targetPosition = mainRef.current.getBoundingClientRect().top + window.scrollY - offset;
  
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  

  return (
    <>
      {/* Sección principal */}
      <div className="home-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="home-title">Welcome to Keyla</h1>
              <p className="home-subtitle">Software gaming</p>
              <p className="home-subtitle">
                Discover and share amazing content with our community
              </p>

              <div className="btnExploreContainer">
                <button className="btnExplore" onClick={handleScroll}>
                  Explore
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Intro;
