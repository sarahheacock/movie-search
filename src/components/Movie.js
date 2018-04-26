import React from 'react';
import PropTypes from 'prop-types';

const Movie = (props) => {
  return (
    <div className="item">
      <div className="recipe-content">
        <div className="text-center">
          <h3 className="movie-title">{props.title}</h3>
          <div className="image-container">
            <img
              className="image"
              onClick={props.getMoreMovieInfo}
              id={props.index}
              onError={props.handleImageError}
              src={props.poster}
              name={props.id}
              onClick={props.getMoreMovieInfo}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie;

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  getMoreMovieInfo: PropTypes.func.isRequired
}
