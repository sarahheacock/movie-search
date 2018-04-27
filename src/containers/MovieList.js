import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { getMoreMovieInfo, updateFocus, updateMovieImage } from '../actions/movies.js';
import Movie from '../components/Movie.js';
import MovieModal from '../components/MovieModal.js';


const mapStateToProps = state => ({ movies: state.movies })
const mapDispatchToProps = dispatch => ({
  getMoreMovieInfo: id => dispatch(getMoreMovieInfo(id)), // makes api call for specific movie
  updateFocus: obj => dispatch(updateFocus(obj)), // updates which movie is in modal
  updateMovieImage: obj => dispatch(updateMovieImage(obj)), // updates Poster key
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

  render(){
    return (
      <div className="main">
        <div>
          {(this.props.movies.list.length) ?
            <div className="flex-container">
            {this.props.movies.list.map((movie, i) => (
              <Movie
                handleImageError={this.handleImageError}
                key={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster}
                year={movie.Year}
                id={movie.imdbID}
                index={i}
                getMoreMovieInfo={this.getInfo}
              />
            ))}
            </div>:
            <h1 className="text-center">{this.props.movies.message}</h1>
          }
        </div>
        <MovieModal
          focused={this.props.movies.focused}
          handleClose={this.handleClose}
          handleImageError={this.handleImageError}
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
  updateMovieImage: PropTypes.func.isRequired
}
