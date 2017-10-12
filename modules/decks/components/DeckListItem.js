import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { List, ListItem, Badge } from 'react-native-elements';
import { View, ActivityIndicator, Text, FlatList } from 'react-native';
import { listItemStyle as styles } from './styles';

class DeckListItem extends Component {
  render() {
    const { deck } = this.props;
    return (
      <ListItem
        title={deck.name}
        subtitle={`${deck.cards.length} cards`}
        containerStyle={styles.container}
      />
    );
  }
}

DeckListItem.propTypes = {
  deck: PropTypes.object.isRequired
};

DeckListItem.defaultProps = {
};

export default DeckListItem;
