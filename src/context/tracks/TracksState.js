import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import TracksContext from './tracksContext';
import TracksReducer from './tracksReducer';
import { GET_TOP_TEN } from '../types';

const TracksState = props => {
  const initialState = {
    track_list: [],
    heading: 'Top 10 Canciones'
  };

  const [state, dispatch] = useReducer(TracksReducer, initialState);

  useEffect(() => {
    getTopTen();
    // eslint-disable-next-line
  }, []);

  const getTopTen = async () => {
    const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=ar&f_has_lyrics=1&apikey=${
        process.env.REACT_APP_MM_KEY
      }`
    );
    console.log(res.data.message.body.track_list);
    dispatch({
      type: GET_TOP_TEN,
      payload: res.data.message.body.track_list
    });
  };

  return (
    <TracksContext.Provider value={{ state }}>
      {props.children}
    </TracksContext.Provider>
  );
};

export default TracksState;
