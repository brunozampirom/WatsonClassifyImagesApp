import * as types from '../actions/action-types';

const INITIAL_STATE = {
  error: '',
  imagesList: [],
  isLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CLASSIFY_NEW_ITEM_SUCCESS:
        return { ...state, imagesList: [...state.imagesList, action.image] };
    case types.UPDATE_SET:
        return { ...state, imagesList: action.imagesList };
    case types.LOAD_CLASSIFY_FAIL:
        return { ...state, error: action.error };
    case types.ON_LOAD:
        return { ...state, isLoading: action.load };
    case types.SET_INITIAL_STATE:
        return { INITIAL_STATE };
    default:
      return state;
  }
}