import { useState } from 'react';
import { SongType } from '../../types';
import './style.css';

export default function MusicCard(musics: SongType) {
  const { trackId, trackName } = musics;
  const emptyHeart = '/src/images/empty_heart.png';
  const checkHeart = '/src/images/checked_heart.png';
  const [hearthred, setHeartRed] = useState(emptyHeart);

  function changeHeartColor() {
    if (hearthred === emptyHeart) {
      setHeartRed(checkHeart);
    } else {
      setHeartRed(emptyHeart);
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
