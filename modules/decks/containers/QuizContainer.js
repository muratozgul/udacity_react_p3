import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InteractionManager } from 'react-native';
import _ from 'lodash';
import Quiz from '../components/Quiz';
import { answerCorrect, answerIncorrect, closeQuiz, restartQuiz } from '../redux/quizStore';
import { submit, updateDeckName, hideEnterDeckNameModal } from '../redux/deckFormStore';

const mapStateToProps = (state, ownProps) => {
  const { deck, currentCardIndex, score, showResults } = state.quiz;
  const { cards } = state.cards;
  const currentCardId = deck.cards[currentCardIndex];

  return {
    deck,
    currentCard: cards.get(currentCardId),
    currentCardIndex,
    score,
    showResults
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    answerCorrect: () => dispatch(answerCorrect()),
    answerIncorrect: () => dispatch(answerIncorrect()),
    closeQuiz: () => dispatch(closeQuiz()),
    restartQuiz: () => dispatch(restartQuiz())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
