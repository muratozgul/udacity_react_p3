import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InteractionManager } from 'react-native';
import _ from 'lodash';
import DeckList from '../components/DeckList';
import { submit, updateDeckName, hideEnterDeckNameModal } from '../redux/deckFormStore';

const mapStateToProps = (state, ownProps) => {
  const { decks } = state.decks;
  const { showEnterDeckNameModal, deckName, enterDeckNameError } = state.deckForm;
  return {
    decks,
    showEnterDeckNameModal,
    enterDeckNameError,
    input: deckName
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: (input) => dispatch(updateDeckName(input)),
    onCancel: () => dispatch(hideEnterDeckNameModal()),
    onSubmit: (input) => dispatch(submit(input))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
