import React, { useEffect, useContext } from 'react';
import Lyrics from './Lyrics';
import Video from './Video';
import Info from './Info';
import Spinner from '../layouts/Spinner';

import TracksContext from '../../context/tracks/tracksContext';
import TopTenArtist from './TopTenArtist';
import MobileMenuButton from '../layouts/FloatButton';

const TrackLyrics = ({ match }) => {
  const tracksContext = useContext(TracksContext);

  const { getTrack, getVideo, track, video, loading } = tracksContext;

  useEffect(() => {
    getTrack(match.params.id, match.params.artist, match.params.track);
    getVideo(match.params.track, match.params.artist);
    // eslint-disable-next-line
  }, [match.params.id, match.params.artist, match.params.track]);

  if (loading) return <Spinner />;

  return (
    <>
      <div className='row mt-2'>
        <div className='col-md-8 offset-md-2'>
          <div className='col-md-12 my-4'>
            <h2 className='text-center'>{track.track_title}</h2>
          </div>
        </div>
        <div className='col-sm-12 col-md-6 col-log-6'>
          <div className='d-block d-sm-none d-none d-sm-block d-md-none'>
            <Video video={video} />
          </div>
          <Lyrics track={track} />
        </div>
        <div className='col-sm-12 col-md-6 col-lg-6'>
          <div className='d-none d-sm-none d-sm-none d-md-block'>
            <Video video={video} />
          </div>
          <TopTenArtist top={track.topTen} />
          <Info />
        </div>
      </div>
      <MobileMenuButton />
    </>
  );
};

export default TrackLyrics;
