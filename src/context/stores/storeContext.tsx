import { initialState, reducer } from '../reducer/reducer';
import { useActions } from '../actions';
import { useReducer, createContext } from 'react';

const StoreContext = createContext(initialState);

const StoreProvider: any = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);

  return (
    <StoreContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
