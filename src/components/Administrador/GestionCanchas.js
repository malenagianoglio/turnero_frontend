import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function GestionCanchas(){

    const [canchas, setCanchas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCanchas();
    }, []);

    const fetchCanchas = async () => {
        const response = await fetch('http://localhost:8080/api/canchas'); 
        const data = await response.json();
        setCanchas(data);
    };

    const handleVer = (cancha) => {
        navigate(`/canchadetalle/${cancha.id}`);
    };

    return(
        <Container fluid className="contenedor-resultados">
            <Row>
                <Col>
                    <div className='contenedor-opciones-cancha'>
                        <h2 className="titulo-resultados">Mis Canchas</h2>
                        <Link to='/nuevacancha'>
                            <Button variant='primary'>Nueva Cancha</Button>
                        </Link>
                    </div>
                    {canchas.length > 0 ? (
                        <Row>
                            {canchas.map((cancha, index) => (
                                <Col key={index} md={6} lg={4} className="mb-4">
                                    <Card className="resultado-card h-100">
                                        <Card.Body>
                                            <Card.Title className="text-primary">{cancha.nombre}</Card.Title>
                                            <Card.Text>
                                                <strong>Descripción:</strong> {cancha.descripcion || 'No disponible'}
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => handleVer(cancha)}>
                                                Ver
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p className="no-resultados">No hay canchas disponibles para mostrar.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default GestionCanchas;