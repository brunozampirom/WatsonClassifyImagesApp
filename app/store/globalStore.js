import { applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

let Store = null;
const reducer = combineReducers(reducers)

export const saveStore = (createStore) => {
  Store = createStore(reducer, applyMiddleware(thunk));
  return Store;
};

export const getStore = () => Store;