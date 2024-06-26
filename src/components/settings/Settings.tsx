import UserManagement from "@components/users/UserManagement";
import PaymentPage from "@components/payment/PaymentPage";
import Company from "@components/company/Company";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const Settings: React.FC = () => {
    return (<div className="container">
        <h2><span className="bi bi-gear" /> Configuración</h2>
        <Tabs
            defaultActiveKey="Empresa"
            id="fill-tab-example"
            className="mb-3"
        >
            <Tab eventKey="Empresa" title="Empresa">
                <Company />
            </Tab>
            <Tab eventKey="Usuarios" title="Usuarios">
                <UserManagement />
            </Tab>
            <Tab eventKey="Medios" title="Medios de pago">
                <PaymentPage />
            </Tab>


        </Tabs>

    </div>);
}

export default Settings;