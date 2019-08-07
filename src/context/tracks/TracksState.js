import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import TracksContext from './tracksContext';
import TracksReducer from './tracksReducer';
import { GET_TOP_TEN, SET_LOADING, GET_TRACK } from '../types';

const TracksState = props => {
  const initialState = {
    track_list: [],
    heading: 'Top 10 Canciones',
    loading: false,
    track: {},
    lyrics: {}
  };

  const [state, dispatch] = useReducer(TracksReducer, initialState);

  useEffect(() => {
    getTopTen();
    // eslint-disable-next-line
  }, []);

  const getTopTen = async () => {
    setLoading();

    const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
        process.env.REACT_APP_MM_KEY
      }`
    );

    dispatch({
      type: GET_TOP_TEN,
      payload: res.data.message.body.track_list
    });
  };

  const getTrack = async (id, artist, track) => {
    setLoading();

    // API for track info
    const resM = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?commontrack_id=${id}&apikey=${
        process.env.REACT_APP_MM_KEY
      }`
    );

    // API for lyrics
    const res = await axios.get(
      `http://api.vagalume.com.br/search.php?apikey=${
        process.env.REACT_APP_VAGALUME_KEY
      }&art=${artist}&mus=${track}&extra=alb`
    );
    console.log(res.data);
    // Prepare data to send in dispatch
    const preData = resM.data.message.body.track;
    preData.lyrics = res.data.type !== 'notfound' ? res.data.mus[0].text : null;
    const genre =
      resM.data.message.body.track.primary_genres.music_genre_list.length > 0
        ? {
            music_genre:
              resM.data.message.body.track.primary_genres.music_genre_list[0]
                .music_genre.music_genre_name
          }
        : { music_genre: null };
    const data = {
      ...preData,
      ...genre
    };
    dispatch({
      type: GET_TRACK,
      payload: data
    });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <TracksContext.Provider
      value={{
        track_list: state.track_list,
        heading: state.heading,
        loading: state.loading,
        track: state.track,
        getTopTen,
        getTrack
      }}
    >
      {props.children}
    </TracksContext.Provider>
  );
};

export default TracksState;
