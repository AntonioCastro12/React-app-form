import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers && storedUsers !== "[]") {
        setUsers(JSON.parse(storedUsers));
      } else {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/users');
          console.log('Respuesta de la API:', response.data);
          const initialUsers = response.data.map(user => ({
            id: user.id,
            name: user.name,  // Aseguramos que el campo sea 'name'
            email: user.email,  // Añadimos 'email'
            phone: user.phone,
            website: user.website // Añadimos 'website'
          }));
          setUsers(initialUsers);
          localStorage.setItem('users', JSON.stringify(initialUsers));
        } catch (error) {
          console.error('Error al obtener los usuarios del API:', error);
          alert('Hubo un problema al cargar los usuarios. Por favor, intenta de nuevo más tarde.');
        }
      }
    };
    
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const addUser = (user) => {
    const newUser = { ...user, id: Date.now() };
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setIsEditing(false);
    setEditingUser(null);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

  const startEditUser = (user) => {
    setIsEditing(true);
    setEditingUser(user);
  };

  return (
    <div className="app-container">
      <h1>Formulario Usuario</h1>
      <UserForm 
        addUser={addUser} 
        updateUser={updateUser} 
        isEditing={isEditing} 
        editingUser={editingUser} 
        cancelEdit={cancelEdit} 
      />
      {users.length > 0 ? (
        <UserList users={users} onEditUser={startEditUser} onDeleteUser={deleteUser} />
      ) : (
        <p>Cargando usuarios...</p>
      )}
    </div>
  );
}

export default App;