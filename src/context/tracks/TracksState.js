import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import TracksContext from './tracksContext';
import TracksReducer from './tracksReducer';
import { GET_TOP_TEN, SET_LOADING } from '../types';

const TracksState = props => {
  const initialState = {
    track_list: [],
    heading: 'Top 10 Canciones',
    loading: false
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

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <TracksContext.Provider
      value={{
        track_list: state.track_list,
        loading: state.loading,
        getTopTen
      }}
    >
      {props.children}
    </TracksContext.Provider>
  );
};

export default TracksState;
