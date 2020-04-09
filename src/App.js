import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleGetRepositories() {
    try {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }catch (error) {
      console.error(error);
    }
  }
  useEffect(() => { handleGetRepositories();  
  }, []);

  async function handleAddRepository() {
    try {
      const repository = {
        title: 'Desafio 03 ReactJS',
        url: 'github.com/brunoxsouza/conceitos-reactjs',
        techs: ['Node.js', 'React'],
      };

      const response = await api.post('/repositories', repository);

      setRepositories([...repositories, response.data]);
    } catch (error) {
      console.error(error);
    }
}

  async function handleRemoveRepository(id) {
    try {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  } catch (error) {
    console.error(error);
  }
}

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
      </>
  );
    }

export default App;
