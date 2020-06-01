import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory();

  return (
    <div className='col-md-12' style={{ position: 'absolute', left: '1%' }}>
      <button
        onClick={() => history.goBack()}
        className='btn btn-outline-primary rounded-circle'
      >
        <i className='fas fa-long-arrow-alt-left'></i>
      </button>
      <Link to='/' className='btn btn-outline-primary rounded-circle ml-2'>
        <i className='fas fa-home'></i>
      </Link>
    </div>
  );
};

export default BackButton;
