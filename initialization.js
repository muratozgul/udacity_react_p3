import _ from 'lodash';
import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import { NavigationActions } from 'react-navigation';
import { initializeStore } from './redux';

const persistStoreOptions = {
  storage: AsyncStorage,
  whitelist: []
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
      actions: [NavigationActions.navigate({ routeName: 'Decks' })]
    });
    APP.store.dispatch(navAction);
  });
};
