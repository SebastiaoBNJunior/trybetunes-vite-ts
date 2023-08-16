import { useState } from 'react';
import { SongType } from '../../types';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import './style.css';
import emptyHeart from '../../images/empty_heart.png';
import checkHeart from '../../images/checked_heart.png';

export default function MusicCard(musics: SongType) {
  const { trackId, trackName, previewUrl } = musics;
  // const emptyHeart = '/src/images/empty_heart.png';
  // const checkHeart = '/src/images/checked_heart.png';
  const [checked, setChecked] = useState(false);
  const [hearthred, setHeartRed] = useState(emptyHeart);
  const [favoriteMusic, setFavoriteMusic] = useState(false);

  async function isFavoriteMusic(prop: boolean) {
    setFavoriteMusic(prop);
    if (!favoriteMusic) {
      await addSong({ trackId, trackName, previewUrl });
    }
  }

  async function notFavoriteMusic(prop: boolean) {
    setFavoriteMusic(prop);
    if (favoriteMusic) {
      await removeSong({ trackId, trackName, previewUrl });
    }
  }

  function changeHeartColor() {
    if (!checked) {
      setChecked(true);
      isFavoriteMusic(true);
    } else {
      setChecked(false);
      notFavoriteMusic(false);
    }
  }

  return (
    <div key={ trackId }>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src="{previewUrl}" controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      <label data-testid={ `checkbox-music-${trackId}` }>
        <input className="favoriteHeart" onClick={ changeHeartColor } type="checkbox" />
        <img className="favoriteHeartRed" src={ hearthred } alt="favorite" />
      </label>
    </div>
  );
}
