import React, { useContext, useState, useEffect } from 'react';
import Spinner from '../layouts/Spinner';
import TrackItem from './TrackItem';
import Pagination from '../layouts/Pagination';

import TracksContext from '../../context/tracks/tracksContext';

const Tracks = ({ tracks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const tracksContext = useContext(TracksContext);
  const { search, loading } = tracksContext;

  useEffect(() => {
    setCurrentPage(1);
  }, [tracks]);

  if (loading) return <Spinner />;

  // Search - Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = tracks.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h3 className='text-black-50 text-center my-4 text-card-principal d-none d-sm-block'>
        {`Resultados para "${search}"`}
      </h3>
      <h4 className='text-black-50 text-center my-4 text-card-principal d-block d-sm-none'>
        {`Resultados para "${search}"`}
      </h4>
      {currentPosts.length === 0 ? (
        <div className='row'>
          <h3 className='text-center mx-auto text-danger'>Sin Resultados</h3>
        </div>
      ) : (
        <div className='row'>
          {currentPosts !== undefined &&
            currentPosts.map((item) => (
              <TrackItem key={item.id} track={item} />
            ))}
        </div>
      )}
      {tracks.length > 10 && (
        <Pagination
          postsPerPage={postPerPage}
          totalPosts={tracks.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </>
  );
};

export default Tracks;
