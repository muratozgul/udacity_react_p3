import _ from 'lodash';
import uuidv1 from 'uuid/v1';
import { InteractionManager } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { createSelector } from 'reselect';
import { createActions } from '../../helpers';

/******************************************************************************/
// Initialization
/******************************************************************************/
const nameSpace = 'DECKS';
const actions = createActions([
  'RESET',
  'CREATE',
  'DELETE',
  'UPDATE_RENAME', 'UPDATE_ADD_CARD', 'UPDATE_REMOVE_CARD',
  'SHOW_MODAL', 'HIDE_MODAL',
  'SELECT_DECK', 'UNSELECT_DECK'
], nameSpace);

const testMap = new Map();
testMap.set('1', { id: '1', name: 'TEST-DECK', cards: ['123', '456'] });

const initialState = {
  // decks: new Map()
  decks: testMap,
  selectedDeckId: null
};

/******************************************************************************/
// Action Creators
/******************************************************************************/
export const createDeck = (name) => {
  return { type: actions.CREATE, name };
};

export const deleteDeck = (id) => {
  return { type: actions.DELETE, id };
};

export const addCardToSelectedDeck = (cardId) => {
  return (dispatch, getState) => {
    const { selectedDeckId } = getState().decks;
    dispatch({
      type: actions.UPDATE_ADD_CARD,
      deckId: selectedDeckId,
      cardId
    });
  };
};

export const removeCardFromSelectedDeck = (cardId) => {
  return (dispatch, getState) => {
    const { selectedDeckId } = getState().decks;
    dispatch({
      type: actions.UPDATE_REMOVE_CARD,
      deckId: selectedDeckId,
      cardId
    });
  };
};

export const selectDeck = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: actions.SELECT_DECK, id });
    const navAction = NavigationActions.navigate({
      routeName: 'DeckDetail'
    });
    InteractionManager.runAfterInteractions(() => {
      dispatch(navAction);
    });
  };
};

export const unselectDeck = () => {
  return { type: actions.UNSELECT_DECK };
};

/******************************************************************************/
// Action Handlers
/******************************************************************************/
const handleReset = (state, action) => {
  return { ...initialState };
};

const handleCreateDeck = (state, action) => {
  const { name } = action;
  const id = uuidv1();
  const deck = { id, name, cards: [] };
  const newDecks = new Map(state.decks);
  newDecks.set(id, deck);
  return { ...state, decks: newDecks };
};

const handleDeleteDeck = (state, action) => {
  const { id } = action;
  if (state.decks.has(id)) {
    const newDecks = new Map(state.decks);
    newDecks.delete(id);
    return { ...state, decks: newDecks };
  }
  else {
    return state;
  }
};

const handleRenameDeck = (state, action) => {
  const { id, name } = action;
  if (state.decks.has(id)) {
    const newDecks = new Map(state.decks);
    const deck = newDecks.get(id);
    newDecks.set(id, { ...deck, name });
    return { ...state, decks: newDecks };
  }
  else {
    return state;
  }
};

const handleAddCardToDeck = (state, action) => {
  const { cardId, deckId } = action;
  if (state.decks.has(deckId)) {
    const deck = state.decks.get(deckId);
    const index = deck.cards.indexOf(cardId);
    if (index === -1) {
      const newDecks = new Map(state.decks);
      const newCards = deck.cards.slice();
      newCards.push(cardId);
      newDecks.set(deckId, { ...deck, cards: newCards });
      return { ...state, decks: newDecks };
    }
  }
  return state;
};

const handleRemoveCardFromDeck = (state, action) => {
  const { cardId, deckId } = action;
  if (state.decks.has(deckId)) {
    const deck = state.decks.get(deckId);
    const index = deck.cards.indexOf(cardId);
    if (index > -1) {
      const newDecks = new Map(state.decks);
      const newCards = newDecks.cards.filter(id => id !== cardId);
      newDecks.set(deckId, { ...deck, cards: newCards });
      return { ...state, decks: newDecks };
    }
  }
  return state;
};

const handleSelectDeck = (state, action) => {
  return {
    ...state,
    selectedDeckId: action.id
  };
};

const handleUnselectDeck = (state, action) => {
  return {
    ...state,
    selectedDeckId: null
  };
};

/******************************************************************************/
// Reducer Function
/******************************************************************************/
export const decksReducer = (state = initialState, action) => {
  switch (action.type) {
    // CRUD
    case actions.CREATE:
      return handleCreateDeck(state, action);
    case actions.DELETE:
      return handleDeleteDeck(state, action);
    case actions.UPDATE_RENAME:
      return handleRenameDeck(state, action);
    case actions.UPDATE_ADD_CARD:
      return handleAddCardToDeck(state, action);
    case actions.UPDATE_REMOVE_CARD:
      return handleRemoveCardFromDeck(state, action);
    // select
    case actions.SELECT_DECK:
      return handleSelectDeck(state, action);
    case actions.UNSELECT_DECK:
      return handleUnselectDeck(state, action);
    // reset
    case actions.RESET:
      return handleReset(state, action);
    default:
      return state;
  }
};
