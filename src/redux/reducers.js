import { TYPES } from './actions';
import { arrayMove } from 'react-sortable-hoc';
import { apiKey, dbuser, dbpassword } from '../config/keys';

const initialState = {
  loggedIn: true,
  apiKey,
  dbuser,
  dbpassword,
  // searchText: '',
  searchResults: [],
  listDescript: '',
  username: 'kesto',
  list: [],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SET_DESCRIPT: return {
      ...state,
      listDescript: payload.text
    };
    // case TYPES.SET_SEARCH_TEXT: return {
    //   ...state,
    //   searchText: payload.text,
    // };
    case TYPES.CLEAR_SEARCH_TEXT: return {
      ...state,
      searchText: []
    };
    // case TYPES.SET_SEARCH_RESULTS: return {
    //   ...state,
    //   searchResults: [...state.searchResults, ...payload.data],
    // };
    // set fetched movie list to state
    case TYPES.SET_MOVIE_LIST: return {
      ...state,
      username: payload.data.username,
      listDescript: payload.data.listDescript,
      list: [...payload.data.list]
    };
    case TYPES.ADD_TO_LIST: return {
      ...state,
      list: [...state.list, payload.movie]
    };
    case TYPES.CLEAR_SEARCH_RESULTS: return {
      ...state,
      searchResults: []
    };
    case TYPES.REORDER_LIST: return {
      ...state,
      list: arrayMove(state.list, payload.oldIndex, payload.newIndex)
    };
    case TYPES.DELETE_MOVIE: return {
      ...state,
      list: [...state.list.filter(movie => movie.id !== payload.movie.id)]
    };
    case TYPES.DELETE_LIST: return {
      ...state,
      list: []
    };
    default: return state;
  }
}