import * as favoritesActions from '../actionTypes/favorites.js';

export const removeFavorite = (id) => {
  return {
    type: favoritesActions.REMOVE_FAVORITE,
    id: id
  }
}

export const addFavorite = (movie) => {
  return {
    type: favoritesActions.ADD_FAVORITE,
    movie: movie
  }
}

export const toggleVisible = (value) => {
  return {
    type: favoritesActions.TOGGLE_VISIBLE,
    value: value
  }
}
