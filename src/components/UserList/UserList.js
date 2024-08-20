import React from 'react';
import UserItem from '../UserItem/UserItem'; 
import './UsertList.css'
function UserList({ users, onEditUser, onDeleteUser }) {
  return (
    <div className="user-list-container">
      <h2>Lista de Usuarios</h2>
      <ul className="user-list">
        {users.map(user => (
          <UserItem 
            key={user.id} 
            user={user} 
            onEdit={onEditUser} 
            onDelete={onDeleteUser} 
          />
        ))}
      </ul>
    </div>
  );
}

export default UserList;