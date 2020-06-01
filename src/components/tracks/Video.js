import React, { useContext, Fragment } from 'react';

import TracksContext from '../../context/tracks/tracksContext';

const Video = ({ video }) => {
  const tracksContext = useContext(TracksContext);
  const { track } = tracksContext;

  return (
    <Fragment>
      {video !== null ? (
        <div className='embed-responsive embed-responsive-16by9 mb-4'>
          <iframe
            title={track.track_title}
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
