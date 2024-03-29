import React, { Component } from  'react';
import { connect } from 'react-redux';
import {
  getPopularMovies,
  showLoadingSpinner,
  searchMovies,
  clearMovies,
  loadMoreMovies,
} from '../actions';
import Home from '../components/Home/Home';

class HomeContainer extends Component {
    componentDidMount() {
      this.getMovies();
    }

    getMovies = () => {
      this.props.showLoadingSpinner();
      this.props.getPopularMovies();
    }

    searchMovies = (searchTerm) => {
      this.props.clearMovies();
      this.props.showLoadingSpinner();
      this.props.searchMovies(searchTerm);
    }

    loadMoreMovies = () => {
      const { searchTerm, currentPage } = this.props;
      this.props.showLoadingSpinner();
      this.props.loadMoreMovies(searchTerm, currentPage);
    }

    render() {
      return (
        <Home 
          {...this.props}
          searchMovies={this.searchMovies}
          loadMoreMovies={this.loadMoreMovies}
        />
      )
    }
}

const mapStateToProps = state => {
  return state.home;
}

const mapDispatchToProps = {
  getPopularMovies,
  showLoadingSpinner,
  searchMovies,
  clearMovies,
  loadMoreMovies,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
