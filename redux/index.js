import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import asyncDispatchMiddleware from './asyncDispatchMiddleware'
import { rehydrateReducer } from './rehydrateStore';
import { navReducerWithCurrentRouteName } from '../navigation/navStore';
import { decksReducer, deckFormReducer } from '../modules/decks/redux';

export const initializeStore = (initialState) => {
  const middlewares = [thunk, asyncDispatchMiddleware];
  const reducer = combineReducers({
    rehydrate: rehydrateReducer,
    nav: navReducerWithCurrentRouteName,
    decks: decksReducer,
    deckForm: deckFormReducer
  });
  // @see https://github.com/jhen0409/react-native-debugger#options
  const enhancer = composeWithDevTools({})(applyMiddleware(...middlewares));

  // @see https://github.com/rt2zz/redux-persist
  const createStoreWithRehydrate = compose(autoRehydrate())(createStore);
  const store = createStoreWithRehydrate(reducer, initialState, enhancer);

  return store;
}
