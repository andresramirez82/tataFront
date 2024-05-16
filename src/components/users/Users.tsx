import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUser } from 'functions/api';
import { Auth } from 'models/models';
import { formatDate } from 'functions/functios';
import Thumbnail from 'components/helpper/Thumbnail';

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

  return (
    <UserContainer>
      <Card className="card">
        {userData?.name && <Thumbnail name={userData?.name} />}
        <div className="card-body">
          <h5 className="card-title">{userData?.name  || 'nombre'} ({userData?.username})</h5>
          {userData?.lastlogin && (
            <p className="card-text text-center">
              {formatDate(userData?.lastlogin) || 'último acceso'}
            </p>
          )}
        </div>
      </Card>
    </UserContainer>
  );
};

export default User;