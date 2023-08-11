import React, { useState } from 'react';
import { createUser } from '../../services/userAPI';

function Search() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleLoginSubmit = async () => {
    if (name.length >= 2) {
      setLoading(true);
      try {
        await createUser({ name });
        setLoading(false);
        // setSaved(true); // Ativar redirecionamento
      } catch (error) {
        console.error('Erro ao pesquisar banda', error);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h1>Pesquise a sua Banda</h1>
      <form>
        <label>
          Nome:
          <input
            type="text"
            value={ name }
            onChange={ handleNameChange }
            data-testid="search-artist-input"
          />
        </label>
        <button
          type="button"
          onClick={ handleLoginSubmit }
          disabled={ name.length < 2 || loading }
          data-testid="search-artist-button"
        >
          Procurar
        </button>
      </form>
    </div>
  );
}

export default Search;
