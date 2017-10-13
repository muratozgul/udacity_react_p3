import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InteractionManager } from 'react-native';
import _ from 'lodash';
import Quiz from '../components/Quiz';
import { answerCorrect, answerIncorrect, closeQuiz } from '../redux/quizStore';
import { submit, updateDeckName, hideEnterDeckNameModal } from '../redux/deckFormStore';

const mapStateToProps = (state, ownProps) => {
  const { deck, currentCardIndex, score, showResults } = state.quiz;
  const { cards } = state.cards;
  const currentCardId = deck.cards[currentCardIndex];
  console.log('deck', deck);
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
    closeQuiz: () => dispatch(closeQuiz())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
