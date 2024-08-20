import React, { useState, useEffect } from 'react';
import './UseForm.css';

function UserForm({ addUser, updateUser, isEditing, editingUser, cancelEdit }) {
  const [user, setUser] = useState({ 
    name: '', 
    email: '', 
    website: '',
    phone: ''
  });

  useEffect(() => {
    if (isEditing && editingUser) {
      setUser({
        name: editingUser.name || '', 
        email: editingUser.email || '', 
        website: editingUser.website || '',
        phone:  editingUser.phone || ''
      });
    } else {
      setUser({ 
        name: '', 
        email: '', 
        website: '',
        phone: ''
      });
    }
  }, [isEditing, editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateUser(user);
    } else {
      addUser(user);
    }
    setUser({ 
      name: '', 
      email: '', 
      website: '',
      phone: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="E-mail"
        required
      />
      <input
        type="text"
        name="website"
        value={user.website}
        onChange={handleChange}
        placeholder="Website"
        required
      />
      <input 
        type="text" 
        name="phone" 
        value={user.phone}
        onChange={handleChange} 
        placeholder="Phone" 
        required 
      />
      <button type="submit">{isEditing ? 'Actualizar Usuario' : 'Agregar Usuario'}</button>
      {isEditing && <button type="button" onClick={cancelEdit}>Cancelar</button>}
    </form>
  );
}

export default UserForm;