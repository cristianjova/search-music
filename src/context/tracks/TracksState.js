import React, { useReducer } from 'react';
// import axios from 'axios';
import TracksContext from './tracksContext';
import TracksReducer from './tracksReducer';

const TracksState = props => {
  const initialState = {
    tracks_list: [
      { track: { track_name: 'abc' } },
      { track: { track_name: 'def' } }
    ],
    heading: 'Top 10 Canciones'
  };

  const [state, dispatch] = useReducer(TracksReducer, initialState);

  return (
    <TracksContext.Provider value={{ state }}>
      {props.children}
    </TracksContext.Provider>
  );
};

export default TracksState;
