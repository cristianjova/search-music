import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <div className='mt-5'>
      <img
        src={spinner}
        alt='Cargando...'
        style={{
          width: '100px',
          margin: '100px auto auto auto',
          display: 'block'
        }}
      />
    </div>
  );
};

export default Spinner;
