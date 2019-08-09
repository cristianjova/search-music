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
        <div className='card border-light'>
          <div className='card-header bg-primary text-light font-weight-bold'>
            Información Artista
          </div>
          <div className='card-body'>
            <img src={info.strArtistThumb} alt='Imagen Artista' />
            <p className='card-text'>Género: {info.strGenre}</p>
            <h3 className='card-text text-center lyrics-title'>Biografía</h3>
            <p className='card-text'>{info.strBiographyEN}</p>
            <p className='card-text'>
              {info.strFacebook !== null ? (
                <a
                  href={`https://${info.strFacebook}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-facebook-square social-icons' />
                </a>
              ) : null}

              {info.strTwitter !== null ? (
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
      )}
    </Fragment>
  );
};

export default Info;
