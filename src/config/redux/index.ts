import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';


export function configureStore(preloadedState?: any) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)));

  // sagaMiddleware.run()

  return store
}
