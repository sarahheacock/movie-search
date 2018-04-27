import * as inputActions from '../actionTypes/input.js';

export const updateInput = (input) => {
  return {
    type: inputActions.UPDATE_INPUT,
    input: input
  }
}

// middleware to update sessionStorage would go here -->
