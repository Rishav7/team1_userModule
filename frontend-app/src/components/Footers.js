import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footers = () => {
  return (
    <footer>
      <Container>
          <Row>
              <Col className = 'text-center py-3'>
                  Copyright &copy; bookShop
              </Col>
          </Row>
      </Container>
    </footer>
  );
};

export default Footers;
