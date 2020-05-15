import React from 'react';
import { Link } from 'react-router-dom';
import notImage from '../../images/not-image.webp';

const TrackItem = (props) => {
  const { track } = props;

  return (
    <div className='col-md-6'>
      <ul className='list-unstyled'>
        <Link
          to={`lyrics/${track.track.commontrack_id}/${track.track.artist_name}/${track.track.track_name}`}
          className='btn btn-block'
        >
          <li className='media border border-light'>
            <div className='media-body p-1 p-sm-3'>
              <h5 className='mt-0 mb-1 text-left'>{track.track.artist_name}</h5>
              <div className='text-card-principal mb-3 text-left'>
                <span>
                  <strong className='text-secondary'>
                    <i className='fas fa-play text-secondary' /> Track:
                  </strong>{' '}
                  {track.track.track_name}
                </span>
                <br />
                <span>
                  <strong className='text-secondary'>
                    <i className='fas fa-compact-disc text-secondary' /> Album:
                  </strong>{' '}
                  {track.track.album_name}
                </span>
                <br />
                <span>
                  <strong className='text-secondary'>
                    <i class='fab fa-hotjar'></i> Ranking:
                  </strong>{' '}
                  {track.position}
                </span>
              </div>
            </div>
            <img
              src={track.image === '' ? notImage : track.image}
              alt='Cover Album'
              className='align-self-center d-none d-sm-block'
            />
            <img
              src={track.image === '' ? notImage : track.image}
              alt='Cover Album'
              className='align-self-center d-block d-sm-none'
              style={{ width: '40%' }}
            />
          </li>
        </Link>
      </ul>
    </div>
  );

  // return (
  //   <div className='col-md-6'>
  //     <div className='border-ligth media position-relative border mb-2 py-3 shadow-sm'>
  //       <div>
  //         <img
  //           src={track.image === '' ? notImage : track.image}
  //           className='img-fluid mr-3 p-2'
  //           style={{ maxWidth: '8rem', height: '10rem' }}
  //           alt='Cover Album'
  //         />
  //       </div>

  //       <div className='media-body p-2'>
  //         <h5 className='card-title d-none d-sm-block'>
  //           {track.track.artist_name}
  //         </h5>
  //         <div className='text-card-principal mb-3'>
  //           <span className='text-lines-1 mb-2 d-none d-sm-block'>
  //             <strong className='text-secondary'>
  //               <i className='fas fa-play text-secondary' /> Track:
  //             </strong>{' '}
  //             {track.track.track_name}
  //           </span>
  //           <span className='text-lines-1 d-none d-sm-block'>
  //             <strong className='text-secondary'>
  //               <i className='fas fa-compact-disc text-secondary' /> Album:
  //             </strong>{' '}
  //             {track.track.album_name}
  //           </span>
  //           {/* Mobile  */}
  //           <h6 className='card-title d-block d-sm-none font-weight-bold'>
  //             {track.track.artist_name}
  //           </h6>
  //           <span className='d-block d-sm-none'>
  //             <strong className='text-secondary'>
  //               <i className='fas fa-play text-secondary' /> Track:
  //             </strong>{' '}
  //             {track.track.track_name}
  //           </span>
  //           <span className='d-block d-sm-none'>
  //             <strong className='text-secondary'>
  //               <i className='fas fa-compact-disc text-secondary' /> Album:
  //             </strong>{' '}
  //             {track.track.album_name}
  //           </span>
  //           {/* End Mobile versions */}
  //         </div>

  //         <Link
  //           to={`lyrics/${track.track.commontrack_id}/${track.track.artist_name}/${track.track.track_name}`}
  //           className='btn btn-primary btn-block col-12'
  //         >
  //           <i className='fas fa-chevron-right' /> Ver Letra
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default TrackItem;
