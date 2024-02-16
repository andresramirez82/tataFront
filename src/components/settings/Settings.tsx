import UserManagement from "components/users/UserManagement";
import PaymentPage from "components/payment/PaymentPage";


const Settings: React.FC = () => {
    return (<div className="container">
        <div className="row mt-3">
            <div className="col-md-6">
                <UserManagement/>
            </div>
            <div className="col-md-6">
                <PaymentPage/>
            </div>
        </div>
    </div>);
}

export default Settings;