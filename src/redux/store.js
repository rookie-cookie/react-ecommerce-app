import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';  // logger is a middleware that catches the action and then console logs it to us 
//also logs what the state was before the action
//import thunk from 'redux-thunk'  //piece of middleware that allows us to fire functions 
import createSagaMiddleware from 'redux-saga' //saga helps organize side effects, its like a function generator

//import { fetchCollectionsStart } from './shop/shop.sagas' //not used anymore bc we have root saga

 
import rootReducer from './root-reducer';
import rootSaga from './root-saga'

const sagaMiddleware = createSagaMiddleware()

// const middlewares = [thunk]; //thunk will be replaced with saga
const middlewares = [sagaMiddleware]

//removes the logger during production (deployed - heroku) and only shows during the development 
if (process.env.NODE_ENV === 'development'){
  middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store);

export default { store, persistStore };