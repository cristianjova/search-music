import React, { useState, useContext } from 'react';
import TracksContext from '../../context/tracks/tracksContext';

const Search = () => {
  const tracksContext = useContext(TracksContext);

  const { findTracks, setTopTen, getTopTen, track_list, top } = tracksContext;

  const [trackTitle, setTrack] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    findTracks(trackTitle);
    setTrack('');
  };

  const onChange = (e) => setTrack(e.target.value);

  const onClick = (key) => () => {
    setTopTen(key);
    getTopTen(key);
  };

  return (
    <>
      <div className='card card-body mt-2 p-3'>
        <h2 className='text-center d-none d-sm-block'>Buscar Letras</h2>
        <h4 className='text-center d-block d-sm-none'>Buscar Letras</h4>
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
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Nombre canción o artista'
              aria-label='Nombre canción'
              aria-describedby='basic-addon2'
              value={trackTitle}
              onChange={onChange}
              required
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
      <div className='btn-toolbar mt-2'>
        <div className='btn-group mr-2' role='group'>
          <button
            type='button'
            className='btn btn-outline btn-outline-light'
            onClick={onClick('Arg')}
            style={{ color: '#212529' }}
            disabled={
              track_list[0] !== undefined &&
              track_list[0].position !== undefined &&
              top === 'Arg'
                ? true
                : false
            }
          >
            <i className='fab fa-hotjar'></i> Argentina
          </button>
        </div>
        <div className='btn-group' role='group'>
          <button
            type='button'
            className='btn btn-outline btn-outline-light'
            onClick={onClick('Glo')}
            style={{ color: '#212529' }}
            disabled={
              track_list[0] !== undefined &&
              track_list[0].position !== undefined &&
              top === 'Glo'
                ? true
                : false
            }
          >
            <i className='fab fa-hotjar'></i> Global
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
