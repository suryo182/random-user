export const userDataStates = {
  list: [],
};

export const userDataReducer = (state: any, action: any) => {
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
