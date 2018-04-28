import React from 'react';
import PropTypes from 'prop-types';

import Heart from './Heart.js';

const Movie = (props) => {
  // displays movie and gives a default image if props.Poster does not load
  return (
    <div className="item">
      <div className="movie-content">
        <div className="text-center">
          <h3 className="movie-title">
            {props.title}
            <br />
            <small>
            ({props.year})
            <br />
            <a href={`https://www.imdb.com/title/${props.id}`}>IMDB</a>
            </small>
          </h3>
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
          <br />
          <Heart
            liked={props.favorite}
            index={props.index}
            handleFavoriteButton={props.handleFavoriteButton}
          />
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
  favorite: PropTypes.bool.isRequired,
  getMoreMovieInfo: PropTypes.func.isRequired,
  handleImageError: PropTypes.func.isRequired,
  handleFavoriteButton: PropTypes.func.isRequired
}
