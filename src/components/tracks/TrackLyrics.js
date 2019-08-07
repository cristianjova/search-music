import React, { useEffect, useContext } from 'react';

import TracksContext from '../../context/tracks/tracksContext';

const TrackLyrics = ({ match }) => {
  const tracksContext = useContext(TracksContext);

  const { getTrack, track } = tracksContext;

  useEffect(() => {
    getTrack(match.params.id, match.params.artist, match.params.track);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Lyrics</h1>
    </div>
  );
};

export default TrackLyrics;
