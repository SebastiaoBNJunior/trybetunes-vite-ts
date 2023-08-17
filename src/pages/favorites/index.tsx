import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import LoadingMessage from '../../components/LoadingMessage';
import MusicCard from '../../components/MusicCard/MusicCard';
import { SongType } from '../../types';

export default function Favorites() {
  const [loading, setLoading] = useState(true);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      const songs = await getFavoriteSongs();
      setFavoriteSongs(songs);
      setLoading(false);
    };
    fetchFavoriteSongs();
  }, [favoriteSongs]);

  // useEffect(() => {
  //   console.log(favoriteSongs);
  // }, [setFavoriteSongs]);

  return (
    <div>
      <ul>
        {loading ? <LoadingMessage /> : null}
        <p>Jorgim anjinho de Deus!</p>
        {favoriteSongs?.map((song) => (
          <li key={ song.trackId }>
            <MusicCard
              trackId={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
