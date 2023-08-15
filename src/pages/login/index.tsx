import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import LoadingMessage from '../../components/LoadingMessage';

function Login() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleLoginSubmit = async () => {
    if (name.length >= 3) {
      setLoading(true);

      try {
        await createUser({ name });
        setSaved(true);
        navigate('/search');
        setLoading(false);
      } catch (error) {
        console.error('Erro ao logar usuário', error);
        setLoading(false);
      }
    }
  };

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
        {loading && <LoadingMessage />}
      </form>
      {saved && <Navigate to="/search" />}
    </div>
  );
}

export default Login;
