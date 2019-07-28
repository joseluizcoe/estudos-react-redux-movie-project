import React, {Component} from 'react';
import { connect } from 'react-redux';
import Movie from '../components/Movie/Movie';
import {
  showLoadingSpinner,
  getMovie,
  clearMovie } from '../actions';


class MovieContainer extends Component {

  componentDidMount() {
    const { movieId } = this.props.match.params;
    this.getMovie(movieId);
  }

  clearMovie = () => {
    this.props.clearMovie();
  }

  getMovie = (movieId) => {
    this.props.clearMovie();
    this.props.showLoadingSpinner();
    this.props.getMovie(movieId);
  }

  render() {
    return (
      <Movie {...this.props } />
    )
  }
}

const mapStateToProps = (state) => {
  return state.movie;
}

const mapDispatchToProps = {
  getMovie,
  showLoadingSpinner,
  clearMovie,
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);
