import * as movieActions from '../actionTypes/movies.js';

const tempPoster = 'https://images.pexels.com/photos/390089/film-movie-motion-picture-390089.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
const movieState = {}

export default function movies(state=movieState, action) {
  switch(action.type) {
    case movieActions.UPDATE_MOVIE_IMAGE:
      // id > -1 if movie from list's image did not load
      if(action.index > -1){
        const movies = state.list.map((movie, i) => {
          if(i === action.index){
            return {...movie, Poster: tempPoster}
          }
          return movie;
        })

        return {
          ...state,
          list: movies
        }
      }

      // id === -1 if Poster from state.focused did not load
      return {
        ...state,
        focused: {
          ...state.focused,
          Poster: tempPoster
        }
      }

    case movieActions.UPDATE_MOVIE_LIST:
      return {
        ...state,
        list: action.list
      }

    case movieActions.UPDATE_FOCUS:
      return {
        ...state,
        focused: action.focused
      }

    default:
      return state
  }
}
