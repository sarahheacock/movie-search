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

const favoritesList = (localStorage.favorites) ?
  JSON.parse(localStorage.favorites).list:
  [];

const store = createStore(reducers, {
  input: input,
  movies: {
    list: [],
    focused: {},
    favorites: [],
    visible: false,
    message: 'Search for your favorite movie!'
  },
  favorites: {
    list: favoritesList,
    visible: false
  }
}, applyMiddleware(thunk))

// ===============SAVE INPUT TO sessionStorage==============================
// everytime there is a state change, save state to session storage

// TODO: move saveState to redux thunk middleware before state.input change
// this would allow 'saveState' to only be called when the input
// actually changes rather than after every state change

const saveInputState = (state) => {
  try {
    const serializedInputState = JSON.stringify({title: state.input.title, year: state.input.year});
    sessionStorage.setItem('input', serializedInputState);
  }
  catch(err){
    console.log(err);
  }
};

const saveFavoritesState = (state) => {
  try {
    const serializedInputState = JSON.stringify({list: state.favorites.list});
    localStorage.setItem('favorites', serializedInputState);
  }
  catch(err){
    console.log(err);
  }
};

store.subscribe(() => {
  saveInputState(store.getState());
  saveFavoritesState(store.getState());
});

// ==================RENDER======================================================
render(
  <Provider store={store}>
    <div className="container-fluid">
      <Input />
      <MovieList />
    </div>
  </Provider>, document.getElementById('root'));
