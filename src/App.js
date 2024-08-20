import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          const initialUsers = response.data.map(user => ({
            ...user,
            id: user.id 
          }));
          setUsers(initialUsers);
          localStorage.setItem('users', JSON.stringify(initialUsers));
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    const newUser = {
      ...user,
      id: Date.now() 
    };
    setUsers([...users, newUser]);
  };

  const editUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="app-container">
      <h1>User Management</h1>
      <UserForm addUser={addUser} userToEdit={editingUser} /> 
      <UserList users={users} onEditUser={setEditingUser} onDeleteUser={deleteUser} /> 
    </div>
  );
}

export default App;