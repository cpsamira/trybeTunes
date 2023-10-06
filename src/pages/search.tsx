import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlbumType } from '../types';
import Loading from '../components/loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

function Search() {
  const [artistName, setArtistName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [searchMessage, setSearchMessage] = useState<string>('');

  const handleSearch = async () => {
    if (artistName.length > 1) {
      const response = await searchAlbumsAPI(artistName);

      setIsLoading(true);
      setAlbums(response);

      try {
        setSearchMessage(response.length > 0
          ? `Resultado de álbuns de: ${artistName}`
          : 'Nenhum álbum foi encontrado');
      } catch (error) {
        console.error('Erro ao fazer a pesquisa:', error);
      } finally {
        setIsLoading(false);
        setArtistName('');
      }
    } else {
      setAlbums([]);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <form>
            <input
              type="text"
              placeholder="Digite o nome do artista"
              value={ artistName }
              data-testid="search-artist-input"
              onChange={ (e) => setArtistName(e.target.value) }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ artistName.length < 2 }
              onClick={ handleSearch }
            >
              Pesquisar
            </button>
          </form>

          {searchMessage && <p>{searchMessage}</p>}

          {albums.length > 0 && (
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
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
