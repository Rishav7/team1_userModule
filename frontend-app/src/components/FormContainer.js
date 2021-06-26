import React from 'react'
import {Container ,  Row, Col } from 'react-bootstrap';


//using a children pros and then destructing them
const FormContainer = ({children}) => {
    return (
     <Container>
         <Row className = 'justify-content-md-center'>
             <Col xs={12} md={6}>
                 {/* passing a child prop */}
                 {children}
             </Col>
         </Row>
     </Container>
    )
}

export default FormContainer
