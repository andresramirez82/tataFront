import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { Company } from 'models/company';
import { getCompanies, deleteCompany, createCompany } from "functions/company";
import { toast } from 'react-toastify';
import CUIL from "components/UI/CUIL/Cuil";
import Tel from "components/UI/Tel/Tel";
import Email from "components/UI/Email/Email";
import URL from "components/UI/URL/URL";

const CompanyCRUD: React.FC = () => {
    const [companies, setCompanies] = useState<Company | undefined>({ id: 0, name: '', cuil: '', phone: '', email: '', address: '' });
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<Company>({ id: 0, name: '', cuil: '', phone: '', email: '', address: '' });

    // Fetch companies on component mount
    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = () => {
        getCompanies().then(com => {
            if (com) {
                console.log(com.logo)
                setCompanies(com);
            }
        })
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ id: 0, name: '', cuil: '', phone: '', email: '', address: '' });
    };

    const handleSubmit = () => {
        createCompany(formData).then(() => {
            toast.success(`Se agrego correctamente la información de la empresa`);
            fetchCompanies();
            handleCloseModal();
        }).catch(err => {
            toast.error(`${err.response?.data.message}`)
            console.error(err);
        })
    };

    const handleDelete = (id: number) => {
        deleteCompany(id).then(() => {
            toast.success(`Se borro correctamente los datos de la empresa`);
            setCompanies({ id: 0, name: '', cuil: '', phone: '', email: '', address: '' });
        }).catch(err => {
            toast.error(`${err.response?.data.message}`)
            console.error(err);
        })
    };





    return (
        <div>
            {companies && companies.id === 0 && <Button onClick={() => setShowModal(true)}><span className="bi bi-building" > Agregar datos de la empresa</span></Button>}
            <Table striped hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>CUIL</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Dirección</th>
                        <th>Logo</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {companies && companies.id !== 0 && <tr key={companies.id}>
                        <td>{companies.id}</td>
                        <td>{companies.name}</td>
                        <td>{companies.cuil}</td>
                        <td>{companies.phone}</td>
                        <td>{companies.email}</td>
                        <td>{companies.address}</td>
                        <td><img src={companies.logo} alt={companies.name} width={50}></img></td>
                        <td>
                            <Button variant="danger" onClick={() => handleDelete(companies.id)}><span className='bi bi-trash'> Borrar</span></Button>
                        </td>
                    </tr>}


                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar datos de la empresa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                        </Form.Group>
                        <CUIL name="cuil" value={formData.cuil} onChange={handleInputChange} required />
                        <Tel name="phone" value={formData.phone} onChange={handleInputChange} required />
                        <Email name="email" aria-label={'Email'} value={formData.email} onChange={handleInputChange} required />
                        <URL name='logo' value={formData.logo} label={'URL logo'} onChange={handleInputChange} required />

                        <Form.Group controlId="formAddress">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}><span className='bi bi-x'> Cancelar</span></Button>
                    <Button variant="primary" onClick={handleSubmit}><span className='bi bi-floppy'> Grabar</span></Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CompanyCRUD;