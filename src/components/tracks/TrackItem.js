import React from 'react';
import { Link } from 'react-router-dom';

const TrackItem = props => {
  const { track } = props;
  return (
    <div className='col-md-6'>
      <div className='card mb-2 shadow-sm'>
        <div className='card-body'>
          <h5 className='card-title'>{track.artist_name}</h5>
          <p className='card-text text-card-principal'>
            <strong>
              <i className='fas fa-play' /> Track
            </strong>
            : {track.track_name}
            <br />
            <strong>
              <i className='fas fa-compact-disc' /> Album
            </strong>
            : {track.album_name}
          </p>
          <div className='row'>
            <div className='mx-auto'>
              <Link
                to={`lyrics/${track.commontrack_id}/${track.artist_name}/${
                  track.track_name
                }`}
                className='btn btn-primary'
              >
                <i className='fas fa-chevron-right' /> Ver Letra
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
