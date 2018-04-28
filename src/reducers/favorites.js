import * as favoritesActions from '../actionTypes/favorites.js';

export default function favorites(state={}, action){
  switch(action.type) {
    case favoritesActions.ADD_FAVORITE:
      return {
        ...state,
        list: [...state.list, action.movie]
      }

    case favoritesActions.REMOVE_FAVORITE:
      const list = state.list.filter(movie => {
        return movie.imdbID !== action.id
      });
      console.log(list);

      return {
        ...state,
        list: list
      }

    case favoritesActions.TOGGLE_VISIBLE:
      return {
        ...state,
        visible: !state.visible
      }

    default:
      return state
  }
}
