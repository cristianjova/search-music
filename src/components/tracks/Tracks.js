import React, { Fragment, useContext } from 'react';
import Spinner from '../layouts/Spinner';
import TrackItem from './TrackItem';

import TracksContext from '../../context/tracks/tracksContext';

const Tracks = () => {
  const tracksContext = useContext(TracksContext);

  const { track_list, heading, loading } = tracksContext;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <h3 className='text-center my-4'>{heading}</h3>
      <div className='row'>
        {track_list.map(item => (
          <TrackItem key={item.track.track_id} track={item.track} />
        ))}
      </div>
    </Fragment>
  );
};

export default Tracks;
