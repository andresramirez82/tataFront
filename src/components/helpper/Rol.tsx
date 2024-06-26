import { UserRole } from "@models/user";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";

interface rolProps {
    id: string,
    onChange: (e: any) => void;
    selected: UserRole
}

const UserRoleSelect: React.FC<rolProps> = ({ id, onChange, selected }) => {
    const [value, setvalue] = useState<UserRole>()


    useEffect(() => {
        if (selected) {
            setvalue(selected)
        }
    }, [selected])

    return (
        <Form.Control
            id={id}
            as="select"
            value={value}
            onChange={onChange}
        >
            {Object.values(UserRole).map((role) => (
                <option key={role} value={role}>{role}</option>
            ))}
        </Form.Control>
    );
};

export default UserRoleSelect;