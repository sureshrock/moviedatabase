import {Link, withRouter} from 'react-router-dom'

import SearchMoviesContext from '../context/SearchMoviesContext'

const NavBar = props => {
  const renderSearchBar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
          apiStatus,
        } = value
        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }

        return (
          <div>
            <input
              type="text"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="search"
            />
            <button type="button" onClick={onSearchHandler}>
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )

  return (
    <nav>
      <div>
        <h1>movieDB</h1>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/">Popular</Link>
          </li>
          <li>
            <Link to="/top-rated">Top Rated</Link>
          </li>
          <li>
            <Link to="/upcoming">Upcoming</Link>
          </li>
        </ul>
        {renderSearchBar()}
      </div>
    </nav>
  )
}

export default withRouter(NavBar)
