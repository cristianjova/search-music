import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const PageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    PageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination justify-content-center d-none d-sm-flex'>
        {PageNumbers.map((number) => (
          <li
            key={number}
            className={
              currentPage === number ? 'page-item active' : 'page-item'
            }
          >
            <a onClick={() => paginate(number)} href='#!' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile */}
      <ul className='pagination pagination-sm justify-content-center d-flex d-sm-none'>
        {PageNumbers.map((number) => (
          <li
            key={number}
            className={
              currentPage === number ? 'page-item active' : 'page-item'
            }
          >
            <a onClick={() => paginate(number)} href='#!' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
