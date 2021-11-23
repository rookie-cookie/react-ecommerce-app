//root reducers represents the overall reducer based on all of the reducer that it pulls in 

import { combineReducers } from 'redux'

import userReducer from './user/user-reducer'

export default combineReducers({
  user: userReducer
})