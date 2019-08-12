import React, { useContext, useEffect, useState, Fragment } from 'react';
import TrackContext from '../../context/tracks/tracksContext';

const Info = () => {
  const trackContext = useContext(TrackContext);
  const [info, setInfo] = useState({});
  const { track, getInfo } = trackContext;

  useEffect(() => {
    let isSubscribed = true;
    getInfo(track.artist_name).then(res =>
      isSubscribed ? setInfo(res) : null
    );

    return () => (isSubscribed = false);
    //eslint-disable-next-line
  }, [track]);

  return (
    <Fragment>
      {info === null ? (
        <div className='card border-light'>
          <div className='card-header bg-primary text-light font-weight-bold'>
            Información Artista
          </div>
          <div className='card-body'>
            <p className='card-text'>No Disponible</p>
          </div>
        </div>
      ) : (
        <div>
          <div className='card border-light d-none d-md-block'>
            <div className='card-header bg-primary text-light font-weight-bold'>
              Información Artista
            </div>
            <div className='card-body'>
              <img src={info.strArtistThumb} alt='Imagen Artista' />
              <p className='card-text'>Género: {info.strGenre}</p>
              <h3 className='card-text text-center lyrics-title'>Biografía</h3>
              <p className='card-text'>
                {info.strBiographyES !== null
                  ? info.strBiographyES
                  : info.strBiographyEN}
              </p>
              <p className='card-text'>
                {info.strFacebook !== '' ? (
                  <a
                    href={`https://${info.strFacebook}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-facebook-square social-icons' />
                  </a>
                ) : null}

                {info.strTwitter !== '' ? (
                  <a
                    href={`https://${info.strTwitter}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-twitter-square social-icons' />
                  </a>
                ) : null}

                {info.strLastFMChart !== null ? (
                  <a
                    href={`${info.strLastFMChart}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-lastfm-square social-icons' />
                  </a>
                ) : null}
              </p>
            </div>
          </div>

          <div className='border-ligth media position-relative border mb-4 p-2 d-md-none'>
            <div>
              <img
                src={info.strArtistThumb}
                className='img-fluid mr-3 p-2'
                style={{ maxWidth: '8rem' }}
                alt='Imagen Artista'
              />
              <br />
              <span className='p-2'>
                {info.strFacebook !== '' ? (
                  <a
                    href={`https://${info.strFacebook}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-facebook-square social-icons-mobile' />
                  </a>
                ) : null}
                {info.strTwitter !== '' ? (
                  <a
                    href={`https://${info.strTwitter}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-twitter-square social-icons-mobile' />
                  </a>
                ) : null}
                {info.strLastFMChart !== null ? (
                  <a
                    href={`${info.strLastFMChart}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-lastfm-square social-icons-mobile' />
                  </a>
                ) : null}
              </span>
            </div>
            <div className='media-body'>
              <h5 className='mt-0'>Información Artista</h5>
              <small className='text-lines-5'>
                {info.strBiographyES !== null
                  ? info.strBiographyES
                  : info.strBiographyEN}
              </small>
              {/* <br /> */}
              <a href='#' className=''>
                Ver Más
              </a>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Info;
