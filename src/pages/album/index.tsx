import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getMusics from '../../services/musicsAPI';
import LoadingMessage from '../../components/LoadingMessage';
import MusicCard from '../../components/MusicCard/MusicCard';
import { AlbumType, SongType } from '../../types';

export default function Album() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [track, settrack] = useState<SongType[]>([]);
  const [showInfo, setShowInfo] = useState<AlbumType>({
    artistId: 0,
    artistName: '',
    collectionId: 0,
    collectionName: '',
    collectionPrice: 0,
    artworkUrl100: '',
    releaseDate: '',
    trackCount: 0,
  });

  async function fetchAlbumData() {
    if (id) {
      const data = await getMusics(id);
      const [album, ...musics] = data;
      setShowInfo(album);
      settrack(musics);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAlbumData();
  }, [fetchAlbumData]); // Incluir fetchAlbumData no array de dependências

  if (loading) return <LoadingMessage />;

  return (
    <>
      <h1>Página do álbum</h1>
      <p data-testid="album-name">
        {showInfo.collectionName}
        {' '}
      </p>
      <p data-testid="artist-name">
        {showInfo.artistName}
        {' '}
      </p>
      {track.map((music) => (
        <MusicCard
          key={ music.trackId }
          trackId={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
        />
      ))}
    </>
  );
}
