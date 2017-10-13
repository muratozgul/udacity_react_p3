import _ from 'lodash';
import { AsyncStorage } from 'react-native';
import { persistStore, createTransform } from 'redux-persist';
import { NavigationActions } from 'react-navigation';
import { initializeStore } from './redux';
import { iterateMap } from './modules/helpers';

const transformMapObjects = createTransform(
  (state) => {
    // memory -> storage
    console.log('writing', state);
    const mapObjects = Object.keys(state).filter(key => {
      return state[key] instanceof Map;
    });
    const newState = { ...state };
    mapObjects.forEach(key => {
      newState[key] = { __typename: 'Map', data: iterateMap(newState[key], (k, v) => [k, v])};
    });
    return newState;
  },
  (state) => {
    // storage -> memory
    console.log('reading', state);
    const mapObjects = Object.keys(state).filter(key => {
      return _.get(state[key], '__typename') === 'Map';
    });
    const newState = { ...state };
    mapObjects.forEach(key => {
      newState[key] = new Map(newState[key].data);
    });
    return newState;
  }
);


const persistStoreOptions = {
  storage: AsyncStorage,
  transforms: [transformMapObjects],
  // whitelist: []
  blacklist: ['rehydrate', 'nav']
};

const initializePersistStore = (store, callback) => {
  return persistStore(store, persistStoreOptions, () => {
    if (_.isFunction(callback)) {
      callback();
    }
  });
};

const APP = {};

export const onInitializeApp = () => {
  console.log('[onInitializeApp]');
  APP.store = initializeStore(APP);
  APP.persistor = null;
  return APP;
};

export const onAppDidMount = (APP) => {
  console.log('[onAppDidMount]');
  APP.persistor = initializePersistStore(APP.store, () => {
    // navigate
    const navAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'DeckList' })]
    });
    APP.store.dispatch(navAction);
  });
};
