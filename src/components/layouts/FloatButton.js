import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenuButton = () => {
  return (
    <>
      <Link to='/' className='float-btn btn btn-primary rounded-circle'>
        <i className='fas fa-home fa-lg mt-2'></i>
      </Link>
    </>
  );
};

export default MobileMenuButton;
