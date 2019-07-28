import {
  SHOW_LOADING_SPINNER,
  CLEAR_MOVIES,
  SEARCH_MOVIES,
  GET_POPULAR_MOVIES,
  LOAD_MORE_MOVIES
} from '../actions';

const defaultState = {
  movies: [],
  heroImage: null,
  loading: false,
  currentPage: 0,
  totalPages: 0,
  searchTerm: ''
}

export default function(state=defaultState, action) {
  const {
    results,
    page,
    totalPages,
    searchTerm
  } = action.payload;

  switch(action.type) {
    case GET_POPULAR_MOVIES:
      return {
        ...state,
        movies: results,
        heroImage: state.heroImage || results[0],
        loading: false,
        currentPage: page,
        totalPages: totalPages,
        searchTerm: ''
      }
    case LOAD_MORE_MOVIES:
      return {
        ...state,
        movies: [...state.movies, ...results],
        loading:false,
        currentPage: page,
        totalPages: totalPages,
      }
    case SEARCH_MOVIES:
      return {
        ...state,
        movies: [...state.movies, ...results],
        loading:false,
        currentPage: page,
        totalPages: totalPages,
        searchTerm: searchTerm,
      }
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: [],
      }
    case SHOW_LOADING_SPINNER:
      return {
        ...state,
        loading: true,
      }
  }
}
