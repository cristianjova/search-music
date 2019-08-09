import React, { useState, useContext } from 'react';
import TracksContext from '../../context/tracks/tracksContext';

const Search = () => {
  const tracksContext = useContext(TracksContext);

  const [trackTitle, setTrack] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    tracksContext.findTracks(trackTitle);
    setTrack('');
  };

  const onChange = e => setTrack(e.target.value);

  return (
    <div className='card card-body mt-2 p-3'>
      <h1 className='display-4 text-center'>
        <i className='fas fa-music' /> Buscar Canción
      </h1>
      <p className='leax text-center'>Obtene la letra de cualquier canción</p>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Titulo canción...'
            name='trackTitle'
            value={trackTitle}
            onChange={onChange}
          />
        </div>
        <button className='btn btn-primary btn-lg btn-block mb-2' type='submit'>
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Search;
