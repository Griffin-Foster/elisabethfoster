import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
  UPDATE_POST,
  FILTER_POSTS,
  CLEAR_FILTER_POST,
  POST_ERROR,
  CLEAR_POSTS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          post => post._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT_POST:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT_POST:
      return {
        ...state,
        current: null
      };
    case FILTER_POSTS:
      return {
        ...state,
        filtered: state.posts.filter(post => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return post.name.match(regex) || post.email.match(regex);
        })
      };
    case CLEAR_FILTER_POST:
      return {
        ...state,
        filtered: null
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
