import { GET_TOP_TEN, SET_LOADING, GET_TRACK } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_TOP_TEN:
      return {
        ...state,
        track_list: action.payload,
        loading: false
      };
    case GET_TRACK:
      return {
        ...state,
        track: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
