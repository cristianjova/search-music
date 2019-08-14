import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../layouts/Spinner';
import TrackContext from '../../context/tracks/tracksContext';

const InfoSingular = ({ match, history }) => {
  const trackContext = useContext(TrackContext);
  const [info, setInfo] = useState({});
  const { getInfo } = trackContext;

  useEffect(() => {
    let isSubscribed = true;
    getInfo(match.params.artist_name).then(res =>
      isSubscribed ? setInfo(res) : null
    );

    return () => (isSubscribed = false);
    //eslint-disable-next-line
  }, []);

  if (info.idArtist === undefined) return <Spinner />;
  return (
    <div className='row mt-2'>
      <div className='col-12'>
        <button
          className='btn btn-outline-primary'
          onClick={() => history.goBack()}
        >
          Volver
        </button>
        <h1 className='text-center'>{info.strArtist}</h1>
      </div>
      <div className='col-md-6'>
        <div className='card border'>
          <div className='card-body'>
            <img src={info.strArtistThumb} alt='Imagen Artista' />
            <p className='card-text'>Género: {info.strGenre}</p>
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
      </div>
      <div className='col-md-6 mt-sm-3 mt-md-0'>
        <h3 className='lyrics-title text-center'>Biógrafia</h3>
        <div className='card-body'>
          <p className='card-text text-justify'>
            {info.strBiographyES !== null
              ? info.strBiographyES
              : info.strBiographyEN}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSingular;
