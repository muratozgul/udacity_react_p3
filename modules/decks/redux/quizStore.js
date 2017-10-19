import _ from 'lodash';
import { InteractionManager, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { createSelector } from 'reselect';
import { createActions } from '../../helpers';
import {
  setLocalNotification,
  clearLocalNotification
} from '../../helpers/pushNotifications';

/******************************************************************************/
// Initialization
/******************************************************************************/
const nameSpace = 'QUIZ';
const actions = createActions([
  'RESET',
  'START',
  'END',
  'ANSWER_CORRECT',
  'ANSWER_INCORRECT'
], nameSpace);

const initialState = {
  deck: null,
  currentCardIndex: 0,
  score: 0,
  showResults: false
};

/******************************************************************************/
// Action Creators
/******************************************************************************/
export const reset = () => {
  return { type: actions.RESET };
};

export const startQuiz = (route = true) => {
  return (dispatch, getState) => {
    const { selectedDeckId, decks } = getState().decks;
    if (selectedDeckId && decks.has(selectedDeckId)) {
      const deck = decks.get(selectedDeckId);
      if (deck.cards.length > 0) {
        dispatch({ type: actions.START, deck });
        if (route) {
          const navAction = NavigationActions.navigate({
            routeName: 'Quiz'
          });
          InteractionManager.runAfterInteractions(() => {
            dispatch(navAction);
          });
        }
      } else {
        Alert.alert('Deck has no cards', 'Please add cards to the deck to start the quiz');
      }
    } else {
      Alert.alert('Error', 'Something went wrong.');
    }
  };
};

export const restartQuiz = () => {
  return startQuiz(false);
};

export const closeQuiz = () => {
  return (dispatch, getState) => {
    const navAction = NavigationActions.back();
    InteractionManager.runAfterInteractions(() => {
      dispatch(navAction);
    });
  };
};

export const endQuiz = () => {
  return (dispatch, getState) => {
    clearLocalNotification().then(setLocalNotification);
    dispatch({ type: actions.END });
  };
};

export const answerCorrect = () => {
  return { type: actions.ANSWER_CORRECT };
};

export const answerIncorrect = () => {
  return { type: actions.ANSWER_INCORRECT };
};

/******************************************************************************/
// Action Handlers
/******************************************************************************/
const handleReset = (state, action) => {
  return { ...initialState };
};

const handleStart = (state, action) => {
  return {
    ...initialState,
    deck: action.deck
  };
};

const handleEnd = (state, action) => {
  return {
    ...state,
    showResults: true
  };
};

const handleAnswerCorrect = (state, action) => {
  if (state.currentCardIndex === state.deck.cards.length - 1) {
    action.asyncDispatch(endQuiz());
  }
  return {
    ...state,
    score: state.score + 1,
    currentCardIndex: state.currentCardIndex + 1
  };
};

const handleAnswerIncorrect = (state, action) => {
  if (state.currentCardIndex === state.deck.cards.length - 1) {
    action.asyncDispatch(endQuiz());
  }
  return {
    ...state,
    currentCardIndex: state.currentCardIndex + 1
  };
};

/******************************************************************************/
// Reducer Function
/******************************************************************************/
export const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.START:
      return handleStart(state, action);
    case actions.END:
      return handleEnd(state, action);
    case actions.ANSWER_CORRECT:
      return handleAnswerCorrect(state, action);
    case actions.ANSWER_INCORRECT:
      return handleAnswerIncorrect(state, action);
    // reset
    case actions.RESET:
      return handleReset(state, action);
    default:
      return state;
  }
};
