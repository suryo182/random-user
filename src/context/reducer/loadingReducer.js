export const loadingStates = {
  loading: false,
};

export const loadingReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_START':
      return {
        ...state,
        loading: true,
      };
    case 'LOADING_FINISH':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
