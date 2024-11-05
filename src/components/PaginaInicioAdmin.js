import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const InicioAdmin = () => {
    const [reservas, setReservas] = useState([]);
    const [canchas, setCanchas] = useState([]);
    const [nuevaCancha, setNuevaCancha] = useState({ nombre: '', descripcion: '', IdDeporte: '' });
    const [editingCancha, setEditingCancha] = useState(null);

    useEffect(() => {
        fetchReservas();
        fetchCanchas();
    }, []);

    const fetchReservas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/reservas');
            setReservas(response.data);
        } catch (error) {
            console.error('Error al obtener reservas:', error);
        }
    };

    const fetchCanchas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/canchas');
            setCanchas(response.data);
        } catch (error) {
            console.error('Error al obtener canchas:', error);
        }
    };

    const handleCreateCancha = async () => {
        try {
            await axios.post('http://localhost:8080/api/canchas', nuevaCancha);
            fetchCanchas();
            setNuevaCancha({ nombre: '', descripcion: '', IdDeporte: '' });
        } catch (error) {
            console.error('Error al crear cancha:', error);
        }
    };

    const handleDeleteCancha = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/canchas/${id}`);
            fetchCanchas();
        } catch (error) {
            console.error('Error al eliminar cancha:', error);
        }
    };

    const handleUpdateCancha = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/canchas/${id}`, editingCancha);
            fetchCanchas();
            setEditingCancha(null);  // Cerrar el modo edición
        } catch (error) {
            console.error('Error al actualizar cancha:', error);
        }
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Bienvenido, Administrador</h1>

            <div className="row mb-4">
                <div className="col">
                    <h2>Reservas</h2>
                    <ul className="list-group">
                        {reservas.map((reserva) => (
                            <li key={reserva.id} className="list-group-item">
                                <strong>ID:</strong> {reserva.id}, <strong>Cancha:</strong> {reserva.IdCancha}, <strong>Cliente:</strong> {reserva.IdUsuario}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <h2>Gestión de Canchas</h2>
                    <ul className="list-group mb-4">
                        {canchas.map((cancha) => (
                            <li key={cancha.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>
                                    <strong>{cancha.nombre}</strong> - {cancha.descripcion} (Deporte ID: {cancha.IdDeporte})
                                </span>
                                <div>
                                    <button
                                        className="btn btn-danger btn-sm mx-1"
                                        onClick={() => handleDeleteCancha(cancha.id)}
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-sm mx-1"
                                        onClick={() => setEditingCancha(cancha)}
                                    >
                                        Editar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-md-4">
                    <h3>Agregar Nueva Cancha</h3>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Nombre"
                            value={nuevaCancha.nombre}
                            onChange={(e) => setNuevaCancha({ ...nuevaCancha, nombre: e.target.value })}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Descripción"
                            value={nuevaCancha.descripcion}
                            onChange={(e) => setNuevaCancha({ ...nuevaCancha, descripcion: e.target.value })}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="ID del Deporte"
                            value={nuevaCancha.IdDeporte}
                            onChange={(e) => setNuevaCancha({ ...nuevaCancha, IdDeporte: e.target.value })}
                        />
                        <button className="btn btn-primary w-100" onClick={handleCreateCancha}>Crear Cancha</button>
                    </div>
                </div>
            </div>

            {/* Formulario para editar una cancha seleccionada */}
            {editingCancha && (
                <div className="row">
                    <div className="col-md-12">
                        <h3>Editar Cancha</h3>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Nombre"
                                value={editingCancha.nombre}
                                onChange={(e) => setEditingCancha({ ...editingCancha, nombre: e.target.value })}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Descripción"
                                value={editingCancha.descripcion}
                                onChange={(e) => setEditingCancha({ ...editingCancha, descripcion: e.target.value })}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="ID del Deporte"
                                value={editingCancha.IdDeporte}
                                onChange={(e) => setEditingCancha({ ...editingCancha, IdDeporte: e.target.value })}
                            />
                            <button
                                className="btn btn-success w-100 mb-2"
                                onClick={() => handleUpdateCancha(editingCancha.id)}
                            >
                                Guardar Cambios
                            </button>
                            <button
                                className="btn btn-secondary w-100"
                                onClick={() => setEditingCancha(null)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InicioAdmin;
