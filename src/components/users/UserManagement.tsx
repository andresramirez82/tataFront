// src/components/UserManagement.tsx
import React, { useState, useEffect } from "react";
import { Form, Table } from 'react-bootstrap';
import { UserClass, getUsers } from "functions/api";
import { User, UserRole } from "models/user";
import { formatDate } from "functions/functios";
import { toast } from 'react-toastify';
import Spinner from "components/helpper/Spinner";
import { AxiosError } from "axios";
import { ErrorResponse } from "models/models";
import UserRoleSelect from "components/helpper/Rol";
import { resetPass, generarPassword, changeState, exist } from "functions/User";
import Mail from "components/helpper/Mail";
import ResetPass from "components/helpper/ResetPass";



const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setuser] = useState<User>({ id: 0, name: "", lastlogin: null, password: "", rol: UserRole.Customer, username: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [isFormInvalid, setIsFormInvalid] = useState(false);


    const validarUser = () => {
        if (user.username) {
            exist(user.username).then(e => {
                if (!e === true) {
                    toast.warning(`Ya existe un usuario ${user.username}`);
                    setuser({
                        ...user,
                        username: ''
                    })
                }
            })
        }
    }

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
        } catch (error: any) {
            toast.error(`${error.response?.data.message} Listar Usuarios`);
        } finally {
            setLoading(false);
        }
    };

    const createUser = async () => {
        try {
            if (user) {
                UserClass.createUser(user).then(resp => {
                    toast.success(`Se creó correctamente el usuario ${user.name}`);
                    fetchUsers();
                }).catch((err: AxiosError<ErrorResponse>) => {
                    toast.error(`${err.response?.data.message}`);
                })
            }

        } catch (error) {
            toast.error(`Error al crear el usuario ${user?.name}`);
            console.error("Error al crear usuario:", error);
        }
    };

    const deleteUser = async (userId: number) => {

        UserClass.deleteUser(userId).then(u => {
            toast.success(`Se eliminó correctamente el usuario`);
            fetchUsers();
        }).catch((err: AxiosError<ErrorResponse>) => {
            toast.error(`${err.response?.data.message}`)
        })
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const resetUser = (id: number) => {
        const newpass = generarPassword(10);
        resetPass(id, newpass).then(np => {
            toast.info(`Se actualizó correctamente la pass ${newpass}`, { autoClose: false })
            navigator.clipboard.writeText(newpass);
        }).catch((err: AxiosError<ErrorResponse>) => {
            toast.error(`${err.response?.data.message}`)
        })
    }

    const ChangeStates = async (idUser: number, state: boolean) => {
        try {
            await changeState(idUser, state);
            // Actualizar el estado local directamente
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === idUser ? { ...user, active: state } : user
                )
            );
            toast.info(`El estado del usuario se ha actualizado correctamente.`);
        } catch (err: any) {
            toast.error(`${err.response?.data.message}`)
        }
    };

    return (
        <div className="container mt-4">
            <h2><span className="bi bi-person" /> Administración de Usuarios</h2>
            <Form noValidate validated={isFormInvalid} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Usuario:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={user?.username}
                        onChange={(e) => setuser({ ...user, username: e.target.value })}
                        required
                        onBlur={validarUser}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={user?.name}
                        onChange={(e) => setuser({ ...user, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={user?.password}
                        onChange={(e) => setuser({ ...user, password: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Rol:</label>
                    <UserRoleSelect id="rol" onChange={(e) => setuser({ ...user, rol: e.target.value })} selected={user.rol} />
                </div>
                <button className="btn btn-primary" type="submit" ><span className='bi bi-person-add' /> Crear Usuario</button>
            </Form>



            <h4 className="mt-4">Lista de Usuarios</h4>
            {loading ? (
                <Spinner />
            ) : (
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Último acceso</th>
                            <th>activo</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <th><span className="bi-person"></span> {user.id}</th>
                                <td>{user.username} </td>
                                <td>{user.name} </td>
                                <td><Mail email={user.email} name={user.name} /> </td>
                                <td> {formatDate(user.lastlogin)}</td>
                                <td> <Form.Check
                                    type="switch"
                                    label="activo"
                                    checked={user.active}
                                    onChange={() => ChangeStates(user.id, !user.active)}
                                /> </td>
                                <td><div className="d-grid gap-2">
                                    {user.id && <ResetPass email={user.email} name={user.name} idUser={user.id} />}
                                    <button className="btn btn-danger" onClick={() => deleteUser(user.id)}><span className='bi bi-trash' /> Eliminar</button>
                                </div></td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default UserManagement;