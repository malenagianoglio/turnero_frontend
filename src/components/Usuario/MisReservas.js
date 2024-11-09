import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../AuthContext';
import '../../App.css';

const MisReservas = () => {
  const { userId } = useAuth(); 
  const [reservas, setReservas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reservaAEliminar, setReservaAEliminar] = useState(null);
  const [alerta, setAlerta] = useState({ mensaje: '', variant: '' }); 

  useEffect(() => {
    const fetchReservas = async () => {
      if (!userId) return; 

      try {
        const response = await axios.get(`http://localhost:8080/api/reservas/obtenerPorIdUsuario/${userId}`);
        setReservas(response.data.reservas);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    fetchReservas();
  }, [userId]);

  const handleCancelarReserva = (reserva) => {
    setReservaAEliminar(reserva);
    setShowModal(true);
  };

  const cancelarReserva = async () => {
    if (!reservaAEliminar) return;

    try {
      await axios.delete(`http://localhost:8080/api/reservas/${reservaAEliminar.id}`);

      const nuevasReservas = reservas.filter(reserva => reserva.id !== reservaAEliminar.id);
      setReservas(nuevasReservas);

      setAlerta({
        mensaje: 'Reserva cancelada con éxito.',
        variant: 'success'
      });

      setShowModal(false);

    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      setAlerta({
        mensaje: 'No se pudo cancelar la reserva, por favor intenta de nuevo.',
        variant: 'danger'
      });
      setShowModal(false);
    }
  };

  const esReservaPasada = (reserva) => {
    const fechaHoraReserva = moment(`${reserva.fecha} ${reserva.horario_inicio}`, 'YYYY-MM-DD HH:mm');
    const horaActual = moment();
    return horaActual.isAfter(fechaHoraReserva);
  };

  return (
    <Container fluid className="my-4">
      {alerta.mensaje && (
        <Alert variant={alerta.variant} onClose={() => setAlerta({ mensaje: '', variant: '' })} dismissible>
          {alerta.mensaje}
        </Alert>
      )}

      <h2 className="text-center mb-4">Mis Reservas</h2>

      <Row>
        {reservas.length > 0 ? (
          reservas.map((reserva, index) => (
            <Col key={index} md={6} lg={4} className="mb-4">
              <Card className={`resultado-card ${esReservaPasada(reserva) ? 'disabled-card' : ''}`}>
                <Card.Body>
                  <Card.Title className='text-primary'>{reserva.cancha?.nombre || 'Cancha no disponible'}</Card.Title>
                  <Card.Text>
                    <strong>Descripción:</strong> {reserva.cancha?.descripcion || 'No disponible'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Fecha:</strong> {reserva.fecha}
                  </Card.Text>
                  <Card.Text>
                    <strong>Hora:</strong> {reserva.horario_inicio}
                  </Card.Text>
                  <Button 
                    variant="danger" 
                    onClick={() => handleCancelarReserva(reserva)} 
                    disabled={esReservaPasada(reserva)}
                  >
                    Cancelar Reserva
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No tienes reservas actualmente.</p>
          </Col>
        )}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cancelación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas cancelar la reserva para <strong>{reservaAEliminar?.cancha?.nombre}</strong> a las {reservaAEliminar?.horario_inicio} del {reservaAEliminar?.fecha}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={cancelarReserva}>
            Confirmar Cancelación
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MisReservas;
