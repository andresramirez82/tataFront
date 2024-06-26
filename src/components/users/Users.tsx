import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUser } from '../../functions/api';
import { Auth } from '../../models/models';
import { formatDate } from '../../functions/functios';
import Thumbnail from '../../components/helpper/Thumbnail';
import ResetPass from "./ResetPass";

const UserContainer = styled.div`
  margin-top: 5rem;
`;

const Card = styled.div`
  width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface UserProps {
  idUser: number;
}

const User: React.FC<UserProps> = ({ idUser }) => {
  const [userData, setUserData] = useState<Auth.AuthUser>();
  const [whowReset, setwhowReset] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(idUser);
        setUserData(user);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    fetchData();
  }, [idUser]);

  const onClose = () => {
    setwhowReset(false)
  }

  return (
    <UserContainer>
      {userData?.id && <ResetPass idUser={userData?.id} show={whowReset} onHide={onClose} />}
      <Card className="card">
        {userData?.name && <Thumbnail name={userData?.name} />}
        <div className="card-body">
          <h5 className="card-title">{userData?.name || 'nombre'} ({userData?.username})</h5>
          {userData?.lastlogin && (
            <p className="card-text text-center">
              {formatDate(userData?.lastlogin) || 'último acceso'}
            </p>
          )}
        </div>
        <button className="btn btn-secondary" onClick={() => setwhowReset(true)}>
          <i className="bi bi-lock'"></i> Reset Password
        </button>
      </Card>
    </UserContainer>
  );
};

export default User;