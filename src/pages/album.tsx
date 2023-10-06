import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, SongType } from '../types';
import MusicCard from './musicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/loading';

function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState<AlbumType>();
  const [musics, setMusics] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMusics() {
      if (!id) return;
      const response = await getMusics(id);
      setAlbum(response[0]);
      const songs = response.slice(1)
        .filter((item): item is SongType => 'trackId' in item);
      setMusics(songs);
      setLoading(false);
    }

    fetchMusics();
  }, [id]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 data-testid="artist-name">{album?.artistName}</h1>
          <p data-testid="album-name">{album?.collectionName}</p>
          {musics.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Album;
