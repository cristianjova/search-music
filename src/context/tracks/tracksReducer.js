import { GET_TOP_TEN } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_TOP_TEN:
      return {
        ...state,
        track_list: action.payload
      };
    default:
      return state;
  }
};
