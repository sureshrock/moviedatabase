import {React, Component} from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from './MovieCard'
import NavBar from './NavBar'
import Pagination from './Pagination'

class TopRated extends Component {
  state = {
    isLoading: true,
    topRatedMovieResponse: {},
  }
  componentDidMount() {
    this.getTopRatedMoviesResponse()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getTopRatedMoviesResponse = async (page = 1) => {
    const API_KEY = '73c2413c086bfcef3ec44eb9c5ea95b4'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, topRatedMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderpopularMoviesList = () => {
    const {topRatedMovieResponse} = this.state
    const {results} = topRatedMovieResponse

    return (
      <ul>
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, topRatedMovieResponse} = this.state

    return (
      <>
        {' '}
        <NavBar />
        <div>
          {isLoading
            ? this.renderLoadingView()
            : this.renderpopularMoviesList()}
        </div>
        <Pagination
          totalPages={topRatedMovieResponse.totalPages}
          apiCallback={this.getTopRatedMoviesResponse}
        />
      </>
    )
  }
}

export default TopRated
