import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { name, version } from '../package.json';
import rootReducer from './reducers';

export default function configureStore(initialState, helpersConfig) {
  const middleware = [thunk];

  let enhancer;
  const composeEnhancers = composeWithDevTools({
    name: `${name}@${version}`,
  });

  enhancer = composeEnhancers(applyMiddleware(...middleware));

  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}
