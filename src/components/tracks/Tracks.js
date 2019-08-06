import React, { useContext } from 'react';
import TracksContext from '../../context/tracks/tracksContext';

const Tracks = () => {
  const tracksContext = useContext(TracksContext);

  const { track_list, heading } = tracksContext;

  return (
    <div>
      <h1>Tracks</h1>
    </div>
  );
};

export default Tracks;
