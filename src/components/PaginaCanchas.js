import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Resultados = () => {
    const location = useLocation();
    const { resultados } = location.state || { resultados: [] };

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Resultados de la Búsqueda</h2>
                    {resultados.length > 0 ? (
                        <ListGroup>
                            {resultados.map((cancha, index) => (
                                <ListGroup.Item key={index}>
                                    {`Cancha: ${cancha.nombre}, ID: ${cancha.id}, Descripción: ${cancha.descripcion || 'No disponible'}, Deporte ID: ${cancha.IdDeporte}`}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>No hay canchas disponibles para mostrar.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Resultados;
