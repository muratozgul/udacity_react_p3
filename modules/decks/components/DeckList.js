import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { List, ListItem, Badge } from 'react-native-elements';
import { View, ActivityIndicator, Text, FlatList } from 'react-native';
import { iterateMap } from '../../helpers';
import { listStyle as styles } from './styles';
import DeckListItem from './DeckListItem';
import TextInputModal from './TextInputModal';

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEnterDeckNameModal: false,
      enterDeckNameError: null
    }
  }

  /****************************************************************************/
  // Event Handlers
  /****************************************************************************/
  onEnterDeckName = (password) => {
    if (password === 'admin') {
      this.props.toggleShowAdminOptions(true);
      this.onCloseEnterPasswordModal();
    } else {
      this.setState({ enterPasswordError: new Error('Incorrect password.') });
    }
  }

  onCloseEnterDeckNameModal = () => {
    this.setState({
      showEnterPasswordModal: false,
      enterPasswordError: null
    });
  }

  /****************************************************************************/
  // Render
  /****************************************************************************/
  renderDeckListItem = ({item}) => {
    return <DeckListItem deck={item} />;
  }

  renderEmpty() {
    return (
      <View style={styles.containerCentered}>
        <Text>You don't have any decks.</Text>
        <Text>Click the "New" button to add your first deck!</Text>
      </View>
    );
  }

  renderList() {
    return (
      <FlatList
        style={styles.list}
        data={iterateMap(this.props.decks)}
        renderItem={this.renderDeckListItem}
        keyExtractor={item => item.id}
      />
    );
  }

  render() {
    return (
      <View style={styles.listWrapper}>
        { this.props.decks.size === 0 ? this.renderEmpty() : this.renderList() }
        <TextInputModal
          label='Enter Deck Name'
          show={this.props.showEnterDeckNameModal}
          input={this.props.input}
          onSubmit={this.props.onSubmit}
          onCancel={this.props.onCancel}
          onChangeText={this.props.onChangeText}
          error={this.props.enterDeckNameError}
        />
      </View>
    );
  }
}

DeckList.propTypes = {
  decks: PropTypes.instanceOf(Map),
  showEnterDeckNameModal: PropTypes.bool
};

DeckList.defaultProps = {
  decks: new Map(),
  showEnterDeckNameModal: false
};

export default DeckList;
