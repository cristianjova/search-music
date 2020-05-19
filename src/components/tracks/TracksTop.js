import React, { Fragment, useContext } from 'react';
import Spinner from '../layouts/Spinner';
import TrackItem from './TrackItem';

import TracksContext from '../../context/tracks/tracksContext';

const Tracks = ({ tracks }) => {
  const tracksContext = useContext(TracksContext);

  const { loading, top } = tracksContext;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <h3 className='text-center my-2 text-card-principal d-none d-sm-block'>
        Top 10 {top === 'Arg' ? 'Argentina' : 'Global'}
      </h3>
      <h4 className='text-center my-3 text-card-principal d-block d-sm-none'>
        Top 10 {top === 'Arg' ? 'Argentina' : 'Global'}
      </h4>
      <div className='row'>
        {tracks !== undefined &&
          tracks.map((item) => <TrackItem key={item.id} track={item} />)}
      </div>
    </Fragment>
  );
};

export default Tracks;
