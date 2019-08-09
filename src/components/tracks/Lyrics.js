import React, { Fragment } from 'react';

const Lyrics = ({ track }) => {
  const { track_name, lyrics, album_name, music_genre, explicit } = track;

  return (
    <Fragment>
      <h4 className='lyrics-title'>
        {track_name}
        <br />
        <span className='text-secondary'>
          <strong>
            <i className='fas fa-compact-disc' /> Album
          </strong>
          : {album_name}
          <br />
          <strong>
            <i className='fas fa-music' /> Genero
          </strong>
          : {music_genre !== null ? music_genre : 'No disponible'}
          <br />
          <strong>
            <i className='fas fa-comment-slash' /> Palabras explicitas
          </strong>
          : {explicit === 0 ? 'No' : 'Si'}
        </span>
      </h4>
      {lyrics !== null ? (
        <p className='lyrics'>{lyrics}</p>
      ) : (
        <p>Letra no disponible</p>
      )}
    </Fragment>
  );
};

export default Lyrics;
