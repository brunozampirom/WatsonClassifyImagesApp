import React, { Component } from 'react';
import Gallery from './app/components/Gallery'
import { saveStore } from './app/store/globalStore';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

export default class App extends Component {
  render() {
    const store = saveStore(createStore);
    return (
      <Provider store={store}>
        <Gallery />
      </Provider>
    )
  };
}