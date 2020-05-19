import React, { useContext, useEffect } from 'react';
import TracksTop from '../tracks/TracksTop';
import TracksSearch from '../tracks/TracksSearch';
import Search from '../tracks/Search';

import TrackContext from '../../context/tracks/tracksContext';

const Index = () => {
  const trackContext = useContext(TrackContext);
  const { track_list, getTopTen, top } = trackContext;

  useEffect(() => {
    if (track_list.length === 0) {
      getTopTen(top);
    }
    // eslint-disable-next-line
  }, [top]);

  return (
    <>
      <Search />
      {track_list.length === 10 &&
      track_list[0] !== undefined &&
      track_list[0].position !== undefined ? (
        <TracksTop tracks={track_list} />
      ) : (
        <TracksSearch tracks={track_list} />
      )}
    </>
  );
};

export default Index;
