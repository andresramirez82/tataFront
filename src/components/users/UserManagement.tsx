// src/components/UserManagement.tsx
import React, { useState, useEffect } from "react";
import { Form } from 'react-bootstrap';
import { UserClass, getUsers } from "functions/api";
import { User } from "models/user";
import { formatDate } from "functions/functios";
import { toast } from 'react-toastify';


const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [isFormInvalid, setIsFormInvalid] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;


        if (form.checkValidity()) {
            setIsFormInvalid(false);
            createUser();
        } else {
            // Si hay errores de validación, muestra los mensajes de error
            e.stopPropagation();
            setIsFormInvalid(true);
        }
        //form.classNameList.add('was-validated');
    };

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    const createUser = async () => {
        try {
            UserClass.createUser({ name: name }).then(resp => {
                toast(`Se creó correctamente el usuario ${name}`);
                fetchUsers();
            })
        } catch (error) {
            toast(`Error al crear el usuario ${name}`);
            console.error("Error al crear usuario:", error);
        }
    };

    const deleteUser = async (userId: number) => {
        try {
            await UserClass.deleteUser(userId);
            toast(`Se eliminó correctamente el usuario ${name}`);
            fetchUsers();
        } catch (error) {
            toast(`Error al eliminar el usuario ${name}`);
            console.error("Error al eliminar usuario:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Administración de Usuarios</h1>
            <Form noValidate validated={isFormInvalid} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-primary" type="submit" >Crear Usuario</button>
            </Form>



            <h2 className="mt-4">Lista de Usuarios</h2>
            {loading ? (
                <p>Cargando usuarios...</p>
            ) : (
                <ul className="list-group">
                    {users.map((user) => (
                        <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {user.name} - último acceso: {formatDate(user.lastlogin)}
                            <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserManagement;