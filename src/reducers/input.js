import * as inputActions from '../actionTypes/input.js';


export default function input(state={}, action) {
  switch(action.type) {
    case inputActions.UPDATE_INPUT:
      return {
        ...state,
        ...action.input
      }


    default:
      return state
  }
}
