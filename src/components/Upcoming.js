import {React, Component} from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from './MovieCard'
import NavBar from './NavBar'
import Pagination from './Pagination'

class Upcoming extends Component {
  state = {
    isLoading: true,
    upcomingMovieResponse: {},
  }
  componentDidMount() {
    this.getUpcomingMoviesResponse()
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

  getUpcomingMoviesResponse = async (page = 1) => {
    const API_KEY = '73c2413c086bfcef3ec44eb9c5ea95b4'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, upcomingMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderpopularMoviesList = () => {
    const {upcomingMovieResponse} = this.state
    const {results} = upcomingMovieResponse

    return (
      <ul>
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, upcomingMovieResponse} = this.state

    return (
      <>
        <NavBar />
        <div>
          {isLoading
            ? this.renderLoadingView()
            : this.renderpopularMoviesList()}
        </div>
        <Pagination
          totalPages={upcomingMovieResponse.totalPages}
          apiCallback={this.getUpcomingMoviesResponse}
        />
      </>
    )
  }
}

export default Upcoming
