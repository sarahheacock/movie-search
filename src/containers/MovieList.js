import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { getMoreMovieInfo, updateFocus, updateMovieImage } from '../actions/movies.js';
import Movie from '../components/Movie.js';
import MovieModal from '../components/MovieModal.js';


const mapStateToProps = state => ({ movies: state.movies })
const mapDispatchToProps = dispatch => ({
  getMoreMovieInfo: id => dispatch(getMoreMovieInfo(id)),
  updateFocus: obj => dispatch(updateFocus(obj)),
  updateMovieImage: obj => dispatch(updateMovieImage(obj)),
})

class MovieList extends React.Component {
  getInfo = (e) => {
    if(e){
      e.preventDefault();
    }
    this.props.getMoreMovieInfo(e.target.name)
  }

  handleClose = (e) => {
    this.props.updateFocus({Title: ''})
  }

  handleImageError = (e) => {
    const num = parseInt(e.target.id, 10);
    this.props.updateMovieImage(num);
    console.log(num);
  }

  render(){
    return (
      <div className="main">
        <div className="flex-container">
          {(this.props.movies.list.length) ?
            this.props.movies.list.map((movie, i) => (
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
            )):
            <h1 className="text-center">{this.props.movies.message}</h1>
          }
        </div>
        <MovieModal focused={this.props.movies.focused} handleClose={this.handleClose}/>
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
  getMoreMovieInfo: PropTypes.func.isRequired
}
