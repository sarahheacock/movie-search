import React from 'react';
import PropTypes from 'prop-types';

const List = (props) => {
  return (
    <div>
      {(props.movies.length) ?
        <div className="flex-container">
        {props.movies.map((movie, i) => (
          props.render(movie, i)
        ))}
        </div>:
        <h1 className="text-center">{props.message}</h1>
      }
    </div>
  )
}

export default List;

List.propTypes = {
  render: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired
  })).isRequired,
  message: PropTypes.string.isRequired
}
