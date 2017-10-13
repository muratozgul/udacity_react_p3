import _ from 'lodash';
import uuidv1 from 'uuid/v1';
import { InteractionManager } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { createSelector } from 'reselect';
import { createActions } from '../../helpers';
import { addCardToSelectedDeck, removeCardFromSelectedDeck } from '../../decks/redux/decksStore';

/******************************************************************************/
// Initialization
/******************************************************************************/
const nameSpace = 'CARDS';
const actions = createActions([
  'RESET',
  'CREATE',
  'DELETE',
], nameSpace);

const testMap = new Map();
testMap.set('123', { id: '123', question: 'Question1', answer: 'Answer1' });
testMap.set('456', { id: '456', question: 'Question2', answer: 'Answer2' });

const initialState = {
  // cards: new Map()
  cards: testMap
};

/******************************************************************************/
// Action Creators
/******************************************************************************/
export const createCard = (question, answer) => {
  return { type: actions.CREATE, question, answer };
};

export const deleteCard = (id) => {
  return { type: actions.DELETE, id };
};

/******************************************************************************/
// Action Handlers
/******************************************************************************/
const handleReset = (state, action) => {
  return { ...initialState };
};

const handleCreateCard = (state, action) => {
  const { question, answer } = action;
  const id = uuidv1();
  const card = { id, question, answer };
  const newCards = new Map(state.cards);
  newCards.set(id, card);
  action.asyncDispatch(addCardToSelectedDeck(id));
  return { ...state, cards: newCards };
};

const handleDeleteCard = (state, action) => {
  const { id } = action;
  if (state.cards.has(id)) {
    const newCards = new Map(state.cards);
    newCards.delete(id);
    action.asyncDispatch(removeCardFromSelectedDeck(id));
    return { ...state, cards: newCards };
  }
  else {
    return state;
  }
};

/******************************************************************************/
// Reducer Function
/******************************************************************************/
export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    // CRUD
    case actions.CREATE:
      return handleCreateCard(state, action);
    case actions.DELETE:
      return handleDeleteCard(state, action);
    // reset
    case actions.RESET:
      return handleReset(state, action);
    default:
      return state;
  }
};
