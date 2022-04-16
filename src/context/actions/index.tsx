import { userDataActions } from "./userDataActions";

export const useActions = (state: any, dispatch: any) => ({
  userDataActions: userDataActions({ state, dispatch }),
});
