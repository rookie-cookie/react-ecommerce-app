//root reducers represents the overall reducer based on all of the reducer that it pulls in 

import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'  //returns the local storage of window object which will be used as the main storage for our cart items for now

import userReducer from './user/user-reducer'
import cartReducer from './cart/cart.reducer'
import directoryReducer from './directory/directory.reducer'
import shopReducer from './shop/shop.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] //tells redux which reducer we want to persist
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
})

export default persistReducer(persistConfig, rootReducer)