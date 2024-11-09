import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; 
import axios from 'axios';
import '../../App.css';

const Resultados = () => {
    const location = useLocation();
    const { resultados, fecha, horario } = location.state || { resultados: [], fecha: '', horario: '' };
    const [showModal, setShowModal] = useState(false);
    const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);
    const { userId } = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState(''); 
    const [resultadosActualizados, setResultadosActualizados] = useState(resultados);  
    const handleReservar = (cancha) => {
        if (!userId) {
            setAlertMessage('Por favor, inicia sesión para realizar una reserva.');
            setAlertVariant('danger'); 
            setShowAlert(true);
            return;
        }
        setCanchaSeleccionada(cancha);
        setShowModal(true);
    };

    const confirmarReserva = async () => {
        if (!canchaSeleccionada) return;

        try {
            const response = await axios.post('http://localhost:8080/api/nuevareserva', {
                IdUsuario: userId,
                IdCancha: canchaSeleccionada.id,
                fecha: fecha,      
                horario_inicio: horario, 
            });

            setAlertMessage(response.data.message || 'Reserva realizada con éxito');
            setAlertVariant('success'); 
            setShowAlert(true);
            setShowModal(false);

          
            const nuevosResultados = resultadosActualizados.filter(cancha => cancha.id !== canchaSeleccionada.id);
            setResultadosActualizados(nuevosResultados); 

        } catch (error) {
            console.error('Error al realizar la reserva:', error);
            setAlertMessage('Error al realizar la reserva, por favor intenta de nuevo');
            setAlertVariant('danger'); 
            setShowAlert(true);
            setShowModal(false); 
        }
    };

    return (
        <Container fluid className="contenedor-resultados">
            {showAlert && (
                <Alert variant={alertVariant} className="alerta" onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}

            <Row>
                <Col>
                    <h2 className="titulo-resultados">Resultados de la Búsqueda</h2>
                    {resultadosActualizados.length > 0 ? (
                        <Row>
                            {resultadosActualizados.map((cancha, index) => (
                                <Col key={index} md={6} lg={4} className="mb-4">
                                    <Card className="resultado-card h-100">
                                        <Card.Body>
                                            <Card.Title className="text-primary">{cancha.nombre}</Card.Title>
                                            <Card.Text>
                                                <strong>Descripción:</strong> {cancha.descripcion || 'No disponible'}
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => handleReservar(cancha)}>
                                                Reservar
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

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Reserva</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas reservar: <strong>{canchaSeleccionada?.nombre}</strong> para el {fecha} a las {horario}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={confirmarReserva}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Resultados;
