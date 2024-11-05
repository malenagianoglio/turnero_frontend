import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Form, Card, Alert } from 'react-bootstrap';

function CanchaDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cancha, setCancha] = useState(null);
    const [deportes, setDeportes] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchCancha();
        fetchDeportes();
    }, []);

    const fetchCancha = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/canchas/${id}`);
            if (!response.ok) throw new Error('Error al cargar la cancha');
            const data = await response.json();
            setCancha(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchDeportes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/deportes');
            if (!response.ok) throw new Error('Error al cargar los deportes');
            const data = await response.json();
            setDeportes(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:8080/api/canchas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cancha),
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            navigate('/gestioncanchas');
        } catch (error) {
            setError('Error al actualizar la cancha');
        }
    };

    const handleDelete = async () => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta cancha?")) {
            try {
                await fetch(`http://localhost:8080/api/canchas/${id}`, {
                    method: 'DELETE',
                });
                alert("La cancha ha sido eliminada.");
                navigate('/');
            } catch (error) {
                setError('Error al eliminar la cancha');
            }
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Detalles de la Cancha</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Los datos de la cancha se han actualizado correctamente.</Alert>}
            {cancha ? (
                <Card className="p-4 shadow-sm">
                    <Form onSubmit={handleEdit}>
                        <Form.Group controlId="formNombre" className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={cancha.nombre}
                                onChange={(e) => setCancha({ ...cancha, nombre: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescripcion" className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={cancha.descripcion}
                                onChange={(e) => setCancha({ ...cancha, descripcion: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDeporte" className="mb-3">
                            <Form.Label>Deporte</Form.Label>
                            <Form.Control
                                as="select"
                                value={cancha.IdDeporte}
                                onChange={(e) => setCancha({ ...cancha, IdDeporte: e.target.value })}
                                required
                            >
                                <option value="">Seleccione un deporte</option>
                                {deportes.map(deporte => (
                                    <option key={deporte.id} value={deporte.id}>
                                        {deporte.nombre}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Button variant="primary" type="submit">
                                Guardar cambios
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Eliminar
                            </Button>
                        </div>
                    </Form>
                </Card>
            ) : (
                <p className="text-center">Cargando datos de la cancha...</p>
            )}
        </Container>
    );
}

export default CanchaDetalle;
