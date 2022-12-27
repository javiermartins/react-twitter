import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Menu from "../../components/Menu/Menu";
import "./BasicLayout.scss";

export default function BasicLayout(props) {
  const { className, children, setCheckRefresh } = props;

  return (
    <Container className={`basic-layout ${className}`}>
      <Row>
        <Col xs={3} className="basic-layout__menu">
          <Menu setCheckRefresh={setCheckRefresh}/>
        </Col>
        <Col xs={9} className="basic-layout__content">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
