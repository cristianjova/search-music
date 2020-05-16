import {
  GET_TOP_TEN,
  SET_LOADING,
  GET_TRACK,
  GET_VIDEO,
  SEARCH_TRACKS,
  SET_SEARCH,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_TOP_TEN:
      return {
        ...state,
        track_list: action.payload,
        track: {},
        video: {},
        search: '',
        loading: false,
      };
    case SEARCH_TRACKS:
      return {
        ...state,
        track_list: action.payload,
        track: {},
        video: {},
        loading: false,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case GET_TRACK:
      return {
        ...state,
        track: action.payload,
        loading: false,
      };
    case GET_VIDEO:
      return {
        ...state,
        video: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
