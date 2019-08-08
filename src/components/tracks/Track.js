import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Lyrics from './Lyrics';
import Info from './Info';
import Spinner from '../layouts/Spinner';

import TracksContext from '../../context/tracks/tracksContext';

const TrackLyrics = ({ match }) => {
  const tracksContext = useContext(TracksContext);

  const { getTrack, track, loading } = tracksContext;

  useEffect(() => {
    getTrack(match.params.id, match.params.artist, match.params.track);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className='row mt-2'>
      <Link to='/' className='btn btn-outline-primary'>
        Volver
      </Link>
      <div className='col-md-12'>
        <div className='col-md-6 offset-md-3 mb-4'>
          <h3 className='text-center'>{track.artist_name}</h3>
        </div>
      </div>
      <div className='col-md-6'>
        <Info artist={track.artist_name} />
      </div>
      <div className='col-md-6'>
        <Lyrics track={track} />
      </div>
    </div>
  );
};

export default TrackLyrics;
