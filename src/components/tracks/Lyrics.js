import React from 'react';

const Lyrics = ({ track }) => {
  const {
    artist_name,
    lyrics,
    album_name,
    explicit_content_lyrics,
    release_date,
  } = track;

  return (
    <>
      <h4 className='lyrics-title'>
        {artist_name}
        <br />
        <span className='text-secondary'>
          <strong>
            <i className='fas fa-compact-disc' /> Album
          </strong>
          : {album_name}
          <br />
          <strong>
            <i className='fas fa-calendar-alt' /> Fecha de lanzamiento
          </strong>
          : {release_date}
          <br />
          <strong>
            <i className='fas fa-comment-slash' /> Palabras explicitas
          </strong>
          : {explicit_content_lyrics === 0 ? 'No' : 'Si'}
        </span>
      </h4>
      {lyrics !== null ? (
        <div className='lyrics'>{lyrics}</div>
      ) : (
        <p>Letra no disponible</p>
      )}
    </>
  );
};

export default Lyrics;
