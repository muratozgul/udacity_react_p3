import _ from 'lodash';
import uuidv1 from 'uuid/v1';
import { createSelector } from 'reselect';
import { createActions, isNonBlankString } from '../../helpers';
import { createDeck } from './decksStore';

/******************************************************************************/
// Initialization
/******************************************************************************/
const nameSpace = 'DECK_FORM';
const actions = createActions([
  'SHOW_MODAL', 'HIDE_MODAL', 'UPDATE_DECK_NAME', 'SET_ERROR'
], nameSpace);

const initialState = {
  showEnterDeckNameModal: false,
  enterDeckNameError: null,
  deckName: ''
};

/******************************************************************************/
// Action Creators
/******************************************************************************/
export const showEnterDeckNameModal = () => {
  return { type: actions.SHOW_MODAL };
};

export const hideEnterDeckNameModal = () => {
  return { type: actions.HIDE_MODAL };
};

export const updateDeckName = (name) => {
  return { type: actions.UPDATE_DECK_NAME, name };
};

export const submit = (name) => {
  if (isNonBlankString(name)) {
    return (dispatch, getState) => {
      dispatch(createDeck(name));
      dispatch(hideEnterDeckNameModal());
    };
  } else {
    const error = new Error('Deck name can not be blank.');
    return { type: actions.SET_ERROR, error: { message: error.message } };
  }
}

/******************************************************************************/
// Action Handlers
/******************************************************************************/
const handleReset = (state, action) => {
  return { ...initialState };
};

const handleShowEnterDeckNameModal = (state, action) => {
  return {
    ...state,
    showEnterDeckNameModal: true,
    enterDeckNameError: null,
    deckName: ''
  };
};

const handleHideEnterDeckNameModal = (state, action) => {
  return {
    ...state,
    showEnterDeckNameModal: false
  };
};

const handleUpdateDeckName = (state, action) => {
  return {
    ...state,
    deckName: action.name,
    enterDeckNameError: null
  };
};

const handleSetError = (state, action) => {
  return {
    ...state,
    enterDeckNameError: action.error
  };
};

/******************************************************************************/
// Reducer Function
/******************************************************************************/
export const deckFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOW_MODAL:
      return handleShowEnterDeckNameModal(state, action);
    case actions.HIDE_MODAL:
      return handleHideEnterDeckNameModal(state, action);
    case actions.UPDATE_DECK_NAME:
      return handleUpdateDeckName(state, action);
    case actions.SET_ERROR:
      return handleSetError(state, action);
    case actions.RESET:
      return handleReset(state, action);
    default:
      return state;
  }
};
