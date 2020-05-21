import * as types from '../actions/action-types';

const INITIAL_STATE = {
  error: '',
  list: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOAD_CLASSIFY_SUCCESS:
        return { ...state, list: action.list };
    default:
      return state;
  }
}