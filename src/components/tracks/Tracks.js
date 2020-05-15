import React, { Fragment, useContext, useEffect } from 'react';
import Spinner from '../layouts/Spinner';
import TrackItem from './TrackItem';

import TracksContext from '../../context/tracks/tracksContext';

const Tracks = () => {
  const tracksContext = useContext(TracksContext);

  const { track_list, heading, loading, getTopTen } = tracksContext;

  useEffect(() => {
    getTopTen();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <h3 className='text-center my-4 text-card-principal d-none d-sm-block'>
        {heading}
      </h3>
      <h4 className='text-center my-4 text-card-principal d-block d-sm-none font-weight-bold'>
        {heading}
      </h4>
      <div className='row'>
        {track_list !== undefined &&
          track_list.map((item) => (
            <TrackItem key={item.track.track_id} track={item} />
          ))}
      </div>
    </Fragment>
  );
};

export default Tracks;
