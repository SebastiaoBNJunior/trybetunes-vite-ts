import { useState, useEffect } from 'react';
import { SongType } from '../../types';
import { addSong, removeSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';
import './style.css';
import emptyHeart from '../../images/empty_heart.png';
import checkHeart from '../../images/checked_heart.png';
import LoadingMessage from '../LoadingMessage';

export default function MusicCard(musics: SongType) {
  const { trackId, trackName, previewUrl } = musics;
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      const favoriteSongs = await getFavoriteSongs();
      setIsFavorite(favoriteSongs.some((sng) => sng.trackId === trackId));
      setLoading(false);
    };

    fetchFavoriteSongs();
  }, [trackId]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeSong({ trackId, trackName, previewUrl });
      console.log('Removed song from favorites');
    } else {
      await addSong({ trackId, trackName, previewUrl });
      console.log('Added song to favorites');
    }

    setIsFavorite(!isFavorite); // Toggle the favorite status
  };

  return (
    <div>
      {/* Exibe o nome da música */}
      <p>{trackName}</p>
      {/* Player de áudio que reproduz a prévia da música */}
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      {/* Exibe a mensagem de carregamento enquanto a requisição estiver em andamento */}
      {loading ? <LoadingMessage /> : null}
      {/* Input do tipo checkbox para marcar como favorito */}
      <label data-testid={ `checkbox-music-${trackId}` }>
        <input
          type="checkbox"
          checked={ isFavorite }
          onChange={ toggleFavorite }
        />
        {/* Exibe a imagem do coração preenchido ou vazio de acordo com o status de favorito */}
        <img
          src={ isFavorite ? checkHeart : emptyHeart }
          alt="favorite"
        />
      </label>
    </div>
  );
}
