import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import LoadingMessage from '../../components/LoadingMessage';

export default function ProfilePage() {
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Estado para armazenar os dados do usuário
  const [userData, setUserData] = useState<UserType>();

  // Efeito para buscar os dados do usuário ao carregar o componente
  useEffect(() => {
    // Função assíncrona para buscar os dados do usuário
    async function fetchUserData() {
      setIsLoading(true); // Inicia o carregamento

      try {
        const user = await getUser(); // Chama a API para obter os dados do usuário
        setUserData(user); // Atualiza o estado com os dados do usuário
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error); // Trata erros durante a busca
      } finally {
        setIsLoading(false); // Indica que o carregamento foi concluído (sucesso ou erro)
      }
    }

    fetchUserData(); // Chama a função para buscar os dados quando o componente é montado
  }, []); // A dependência vazia faz com que o efeito seja executado apenas uma vez

  return (
    <div>
      {isLoading ? ( // Verifica se os dados estão sendo carregados
        <LoadingMessage />
      ) : (
        <div>
          <p>{userData?.name}</p>
          {' '}
          {/* Exibe o nome do usuário */}
          <p>{userData?.email}</p>
          {' '}
          {/* Exibe o email do usuário */}
          <p>{userData?.description}</p>
          {' '}
          {/* Exibe a descrição do usuário */}
          <img src={ userData?.image } alt="Profile" data-testid="profile-image" />
          {' '}
          {/* Exibe a imagem de perfil do usuário */}
          <NavLink to="/profile/edit">Editar perfil</NavLink>
          {' '}
          {/* Link para a página de edição de perfil */}
        </div>
      )}
    </div>
  );
}
