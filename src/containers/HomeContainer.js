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
    let endpoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    })

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  }

  loadMoreItems = () => {
    // ES6 Destructuring the state
    const { searchTerm, currentPage } = this.state;

    let endpoint = '';
    this.setState({ loading: true })

    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  }

  fetchItems = (endpoint) => {
    // ES6 Destructuring the state
    const { movies, heroImage, searchTerm } = this.state;

    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
      this.setState({
        movies: [...movies, ...result.results],
        heroImage: heroImage || result.results[0],
        loading: false,
        currentPage: result.page,
        totalPages: result.total_pages
      }, () => {
        // Remember state for the next mount if we´re not in a search view
        if (searchTerm === "") {
          sessionStorage.setItem('HomeState', JSON.stringify(this.state));
        }
      })
    })
    .catch(error => console.error('Error:', error))
  }
