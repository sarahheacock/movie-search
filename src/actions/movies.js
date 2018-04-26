import * as movieActions from '../actionTypes/movies.js';
import axios from 'axios';
import KEY from './config.js';

const URL = 'http://www.omdbapi.com/?apikey=';

export const updateMovieImage = (index) => {
  return {
    type: movieActions.UPDATE_MOVIE_IMAGE,
    index: index
  }
}

export const updateMovieList = (movieList, message) => {
  return {
    type: movieActions.UPDATE_MOVIE_LIST,
    list: movieList,
    message: message
  }
}

export const searchForMovies = (input) => {
  const getUrl = `${URL}${KEY}&s=${input.title}&y=${input.year}`;
  return (dispatch) => {
    axios.get(getUrl).then(res => {
      const search = (res.data.Search) ? res.data.Search: [];
      const message = (res.data.Error) ? res.data.Error: 'No results found';
      dispatch(updateMovieList(search));
    })
  }
}

export const updateFocus = (focused) => {
  return {
    type: movieActions.UPDATE_FOCUS,
    focused: focused
  }
}

export const getMoreMovieInfo = (id) => {
  const getUrl = `${URL}${KEY}&i=${id}`;
  return (dispatch) => {
    axios.get(getUrl).then(res => {
      const data = (res.data.Title) ?
        res.data: 'Title';
      dispatch(updateFocus(data));
    })
  }
}
