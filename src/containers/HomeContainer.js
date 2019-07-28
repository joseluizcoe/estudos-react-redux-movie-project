import React from  'react';
class Home extends Component {
  componentDidMount() {
    if (sessionStorage.getItem('HomeState')) {
      let state = JSON.parse(sessionStorage.getItem('HomeState'))
      this.setState({ ...state })
    } else {
      this.setState({ loading: true })
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      this.fetchItems(endpoint);
    }
  }

  searchItems = (searchTerm) => {
  }

  loadMoreItems = () => {
  }

  fetchItems = (endpoint) => {
  }

}
