import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index.js';
import Input from './containers/Input.js';
import MovieList from './containers/MovieList.js';
import style from './scss/index.scss'; // import for ExtractTextPlugin

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({title: state.input.title, year: state.input.year});
    sessionStorage.setItem('input', serializedState);
  }
  catch(err){

  }
};

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
    focused: {
      Title: ''
    },
    message: 'Search for your favorite movie!'
  }
}, applyMiddleware(thunk))

store.subscribe(() => { saveState(store.getState()); });

render(
  <Provider store={store}>
    <div className="container-fluid">
      <Input />
      <MovieList />
    </div>
  </Provider>, document.getElementById('root'));
