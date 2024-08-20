import React from 'react';
import 'UserItem.css';

function UserItem({ user, onEdit, onDelete }) {
  return (
    <li className="user-item">
      <span>{user.name}</span>
      <span>{user.email}</span>
      <span>{user.phone}</span>
      <span>{user.website}</span>
      <div className="actions">
        <button onClick={() => onEdit(user)}>Editar</button>
        <button onClick={() => onDelete(user.id)}>Eliminar</button>
      </div>
    </li>
  );
}

export default UserItem;