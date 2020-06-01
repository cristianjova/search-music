import React from 'react';
import { Link } from 'react-router-dom';

const TopTenArtist = ({ top }) => {
  return (
    <>
      <div className='py-2 mt-4'>
        <h4 className='text-center'>Más Escuchados</h4>
        <ul className='list-unstyled'>
          {top !== undefined &&
            top.map((item, index) => (
              <Link
                to={`/lyrics/${item.id}/${item.artist.name}/${item.title}`}
                className='btn btn-block btn-sm text-black-50 text-left'
                key={index}
              >
                <li className='media border-bottom text-black-50'>
                  <h6 className='mr-2'>
                    <span className='badge badge-secondary'>{index + 1}</span>
                  </h6>
                  <div className='media-body'>
                    <h6 className='mt-0 mb-1'>{item.title}</h6>
                  </div>
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </>
  );
};

export default TopTenArtist;
