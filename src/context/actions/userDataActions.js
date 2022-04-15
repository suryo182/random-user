import axios from 'axios';

export const userDataActions = (props) => {
  return {
    fetchData: async ({ page, results, keyword, gender }) => {
      props.dispatch({ type: 'LOADING_START' });
      const request = await axios
        .get(`https://randomuser.me/api/?page=${page}&results=${results}&keyword=${keyword}&gender=${gender}`)
        .then((res) => res.data.results)
        .catch((err) => err.response);

      props.dispatch({ type: 'LOADING_FINISH' });
      props.dispatch({ type: 'FETCH_DATA', payload: request });
    },
  };
};
