import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getMusics, { Music } from '../../services/musicsAPI'; // Certifique-se de importar o tipo correto para a música
import LoadingMessage from '../../components/LoadingMessage';
import MusicCard from '../../components/MusicCard';
import { AlbumType, SongType } from '../../types';

export default function Album() {
  const { id } = useParams<{ id: string }>(); // Defina o tipo para o parâmetro "id"
  const [getAlbum, setGetAlbum] = useState<Music[]>([]); // Defina o tipo para o estado "getAlbum"
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

  async function fetch() {
    if (id) {
      const data = await getMusics(id);
      const [album, ...musics] = data;
      setShowInfo(album);
      settrack(musics);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  if (loading) return <LoadingMessage />;

  return (
    <>
      <h1>Página do álbum</h1>

      {loading && <LoadingMessage />}
      <p data-testid="album-name">
        { showInfo.collectionName}
        {' '}
      </p>

      <p data-testid="artist-name">
        { showInfo.artistName }
        {' '}
      </p>
      {track && track.map((music) => (
        <MusicCard
          key={ music.trackId }
          trackId={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
        />))}
    </>
  );
}
