import { userDataActions } from './userDataActions';

export const useActions = (state: any, dispatch: any) => {
  return {
    userDataActions: userDataActions({ state, dispatch }),
  };
};
