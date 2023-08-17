import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../../services/userAPI';
import { UserType } from '../../../types';
import LoadingMessage from '../../../components/LoadingMessage';

export default function ProfileEditPage() {
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  // Hook para navegação
  const navigate = useNavigate();

  // Efeito para buscar os dados do usuário ao carregar o componente
  useEffect(() => {
    // Função assíncrona para buscar os dados do usuário
    async function fetchProfile() {
      setIsLoading(true); // Inicia o carregamento

      try {
        const userData = await getUser(); // Chama a API para obter os dados do usuário
        setFormData(userData); // Atualiza o estado com os dados do usuário
      } catch (error) {
        console.error('Error fetching user data:', error); // Trata erros durante a busca
      } finally {
        setIsLoading(false); // Indica que o carregamento foi concluído (sucesso ou erro)
      }
    }

    fetchProfile(); // Chama a função para buscar os dados quando o componente é montado
  }, []);

  // Função para atualizar os campos do formulário
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para verificar se o formulário é válido
  const isFormValid = () => {
    const { name, email, image, description } = formData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return name && email && emailPattern.test(email) && image && description;
  };

  // Função para lidar com o salvamento das alterações
  const handleSave = async () => {
    if (!isFormValid()) {
      return; // Retorna se o formulário não for válido
    }

    setIsLoading(true); // Inicia o carregamento

    try {
      await updateUser(formData); // Chama a API para atualizar os dados do usuário
      navigate('/profile'); // Navega para a página de exibição de perfil
    } catch (error) {
      console.error('Error updating user data:', error); // Trata erros durante a atualização
    } finally {
      setIsLoading(false); // Indica que o carregamento foi concluído (sucesso ou erro)
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingMessage />
      ) : (
        <form>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={ formData.name }
              onChange={ handleInputChange }
              data-testid="edit-input-name"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={ formData.email }
              onChange={ handleInputChange }
              data-testid="edit-input-email"
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              name="description"
              value={ formData.description }
              onChange={ handleInputChange }
              data-testid="edit-input-description"
            />
          </label>
          <label>
            Imagem:
            <input
              type="text"
              name="image"
              value={ formData.image }
              onChange={ handleInputChange }
              data-testid="edit-input-image"
            />
          </label>
          <button
            type="button"
            onClick={ handleSave }
            disabled={ !isFormValid() }
            data-testid="edit-button-save"
          >
            Salvar
          </button>
        </form>
      )}
    </div>
  );
}
