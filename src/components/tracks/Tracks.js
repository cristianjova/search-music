import React, { useContext, useEffect } from 'react';
import TracksContext from '../../context/tracks/tracksContext';

const Tracks = () => {
  const tracksContext = useContext(TracksContext);

  const { tracks_list, heading } = tracksContext;
  console.log(tracks_list);

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Tracks</h1>
    </div>
  );
};

export default Tracks;
