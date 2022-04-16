import { useReducer, createContext } from "react";
import { initialState, reducer } from "../reducer/reducer";
import { useActions } from "../actions";

const StoreContext = createContext(initialState);

function StoreProvider({ children }: any): any {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);

  return (
    <StoreContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  );
}

export { StoreContext, StoreProvider };
