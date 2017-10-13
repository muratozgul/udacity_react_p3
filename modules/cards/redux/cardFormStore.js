import _ from 'lodash';
import uuidv1 from 'uuid/v1';
import { createSelector } from 'reselect';
import { createActions, isNonBlankString } from '../../helpers';
import { createCard, addCardToDeck, removeCardFromDeck } from './cardsStore';

/******************************************************************************/
// Initialization
/******************************************************************************/
const nameSpace = 'CARD_FORM';
const actions = createActions([
  'SHOW_MODAL', 'HIDE_MODAL',
  'UPDATE_QUESTION', 'UPDATE_ANSWER',
  'SET_ERROR'
], nameSpace);

const initialState = {
  showModal: false,
  error: null,
  question: '',
  answer: ''
};

/******************************************************************************/
// Action Creators
/******************************************************************************/
export const showModal = () => {
  return { type: actions.SHOW_MODAL };
};

export const hideModal = () => {
  return { type: actions.HIDE_MODAL };
};

export const updateQuestion = (question) => {
  return { type: actions.UPDATE_QUESTION, question };
};

export const updateAnswer = (answer) => {
  return { type: actions.UPDATE_ANSWER, answer };
};

export const submit = () => {
  return (dispatch, getState) => {
    const { question, answer } = getState().cardForm;
    if (isNonBlankString(question) && isNonBlankString(answer)) {
      dispatch(createCard(question, answer));
      dispatch(hideModal());
    } else {
      const error = new Error('Question or answer can not be blank.');
      dispatch({ type: actions.SET_ERROR, error: { message: error.message } });
    }
  };
};

/******************************************************************************/
// Action Handlers
/******************************************************************************/
const handleReset = (state, action) => {
  return { ...initialState };
};

const handleShowModal = (state, action) => {
  return {
    ...state,
    showModal: true,
    error: null,
    question: '',
    answer: ''
  };
};

const handleHideModal = (state, action) => {
  return {
    ...state,
    showModal: false
  };
};

const handleUpdateQuestion = (state, action) => {
  return {
    ...state,
    question: action.question,
    error: null
  };
};

const handleUpdateAnswer = (state, action) => {
  return {
    ...state,
    answer: action.answer,
    error: null
  };
};

const handleSetError = (state, action) => {
  return {
    ...state,
    error: action.error
  };
};

/******************************************************************************/
// Reducer Function
/******************************************************************************/
export const cardFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOW_MODAL:
      return handleShowModal(state, action);
    case actions.HIDE_MODAL:
      return handleHideModal(state, action);
    case actions.UPDATE_QUESTION:
      return handleUpdateQuestion(state, action);
    case actions.UPDATE_ANSWER:
      return handleUpdateAnswer(state, action);
    case actions.SET_ERROR:
      return handleSetError(state, action);
    case actions.RESET:
      return handleReset(state, action);
    default:
      return state;
  }
};
