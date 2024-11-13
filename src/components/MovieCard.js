import {Link} from 'react-router-dom'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li>
      <img src={posterPath} alt={title} />
      <div>
        <h1>{title}</h1>
        <p>Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`}>
        <button type="button">View Details</button>
      </Link>
    </li>
  )
}
export default MovieCard
