import * as movieActions from '../actionTypes/movies.js';
import axios from 'axios';
import KEY from './config.js';

const URL = 'http://www.omdbapi.com/?apikey=';

// deals with changing Poster prop if image does not load
export const updateMovieImage = (index) => {
  return {
    type: movieActions.UPDATE_MOVIE_IMAGE,
    index: index
  }
}

// ==============MOVIE LIST========================================
export const updateMovieList = (movieList, message) => {
  return {
    type: movieActions.UPDATE_MOVIE_LIST,
    list: movieList,
    message: message
  }
}

// retrieves all movies based on form inputs
// then updates lists
export const searchForMovies = (input) => {
  const getUrl = `${URL}${KEY}&s=${input.title.trim()}&y=${input.year.trim()}`;
  return (dispatch) => {
    axios.get(getUrl).then(res => {
      const search = (res.data.Search) ? res.data.Search: [];
      const message = (res.data.Error) ? res.data.Error: 'No results found';
      dispatch(updateMovieList(search, message));
    }).catch(err => {
      console.log(err);
    })
  }
}

// ==============FOCUSED STATE=====================================
export const updateFocus = (focused) => {
  return {
    type: movieActions.UPDATE_FOCUS,
    focused: focused
  }
}

// gets more info on specific movie when clicked
// updates 'focused' prop allowing modal to open
export const getMoreMovieInfo = (id) => {
  const getUrl = `${URL}${KEY}&i=${id.trim()}`;
  return (dispatch) => {
    axios.get(getUrl).then(res => {
      dispatch(updateFocus(res.data));
    }).catch(err => {
      console.log(err);
    })
  }
}
