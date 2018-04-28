import { combineReducers } from 'redux';
import input from './input.js';
import movies from './movies.js';
import favorites from './favorites.js';
 
export default combineReducers({
  input: input,
  movies: movies,
  favorites: favorites
})
