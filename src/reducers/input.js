import * as inputActions from '../actionTypes/input.js';

// const movieState = {}

export default function input(state={}, action) {
  switch(action.type) {
    case inputActions.UPDATE_INPUT:
      return {
        ...state,
        ...action.input
      }

    case inputActions.UPDATE_INPUT_HISTORY:
      // const suggestedYears = ;
      // const suggestedTitles = ;

      return {
        ...state
      }

    default:
      return state
  }
}
