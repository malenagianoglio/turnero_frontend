import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Modal } from 'react-bootstrap';
import '../../App.css';

function GestionReservas() {
    const [reservas, setReservas] = useState([]);
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
    const [showModal, setShowModal] = useState(false);
    const [reservaToDelete, setReservaToDelete] = useState(null);

    useEffect(() => {
        fetchReservas();
    }, []);

    const fetchReservas = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/reservas');
            if (!response.ok) {
                throw new Error('Error al obtener las reservas');
            }
            const { reservas } = await response.json();
            setReservas(reservas);
        } catch (error) {
            console.error('Error fetching reservations:', error);
            setAlert({ show: true, message: 'Error al cargar las reservas', variant: 'danger' });
        }
    };

    const handleEliminar = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/reservas/${reservaToDelete.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar la reserva');
            }
            setReservas(reservas.filter((reserva) => reserva.id !== reservaToDelete.id));
            setAlert({ show: true, message: 'Reserva eliminada exitosamente', variant: 'success' });
            setShowModal(false); 
        } catch (error) {
            console.error('Error deleting reservation:', error);
            setAlert({ show: true, message: 'Error al eliminar la reserva', variant: 'danger' });
            setShowModal(false); 
        }
    };

    const confirmDelete = (reserva) => {
        setReservaToDelete(reserva);
        setShowModal(true);
    };

    return (
        <Container fluid className="contenedor-resultados">
            <Row>
                <Col>
                    <div className='contenedor-opciones-reserva'>
                        <h2 className="titulo-resultados">Mis Reservas</h2>
                    </div>
                    {alert.show && (
                        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                            {alert.message}
                        </Alert>
                    )}

                    {reservas.length > 0 ? (
                        <Row>
                            {reservas.map((reserva) => (
                                <Col key={reserva.id} md={6} lg={4} className="mb-4">
                                    <Card className="resultado-card h-100">
                                        <Card.Body>
                                            <Card.Title className="text-primary">{reserva.cancha?.nombre || 'Cancha Desconocida'}</Card.Title>
                                            <Card.Text>
                                                <strong>Fecha:</strong> {reserva.fecha || 'No disponible'}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Horario:</strong> {reserva.horario_inicio || 'No disponible'}
                                            </Card.Text>
                                            <Button variant="danger" onClick={() => confirmDelete(reserva)}>
                                                Eliminar
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p className="no-resultados">No hay reservas disponibles para mostrar.</p>
                    )}

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar Eliminación</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            ¿Estás seguro de que quieres eliminar esta reserva?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleEliminar}>
                                Eliminar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
}

export default GestionReservas;
