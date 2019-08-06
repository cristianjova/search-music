import React, { useContext } from 'react';
import Spinner from '../layouts/Spinner';

import TracksContext from '../../context/tracks/tracksContext';

const Tracks = () => {
  const tracksContext = useContext(TracksContext);

  const { track_list, heading, loading } = tracksContext;

  if (loading) return <Spinner />;

  return (
    <div>
      <h1>Tracks</h1>
    </div>
  );
};

export default Tracks;
