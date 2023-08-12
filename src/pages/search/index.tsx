import './style.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import LoadingMessage from '../../components/LoadingMessage';

function Search() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState('');
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState('');
  const [noAlbumsFound, setNoAlbumsFound] = useState(false);

  const handleNameChange = (event) => {
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
      setHidden('hidden');
      setNoAlbumsFound(false); // Reset the noAlbumsFound state

      try {
        const response = await searchAlbumsAPI(name);
        if (response.length === 0) {
          setNoAlbumsFound(true); // Set noAlbumsFound state if no albums were found
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
      <h1 className={ hidden }>Pesquise a sua Banda</h1>
      <form>
        <input
          placeholder="Nome do Artista"
          className={ hidden }
          type="text"
          value={ name }
          onChange={ handleNameChange }
          data-testid="search-artist-input"
        />
        <button
          className={ hidden }
          type="button"
          onClick={ handleSearchChange }
          disabled={ name.length < 2 || loading }
          data-testid="search-artist-button"
        >
          Procurar
        </button>
        {loading && <LoadingMessage />}
      </form>
      {albums.length > 0 ? (
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
      ) : noAlbumsFound ? (
        <p>Nenhum álbum foi encontrado</p>
      ) : null}
    </div>
  );
}

export default Search;
