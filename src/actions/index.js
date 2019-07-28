import { API_URL, API_KEY } from '../config';

// actions Type from home
export const GET_POPULAR_MOVIES = 'GET_POPULAR_MOVIES';
export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const LOAD_MORE_MOVIES = 'LOAD_MORE_MOVIES';
export const CLEAR_MOVIES = 'CLEAR_MOVIES';

// action Type for Movie
export const GET_MOVIE = 'GET_MOVIE';
export const CLEAR_MOVIE = 'CLEAR_MOVIE';

// action types for both
export const SHOW_LOADING_SPINNER = 'SHOW_LOADING_SPINNER'; 

// action creators for both
export function showLoadingSpinner(){
  return {
    type: SHOW_LOADING_SPINNER,
    payload: null
  }
}

// action creators for home
export function getPopularMovies() {
  const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => result)
    .catch(error => console.error('Error:', error));
  return {
    type: GET_POPULAR_MOVIES,
    payload: request
  }
}

export function searchMovies(searchTerm) {
  let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  if (searchTerm) {
    endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
  }
  const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => ({...result, searchTerm}))
    .catch(error => console.error('Error:', error));
  return {
    type: SEARCH_MOVIES,
    payload: request
  }
}

export function loadMoreMovies(searchTerm, currentPage){
  let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
  if (searchTerm) {
    endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
  }
  const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => ({...result, searchTerm}))
    .catch(error => console.error('Error:', error));
  return {
    type: LOAD_MORE_MOVIES,
    payload: request
  }
}

export function clearMovies(){
  return {
    type: CLEAR_MOVIES,
    payload: null
  }
}

// action creator for Movie
export function clearMovie() {
  return {
    type: CLEAR_MOVIE,
    payload: null,
  }
}

export function getMovie(movieId) {
  let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => result)
    .then(movie => {
      // ... then fetch actors in the setState callback function
      let endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
      return fetch(endpoint)
        .then(result => result.json())
        .then(result => {
          const directors = result.crew.filter( (member) => member.job === "Director");
          return {
            movie,
            actors: result.cast,
            directors,
            loading: false
          }
        });
    })
    .catch(error => console.error('Error:', error));
  console.log('movie request', request);
  return {
    type: GET_MOVIE,
    payload: request
  }
}
