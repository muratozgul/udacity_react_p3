import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InteractionManager } from 'react-native';
import _ from 'lodash';
import DeckDetail from '../components/DeckDetail';
import withNavLifecycle from '../../helpers/withNavLifecycleHOC';
import { unselectDeck } from '../redux/decksStore';
import {
  updateQuestion, updateAnswer, submit, showModal, hideModal
} from '../../cards/redux/cardFormStore';
import { startQuiz } from '../redux/quizStore';

const componentDidUnmountInNav = (ownProps) => {
  InteractionManager.runAfterInteractions(() => {
    // ownProps.unselectDeck();
  });
};

const DeckDetailWNLC = withNavLifecycle(null, componentDidUnmountInNav)(DeckDetail, 'DeckDetail');

const mapStateToProps = (state, ownProps) => {
  const { selectedDeckId, decks } = state.decks;
  const { showModal, question, answer, error } = state.cardForm;
  return {
    deck: decks.get(selectedDeckId),
    show: showModal,
    question,
    answer,
    error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    unselectDeck: () => dispatch(unselectDeck()),
    showModal: () => dispatch(showModal()),
    onChangeQuestion: (text) => dispatch(updateQuestion(text)),
    onChangeAnswer: (text) => dispatch(updateAnswer(text)),
    onSubmit: () => dispatch(submit()),
    onCancel: () => dispatch(hideModal()),
    startQuiz: () => dispatch(startQuiz())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetailWNLC);
