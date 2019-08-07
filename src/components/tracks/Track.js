import React, { useEffect, useContext } from 'react';
import Lyrics from './Lyrics';
import Spinner from '../layouts/Spinner';

import TracksContext from '../../context/tracks/tracksContext';

const TrackLyrics = ({ match }) => {
  const tracksContext = useContext(TracksContext);

  const { getTrack, track, loading } = tracksContext;

  useEffect(() => {
    getTrack(match.params.id, match.params.artist, match.params.track);
    // eslint-disable-next-line
  }, []);

  const { artist_name, track_name, lyrics } = track;

  if (loading) return <Spinner />;

  return (
    <div className='row mt-4'>
      <div className='col-md-12'>
        <div className='col-md-6 offset-md-3'>
          <legend className='text-center'>
            {artist_name} - {track_name}
          </legend>
        </div>
      </div>
      <div className='col-md-6'>Info</div>
      <div className='col-md-6'>
        <Lyrics lyrics={lyrics} />
      </div>
    </div>
  );
};

export default TrackLyrics;
