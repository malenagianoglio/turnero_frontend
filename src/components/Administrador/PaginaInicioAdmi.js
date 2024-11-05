import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../App.css';

const PaginaInicioAdmin = () => {

    return (
        <Container fluid className="background-container">
            <Row className="gradient-container">
                <Col xs={12} md={6} className="left-column">
                </Col>

                <Col xs={12} md={6} className="right-column">
                    <div className='contenedor-form'>
                        <Link to='/'>
                            <Button variant='primary' className="mb-3">Gestión de canchas</Button>
                        </Link>
                        <Link to='/'>
                            <Button variant='primary' className="mb-3">Gestión de turnos</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
            <div className="gradient-overlay"></div>
        </Container>
    );
};

export default PaginaInicioAdmin;
