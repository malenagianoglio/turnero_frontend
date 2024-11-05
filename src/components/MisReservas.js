import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../AuthContext';

const MisReservas = () => {
    const [reservas, setReservas] = useState([]);
    const { userId } = useAuth(); 

    useEffect(() => {
        fetchReservas();
    }, []);

    const fetchReservas = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/reservas/getReservasPorUsuario', { 
                IdUsuario: userId,
            });
            setReservas(response.data);
        } catch (error) {
            console.error('Error al obtener reservas:', error);
            if (error.response) {
                alert(`Error al obtener las reservas: ${error.response.data}`);
            } else {
                alert('Error al obtener las reservas');
            }
        }
    };

    // Función para eliminar una reserva por su ID
    const deleteReserva = async (reservaId) => {
        try {
            await axios.delete(`http://localhost:8080/api/reservas/${reservaId}`);
            // Actualiza la lista de reservas al eliminar una
            setReservas(reservas.filter((reserva) => reserva.id !== reservaId));
            alert('Reserva eliminada con éxito');
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
            alert('Error al eliminar la reserva');
        }
    };

    return (
        <Container>
            <h2>Mis Reservas</h2>
            <Row>
                {reservas.length > 0 ? (
                    reservas.map((reserva) => (
                        <Col key={reserva.id} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Cancha: {reserva.Cancha.nombre}</Card.Title>
                                    <Card.Text>
                                        <strong>Descripción:</strong> {reserva.Cancha.descripcion}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Fecha:</strong> {reserva.fecha}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Horario:</strong> {reserva.horario_inicio}
                                    </Card.Text>
                                    {/* Botón para eliminar la reserva */}
                                    <Button variant="danger" onClick={() => deleteReserva(reserva.id)}>
                                        Eliminar Reserva
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No tienes reservas registradas.</p>
                )}
            </Row>
        </Container>
    );
};

export default MisReservas;
