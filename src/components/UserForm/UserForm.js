import React, { useState, useEffect } from 'react';
import './UseForm.css'; 

function UserForm({ addUser, userToEdit, editUser }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    }
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData(userToEdit);
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userToEdit) {
      editUser({ ...formData });
    } else {
      addUser(formData);
    }

    setFormData({
      name: '',
      username: '',
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
       
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Información Personal</h3>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </div>

      <h3>Dirección</h3>
      <div>
        <label htmlFor="address.street">Calle:</label>
        <input 
          type="text" 
          id="address.street" 
          name="address.street" 
          value={formData.address.street} 
          onChange={handleChange} 
          required 
        />
      </div>
  
      <div>
        <label htmlFor="address.city">Ciudad:</label>
        <input 
          type="text" 
          id="address.city" 
          name="address.city" 
          value={formData.address.city} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label htmlFor="address.zipcode">Código Postal:</label>
        <input 
          type="text" 
          id="address.zipcode" 
          name="address.zipcode" 
          value={formData.address.zipcode} 
          onChange={handleChange} 
          required 
        />
      </div>

      <h3>Contacto</h3>
      <div>
        <label htmlFor="email">E-mail:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </div>

      <button type="submit">{userToEdit ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
}

export default UserForm;