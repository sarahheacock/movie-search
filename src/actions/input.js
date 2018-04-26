import * as inputActions from '../actionTypes/input.js';

export const updateInput = (input) => {
  return {
    type: inputActions.UPDATE_INPUT,
    input: input
  }
}

export const updateInputHistory = (input) => {
  return {
    type: inputActions.UPDATE_INPUT_HISTORY,
    input: input
  }
}
