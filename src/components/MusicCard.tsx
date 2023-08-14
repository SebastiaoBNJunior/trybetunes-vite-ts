import { SongType } from '../types';

export default function MusicCard(musics: SongType) {
  const { trackId, trackName, previewUrl } = musics;
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
    </div>
  );
}
