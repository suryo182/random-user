import { userDataActions } from './userDataActions';

export const useActions = (state, dispatch) => {
  return {
    userDataActions: userDataActions({ state, dispatch }),
  };
};
