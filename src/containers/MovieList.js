import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { getMoreMovieInfo, updateFocus, updateMovieImage } from '../actions/movies.js';
import { removeFavorite, addFavorite } from '../actions/favorites.js'
import Movie from '../components/Movie.js';
import List from '../components/List.js';
import MovieModal from '../components/MovieModal.js';


const mapStateToProps = state => ({
  movies: state.movies,
  favorites: state.favorites
})
const mapDispatchToProps = dispatch => ({
  getMoreMovieInfo: id => dispatch(getMoreMovieInfo(id)), // makes api call for specific movie
  updateFocus: obj => dispatch(updateFocus(obj)), // updates which movie is in modal
  updateMovieImage: obj => dispatch(updateMovieImage(obj)), // updates Poster key
  removeFavorite: id => dispatch(removeFavorite(id)),
  addFavorite: movie => dispatch(addFavorite(movie))
})

class MovieList extends React.Component {
  getInfo = (e) => {
    if(e){
      e.preventDefault();
    }
    this.props.getMoreMovieInfo(e.target.name)
  }

  handleClose = (e) => {
    // modal closes if movies.focused.Title is undefined
    this.props.updateFocus({});
  }

  handleImageError = (e) => {
    // updates movie.list[num].Poster or movies.focused.Poster
    // with a default image if the image does not load
    const num = parseInt(e.target.id, 10);
    this.props.updateMovieImage(num);
  }

  handleFavoriteButton = (index) => {
    const focused = this.props.movies.focused.imdbID;

    if(focused){ // if modal open
      const favorites = this.props.favorites.list.reduce((obj, movie) => {
        obj[movie.imdbID] = true;
        return obj;
      }, {});

      if(favorites[focused]){
        this.props.removeFavorite(focused)
      }
      else {
        this.props.addFavorite(this.props.movies.focused)
      }
    }
    else { // if selecting thumbnail
      if(this.props.favorites.visible){
        this.props.removeFavorite(this.props.favorites.list[index].imdbID)
      }
      else {
        this.props.addFavorite(this.props.movies.list[index])
      }
    }

  }

  render(){
    const favorites = this.props.favorites.list.reduce((obj, movie) => {
      obj[movie.imdbID] = true;
      return obj;
    }, {});

    return (
      <div className="main">
        <List
          movies={(!this.props.favorites.visible) ? this.props.movies.list: this.props.favorites.list}
          message={(!this.props.favorites.visible) ? this.props.movies.message: "No Favorites"}
          render={(movie, i) => (
            <Movie
              handleImageError={this.handleImageError}
              getMoreMovieInfo={this.getInfo}
              favorite={favorites[movie.imdbID] || false}
              handleFavoriteButton={this.handleFavoriteButton}
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              year={movie.Year}
              id={movie.imdbID}
              index={i}
            />
          )}
        />
        <MovieModal
          favorite={favorites[this.props.movies.focused.imdbID] || false}
          focused={this.props.movies.focused}
          handleClose={this.handleClose}
          handleImageError={this.handleImageError}
          handleFavoriteButton={this.handleFavoriteButton}
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);

MovieList.propTypes = {
  movies: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      imdbID: PropTypes.string.isRequired,
      Type: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired
    })).isRequired,
    focused: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired,
  getMoreMovieInfo: PropTypes.func.isRequired,
  updateFocus: PropTypes.func.isRequired,
  updateMovieImage: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      imdbID: PropTypes.string.isRequired,
      Type: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired
    })).isRequired,
    visible: PropTypes.bool.isRequired
  }).isRequired,
}
