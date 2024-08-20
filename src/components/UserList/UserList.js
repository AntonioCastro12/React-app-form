import React from 'react';
import './UsertList.css';


function UserList({ users, onEditUser, onDeleteUser }) {
  return (
    <div className="user-list-container">
      <h2>Lista de Usuarios</h2>
      {users.length > 0 ? (
        <table className="user-list-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>E-mail</th>
              <th>Teléfono</th>
              <th>Website</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td data-label="Nombre">{user.name}</td>
                <td data-label="E-mail">{user.email}</td>
                <td data-label="Teléfono">{user.phone}</td>
                <td data-label="Website">{user.website}</td>
                <td data-label="Acciones" className="actions">
                  <button className="edit" onClick={() => onEditUser(user)}>
                    <span className="icon">✏️</span> Editar
                  </button>
                  <button className="delete" onClick={() => onDeleteUser(user.id)}>
                    <span className="icon">🗑️</span> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}
    </div>
  );
}

export default UserList;