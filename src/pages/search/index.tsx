import './style.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import LoadingMessage from '../../components/LoadingMessage';

function Search() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [ocult, setHidden] = useState('');
  const [albums, setAlbums] = useState<Array<any>>([]); // Define o tipo correto para o estado albums
  const [artist, setArtist] = useState<string>(''); // Define o tipo correto para o estado artist
  const [noAlbumsFound, setNoAlbumsFound] = useState<boolean>(false); // Define o tipo correto para o estado noAlbumsFound

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    setArtist(newName);
  };

  const handleSearchButtonClick = () => {
    setName('');
  };

  const handleSearchChange = async () => {
    if (name.length >= 2) {
      handleSearchButtonClick();
      setLoading(true);
      setHidden('ocult');
      setNoAlbumsFound(false);

      try {
        const response = await searchAlbumsAPI(name);
        if (response.length === 0) {
          setNoAlbumsFound(true);
        } else {
          setAlbums(response);
        }
        setLoading(false);
      } catch (error) {
        console.error('Nenhum álbum foi encontrado', error);
        setLoading(false);
        setHidden('');
      }
    }
  };

  return (
    <div>
      <h1 className={ ocult }>Pesquise a sua Banda</h1>
      <form>
        <input
          placeholder="Nome do Artista"
          className={ ocult }
          type="text"
          value={ name }
          onChange={ handleNameChange }
          data-testid="search-artist-input"
        />
        <button
          className={ ocult }
          type="button"
          onClick={ handleSearchChange }
          disabled={ name.length < 2 || loading }
          data-testid="search-artist-button"
        >
          Procurar
        </button>
        {loading && <LoadingMessage />}
      </form>
      {albums.length > 0 && (
        <div>
          <p>
            Resultado de álbuns de:
            {' '}
            {artist}
          </p>
          <ul>
            {albums.map((album) => (
              <li key={ album.collectionId }>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  {album.collectionName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {albums.length === 0 && noAlbumsFound && (
        <p data-testid="no-albums-message">Nenhum álbum foi encontrado</p>
      )}
    </div>
  );
}

export default Search;
