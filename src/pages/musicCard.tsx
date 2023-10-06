import { useState } from 'react';

type CardProps = {
  trackName: string,
  previewUrl: string,
  trackId: number,
};

function MusicCard({ trackName, previewUrl, trackId }:CardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>

      <p>{trackName}</p>

      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
        .
      </audio>

      <label data-testid={ `checkbox-music-${trackId}` }>

        <input
          type="checkbox"
          checked={ isFavorite }
          onChange={ handleFavorite }
        />

        <img
          src={ isFavorite ? '/src/images/checked_heart.png'
            : '/src/images/empty_heart.png' }
          alt="favorite"
        />

      </label>

    </div>
  );
}

export default MusicCard;
