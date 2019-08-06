import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt='Cargando...'
        style={{ width: '100px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
};

export default Spinner;
