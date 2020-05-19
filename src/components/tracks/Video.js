import React, { useEffect, useContext, Fragment } from 'react';

import TracksContext from '../../context/tracks/tracksContext';

const Video = () => {
  const tracksContext = useContext(TracksContext);
  const { getVideo, video, track } = tracksContext;

  useEffect(() => {
    getVideo(track.track_title, track.artist_name);
    // eslint-disable-next-line
  }, [track]);

  return (
    <Fragment>
      {video !== null ? (
        <div className='embed-responsive embed-responsive-16by9 mb-4'>
          <iframe
            title='Title'
            className='embed-responsive-item'
            src={`https://www.youtube.com/embed/${
              video.id !== undefined ? video.id.videoId : null
            }?rel=0`}
            allowFullScreen
          />
        </div>
      ) : null}
    </Fragment>
  );
};

export default Video;
