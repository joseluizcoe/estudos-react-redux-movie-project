import {
  SHOW_LOADING_SPINNER,
  GET_MOVIE,
  CLEAR_MOVIE,
} from '../actions';

const defaultState = {
  movie: null,
  actors: null,
  directors: [],
  loading: false
}

export default function(state=defaultState, action) {
  switch(action.type) {
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload.movie,
        actors: action.payload.actors,
        directors: action.payload.directors,
        loading: false
      }
    case SHOW_LOADING_SPINNER:
      return {
        ...state,
        loading: true
      }
    case CLEAR_MOVIE:
      return {
        ...state,
        movie: null,
        actors: null,
        directors: null,
        loading: false,
      }
    default: 
      return state;
  }
}
