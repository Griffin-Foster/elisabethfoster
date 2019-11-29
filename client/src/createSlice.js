import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import { createStore, combineReducers } from 'redux'
import setAuthToken from './utils/setAuthToken'

const loadUser = async (state) => {
  if (localStorage.token) setAuthToken(localStorage.token)

  try {
    const res = await axios.get('/api/auth')

    state.user = res.data
  } catch (err) {
    state.error = err
  }
  return await state
}

const registerUser = async (state, formData) => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  }

  try {
    const res = await axios.post('/api/users', formData, config)
    state.user = res.data
    loadUser(state)
  } catch (err) {
    state.error = err.response.data.msg
  }
  return await state
}

const loginUser = async (state, formData) => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  }

  try {
    const res = await axios.post('/api/auth', formData, config)

    localStorage.setItem('token', res.data.token)
    loadUser()
    state.isAuthenticated = true
    state.loading = false
  } catch (err) {
    state.error = err.response.data.msg
  }

  return await state
}

const auth = createSlice({
  name: 'token',
  intialState: {
    token: localStorage.token ? localStorage.getItem('token') : null,
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  },
  reducers: {
    loadUser: async state => await loadUser(state),
    registerUser: async state => await registerUser(state),
    loginUser: async state => await loginUser(state)
  }
})

const counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
    multiply: {
      reducer: (state, action) => state * action.payload,
      prepare: value => ({ payload: value || 2 }) // fallback if falsy value
    }
  }
})

const user = createSlice({
  name: 'user',
  initialState: { name: '', age: 0 },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload // mutate state with immer
    }
  },
  extraReducers: {
    [counter.actions.increment]: (state, action) => {
      state.age += 1
    }
  }
})

const reducer = combineReducers({
  auth: auth.reducer,
  counter: counter.reducer,
  user: user.reducer
})

const store = createStore(reducer)

export default store
