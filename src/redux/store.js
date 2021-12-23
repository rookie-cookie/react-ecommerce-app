import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';  // logger is a middleware that catches the action and then console logs it to us 
//also logs what the state was before the action
import thunk from 'redux-thunk'  //piece of middleware that allows us to fire functions 
 
import rootReducer from './root-reducer';

const middlewares = [thunk];

//removes the logger during production (deployed - heroku) and only shows during the development 
if (process.env.NODE_ENV === 'development'){
  middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistStore };