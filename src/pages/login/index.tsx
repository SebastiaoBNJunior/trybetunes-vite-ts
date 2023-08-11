import React, { useState, useEffect } from 'react';
import { createUser } from '../../services/userAPI';

function Login() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false); // Estado para controlar o redirecionamento

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleLoginSubmit = async () => {
    if (name.length >= 3) {
      setLoading(true);

      try {
        await createUser({ name });
        setLoading(false);
        setSaved(true); // Ativar redirecionamento
      } catch (error) {
        console.error('Erro ao logar usuário', error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (saved) {
      window.location.href = '/search'; // Redirecionar após o salvamento
    }
  }, [saved]);

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Nome:
          <input
            type="text"
            value={ name }
            onChange={ handleNameChange }
            data-testid="login-name-input"
          />
        </label>
        <button
          type="button"
          onClick={ handleLoginSubmit }
          disabled={ name.length < 3 || loading }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
        {loading && <p>Carregando...</p>}
      </form>
    </div>
  );
}

export default Login;
