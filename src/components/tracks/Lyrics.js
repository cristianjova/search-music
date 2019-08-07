import React, { Fragment } from 'react';

const Lyrics = ({ lyrics }) => {
  return (
    <Fragment>
      <h4 className='lyrics-title'>Letra Canción</h4>
      <p className='lyrics'>{lyrics}</p>
    </Fragment>
  );
};

export default Lyrics;
