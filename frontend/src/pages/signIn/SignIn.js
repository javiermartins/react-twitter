import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/img/logo.png";
import logoWhite from "../../assets/img/logo-white.png";

import "./SignIn.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import Button from "react-bootstrap/Button";

export default function SignIn() {
  return (
    <Container className="signin" fluid>
      <Row>
        <LeftComponent />
        <RightComponent />
      </Row>
    </Container>
  );
}

function LeftComponent() {
  return (
    <Col className="left-container" xs={6}>
      <img src={logo} alt="logo" />
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          Sigue lo que te interesa
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Entérate de que está hablando la gente
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComment} />
          Únite a la conversación
        </h2>
      </div>
    </Col>
  );
}

function RightComponent() {
  return (
    <Col className="right-container" xs={6}>
      <div>
        <img src={logoWhite} alt="" />
        <h2>Mira lo que está pasando en el mundo en este momento</h2>
        <h3>Únete a twitter en este momento</h3>
        <Button variant="primary">Regístrate</Button>
        <Button variant="outline-primary">Iniciar sesión</Button>
      </div>
    </Col>
  );
}
