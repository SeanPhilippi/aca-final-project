import jwt_decode from 'jwt-decode';
import http from '../utils/http';
import setAuthToken from '../utils/auth/setAuthToken';

export const TYPES = {
  GET_ERRORS: 'GET_ERRORS',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_NEW_USERS: 'SET_NEW_USERS',
  SET_TOKEN: 'SET_TOKEN',
  SET_UPDATE_STATUS: 'SET_UPDATE_STATUS',
  SET_DESCRIPT: 'SET_DESCRIPT',
  SET_LIST: 'SET_LIST',
  ADD_TO_LIST: 'ADD_TO_LIST',
  REORDER_LIST: 'REORDER_LIST',
  DELETE_MOVIE: 'DELETE_MOVIE',
  DELETE_LIST: 'DELETE_LIST'
};

// action creators
export const setToken = decoded => {
  console.log('decoded in setToken action', decoded)
  return {
    type: TYPES.SET_TOKEN,
    payload: decoded
  };
};

export const setCurrentUser = user => ({
  type: TYPES.SET_CURRENT_USER,
  payload: user.data
});

export const setNewUsers = users => ({
  type: TYPES.SET_NEW_USERS,
  payload: {
    users
  }
});

export const setUpdateStatus = () => ({
  type: TYPES.SET_UPDATE_STATUS
});

export const setDescript = text => ({
  type: TYPES.SET_DESCRIPT,
  payload: {
    text
  }
});

export const setList = data => ({
  type: TYPES.SET_LIST,
  payload: {
    data
  }
});

export const addToList = movie => ({
  type: TYPES.ADD_TO_LIST,
  payload: {
    movie
  }
});

export const orderList = (oldIndex, newIndex) => ({
  type: TYPES.REORDER_LIST,
  payload: {
    oldIndex,
    newIndex
  }
});

export const deleteMovie = movie => ({
  type: TYPES.DELETE_MOVIE,
  payload: {
    movie
  }
});

export const deleteList = () => ({
  type: TYPES.DELETE_LIST
});

//thunk actions
export const registerUser = (userData, history) => dispatch => {
  http.users.post.register(userData)
    .then(() => history.push('/login'))
    .catch(({ response: { data } }) => {
      console.log('register err', data);
      dispatch({
        type: TYPES.GET_ERRORS,
        payload: data
      })
    })
  };

// export const registerUser = (userData, history) => dispatch => {
//   axios.post('api/users/register', userData)
//     .then(res => history.push('/login'))
//     .catch(err => {
//       console.log('register err', err.response.data)
//       dispatch({
//         type: TYPES.GET_ERRORS,
//         payload: err.response.data
//       })
//     })
// };

export const loginUser = (user, history) => dispatch => {
  http.users.post.login(user)
    .then(res => {
      console.log('/login post res', res);
      const { token } = res.data;
      // set token in localStorage
      localStorage.setItem('jwtToken', token);
      // set token to be in all axios headers
      setAuthToken(token);
      // decode the token
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setToken(decoded));
      history.push('/');
    })
    .catch(err => {
      console.log('err', err.response.data);
      dispatch({
        type: TYPES.GET_ERRORS,
        payload: err.response.data
      });
    });
  http.users.get.current()
  .then(user => {
    console.log('here2');
    this.props.setCurrentUser(user); // what I had before: dispatch(setCurrentUser(user))
  })
};

export const fetchList = () => (dispatch, getState) => {
  const {
    user: {
      username,
    },
  } = getState();

  console.log('username in fetchList', username);

  http.movies.get.userList(username)
    .then(({ data }) => {
      console.log('list', data.list);
      dispatch(setList(data))
    })
    .catch(console.error);
};

// export const fetchList = () => (dispatch, getState) => {
//   const { user } = getState();
//   console.log('username in fetchList', user.username);
//   axios(`api/movies/${user.username}/list`)
//   .then(list => {
//     console.log('list', list.data.list);
//     dispatch(setList(list.data))
//   })
//   .catch(err => console.error(err));
// };

export const logoutUser = history => dispatch => {
  // remove JWT token from localStorage
  localStorage.removeItem('jwtToken');
  // remove JWT token from axios Authorization headers
  setAuthToken(false);
  // set token back to empty object, passing in empty object will toggle isAuthenticated to false
  dispatch(setToken({}));
  // ! set current user back to empty object
  // dispatch(setCurrentUser({}));
  if (history) {
    history.push('/login');
  }
};

