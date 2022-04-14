import { initialState } from '../state/initialState';
import { loadingReducer } from './loadingReducer';
import { userDataReducer } from './userDataReducer';

const reducer = (state = initialState, action) => {
  return {
    userDataStates: userDataReducer(state.userDataStates, action),
    loadingStates: loadingReducer(state.loadingStates, action),
  };
};

export { initialState, reducer };
