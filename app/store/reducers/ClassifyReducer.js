import * as types from '../actions/action-types';

const INITIAL_STATE = {
  error: '',
  list: [],
  isLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOAD_CLASSIFY_SUCCESS:
        return { ...state, list: action.list };
    case types.LOAD_CLASSIFY_FAIL:
        return { ...state, error: action.error };
    case types.ON_LOAD:
        return { ...state, isLoading: action.load };
    default:
      return state;
  }
}