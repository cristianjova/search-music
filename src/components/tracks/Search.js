import React, { useState, useContext } from 'react';
import TracksContext from '../../context/tracks/tracksContext';

const Search = () => {
  const tracksContext = useContext(TracksContext);

  const [trackTitle, setTrack] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    tracksContext.findTracks(trackTitle);
    setTrack('');
  };

  const onChange = (e) => setTrack(e.target.value);

  return (
    <div className='card card-body mt-2 p-3'>
      <h2 className='text-center font-weight-normal d-none d-sm-block'>
        Buscar Letra
      </h2>
      <h4 className='text-center font-weight-normal d-block d-sm-none'>
        Buscar Letra
      </h4>
      <p className='text-dark text-center d-none d-sm-block'>
        Obtene la letra de cualquier canción
      </p>
      <p
        className='text-dark text-center d-block d-sm-none'
        style={{ fontSize: '0.8rem' }}
      >
        Obtene la letra de cualquier canción
      </p>
      <form onSubmit={onSubmit}>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Nombre canción'
            aria-label='Nombre canción'
            aria-describedby='basic-addon2'
            value={trackTitle}
            onChange={onChange}
          />
          <div className='input-group-append'>
            <button
              className='input-group-text'
              id='basic-addon2'
              type='submit'
            >
              <i className='fas fa-search'></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
