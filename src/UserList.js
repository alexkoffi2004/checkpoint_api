import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [listOfUser, setListOfUser] = useState([]); // État pour stocker la liste des utilisateurs
  const [loading, setLoading] = useState(true); // État pour gérer le chargement des données
  const [error, setError] = useState(null); // État pour gérer les erreurs éventuelles

  // Utiliser useEffect pour charger les données au montage du composant
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setListOfUser(response.data); // Mettre à jour l'état avec les données reçues
        setLoading(false); // Changer l'état du chargement
      })
      .catch(error => {
        setError(error); // Enregistrer l'erreur
        setLoading(false); // Changer l'état du chargement
      });
  }, []); // Le tableau vide [] assure que le hook ne s'exécute qu'une fois

  // Affichage de l'interface
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul className='many_users'>
        {listOfUser.map(user => (
          <li key={user.id} className='on_user'>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>City: {user.address.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
