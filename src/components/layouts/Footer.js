import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-light p-3 mt-4' style={{ height: '85px' }}>
      <div className='container'>
        <div className='text-center'>
          <div className='col-12'>
            <a
              href='https://github.com/cristianjova'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary'
            >
              <i className='fab fa-github fa-2x mr-2'></i>
            </a>
            <a
              href='https://twitter.com/cristian_jova13'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary'
            >
              <i className='fab fa-twitter fa-2x mr-2'></i>
            </a>
            <a
              href='https://www.linkedin.com/in/cristian-jovanovich/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary'
            >
              <i className='fab fa-linkedin fa-2x'></i>
            </a>
          </div>
          <div className='col-12 mt-2'>
            <span className='mb-2 font-weight-bold text-primary'>
              Cristian Jovanovich - &copy; 2020
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
