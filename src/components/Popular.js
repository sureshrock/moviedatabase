import {React, Component} from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from './MovieCard'
import NavBar from './NavBar'
import Pagination from './Pagination'

class Popular extends Component {
  state = {
    isLoading: true,
    popularMovieResponse: {},
  }
  componentDidMount() {
    this.getPopularMoviesResponse()
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

  getPopularMoviesResponse = async (page = 1) => {
    const API_KEY = '73c2413c086bfcef3ec44eb9c5ea95b4'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, popularMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderpopularMoviesList = () => {
    const {popularMovieResponse} = this.state
    const {results} = popularMovieResponse

    return (
      <ul>
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, popularMovieResponse} = this.state

    return (
      <>
        <NavBar />
        <div>
          {isLoading
            ? this.renderLoadingView()
            : this.renderpopularMoviesList()}
        </div>
        <Pagination
          totalPages={popularMovieResponse.totalPages}
          apiCallback={this.getPopularMoviesResponse}
        />
      </>
    )
  }
}

export default Popular
