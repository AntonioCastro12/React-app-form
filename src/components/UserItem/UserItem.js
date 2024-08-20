import React from 'react';

function UserItem({ user, onEdit, onDelete }) {
  return (
    <li>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Dirección: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
      <button onClick={() => onEdit(user)}>Editar</button>
      <button onClick={() => onDelete(user.id)}>Eliminar</button>
    </li>
  );
}

export default UserItem; 