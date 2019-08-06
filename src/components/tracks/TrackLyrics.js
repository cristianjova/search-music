import React, { useEffect, useContext } from 'react';

import TracksContext from '../../context/tracks/tracksContext';

const TrackLyrics = ({ match }) => {
  const tracksContext = useContext(TracksContext);

  const { getTrack } = tracksContext;

  useEffect(() => {
    getTrack(match.params.id);
    // getLyrics(match.params.login);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Lyrics</h1>
    </div>
  );
};

export default TrackLyrics;
