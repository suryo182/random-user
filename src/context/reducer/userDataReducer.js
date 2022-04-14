export const userDataStates = {
  list: [],
};

export const userDataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
