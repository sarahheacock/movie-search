import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index.js';
import Input from './containers/Input.js';
import MovieList from './containers/MovieList.js';
import style from './scss/index.scss'; // import for ExtractTextPlugin

// ====================INITIALIZE STATE=======================
// initialize state by getting previous input from session storage

// TODO: have movies.focused be an index value of movies.list
// this would be done by updating movies.list after the api
// call that gets movie by id
// It would allow api call to only be called the first time a movie is clicked on
const input = (sessionStorage.input) ?
  JSON.parse(sessionStorage.input):
  {
    title: '',
    year: ''
  };

const store = createStore(reducers, {
  input: input,
  movies: {
    list: [],
    focused: {},
    message: 'Search for your favorite movie!'
  }
}, applyMiddleware(thunk))

// ===============SAVE INPUT TO sessionStorage==============================
// everytime there is a state change, save state to session storage

// TODO: move saveState to redux thunk middleware before state.input change
// this would allow 'saveState' to only be called when the input
// actually changes rather than after every state change

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({title: state.input.title, year: state.input.year});
    sessionStorage.setItem('input', serializedState);
  }
  catch(err){
    console.log(err);
  }
};

store.subscribe(() => { saveState(store.getState()); });

// ==================RENDER======================================================
render(
  <Provider store={store}>
    <div className="container-fluid">
      <Input />
      <MovieList />
    </div>
  </Provider>, document.getElementById('root'));
