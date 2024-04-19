import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { Company } from 'models/company';
import { getCompanies, deleteCompany, createCompany } from "functions/company";
import { toast } from 'react-toastify';
import Update from "./Upload";

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
            toast(`Se agrego correctamente la información de la empresa`);
            fetchCompanies();
            handleCloseModal();
        }).catch(err => {
            console.error(err);
        })
    };

    const handleDelete = (id: number) => {
        deleteCompany(id).then(() => {
            toast(`Se borro correctamente los datos de la empresa`);
            setCompanies({ id: 0, name: '', cuil: '', phone: '', email: '', address: '' });
        }).catch(err => {
            console.error(err);
        })
    };

    const upload = (param: any) => {
        setFormData(() => ({
            ...formData,
            logo: param,
        }));
        //inputRef.current.click();
        //setchangePic(false);
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
                        <td>
                            <Button variant="danger" onClick={() => handleDelete(companies.id)}><span className='bi bi-trash'> Borrar</span></Button>
                        </td>
                    </tr>}


                </tbody>
            </Table>
            {companies?.logo && <img src={companies?.logo} />}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formCuil">
                            <Form.Label>CUIL</Form.Label>
                            <Form.Control type="text" name="cuil" value={formData.cuil} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                        </Form.Group>
                        <Update onPictureUpload={upload} />
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