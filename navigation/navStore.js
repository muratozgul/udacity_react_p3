import _ from 'lodash';
import { NavigationActions } from 'react-navigation';
import { createActions } from '../modules/helpers';
import { AppNavigator } from './AppNavigator';

/******************************************************************************/
// Initialization
/******************************************************************************/

// used for debouncing(~throttling) nav events by user
// helps with app stability and prevents navigating during transition animation
const MIN_NAV_INTERVAL_MS = 160;

const initialNavState = AppNavigator.router.getStateForAction(
  NavigationActions.init()
);

const initialState = {
  ...initialNavState,
  currentRouteName: null,
  previousRouteName: null,
  lastNavigationTime: Date.now()
};

/******************************************************************************/
// Helper Functions
/******************************************************************************/
const debounce = (state, now) => {
  const last = state.lastNavigationTime;
  return last + MIN_NAV_INTERVAL_MS > now;
};

const isAnyNavAction = (action) => {
  return [
    NavigationActions.NAVIGATE,
    NavigationActions.BACK,
    NavigationActions.RESET
  ].indexOf(action.type) > -1;
};

const isNavAction = (action) => {
  return action.type === NavigationActions.NAVIGATE;
}

const getRouteName = (state) => {
  // @see https://github.com/react-community/react-navigation/issues/51#issuecomment-320963882
  if (_.isNumber(state.index) && Array.isArray(state.routes)) {
    const route = state.routes[state.index];
    return getRouteName(route) || route.routeName;
  } else {
    return null;
  }
};

/******************************************************************************/
// Reducer Function
/******************************************************************************/
export const navReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
};

export const navReducerWithCurrentRouteName = (state = initialState, action) => {
  const now = Date.now();
  let lastNavigationTime = state.lastNavigationTime;

  if (isNavAction(action) && debounce(state, now)) {
    // prevents "double-clicking -> double-navigating-to-same-page"
    return state;
  }

  let previousRouteName = state.previousRouteName;
  if (isAnyNavAction(action)) {
    previousRouteName = state.currentRouteName;
    lastNavigationTime = now;
  }

  const newState = navReducer(state, action);

  return {
    ...newState,
    previousRouteName,
    lastNavigationTime,
    currentRouteName: getRouteName(newState)
  };
};
