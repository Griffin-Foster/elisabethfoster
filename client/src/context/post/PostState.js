import React, { useReducer } from 'react'
import axios from 'axios'
import PostContext from './postContext'
import postReducer from './postReducer'
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
  UPDATE_POST,
  FILTER_POSTS,
  CLEAR_POSTS,
  CLEAR_FILTER_POST,
  POST_ERROR
} from '../types'

const PostState = (props) => {
  const initialState = {
    posts: null,
    current: null,
    filtered: null,
    error: null
  }

  const [state, dispatch] = useReducer(postReducer, initialState)

  // Get Posts
  const getPosts = async () => {
    try {
      const res = await axios.get('/api/posts')

      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Add Post
  const addPost = async (post) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/posts', post, config)

      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Delete Post
  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`)

      dispatch({
        type: DELETE_POST,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Update Post
  const updatePost = async (post) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.put(
        `/api/posts/${post._id}`,
        post,
        config
      )

      dispatch({
        type: UPDATE_POST,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Clear Posts
  const clearPosts = () => {
    dispatch({ type: CLEAR_POSTS })
  }

  // Set Current Post
  const setCurrent = (post) => {
    dispatch({ type: SET_CURRENT_POST, payload: post })
  }

  // Clear Current Post
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT_POST })
  }

  // Filter Posts
  const filterPosts = (text) => {
    dispatch({ type: FILTER_POSTS, payload: text })
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER_POST })
  }

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addPost,
        deletePost,
        setCurrent,
        clearCurrent,
        updatePost,
        filterPosts,
        clearFilter,
        getPosts,
        clearPosts
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
}

export default PostState
