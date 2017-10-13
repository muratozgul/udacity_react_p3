import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import { detailStyle as styles } from './styles';
import CreateCardModal from '../../cards/components/CreateCardModal';

class DeckDetail extends Component {
  render() {
    const { deck } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <View style={{ alignItems: 'center' }}>
          <Text>{deck.name}</Text>
          <Text>{`${deck.cards.length} cards`}</Text>
        </View>
        <View>
          <Button
            raised
            buttonStyle={styles.addCardButton}
            textStyle={{ textAlign: 'center' }}
            title={'Add Card'}
            onPress={this.props.showModal}
          />
          <Button
            raised
            buttonStyle={styles.startQuizButton}
            textStyle={{ textAlign: 'center' }}
            title={'Start Quiz'}
            onPress={this.props.startQuiz}
          />
        </View>
        {
          <CreateCardModal
            show={this.props.show}
            answer={this.props.answer}
            question={this.props.question}
            onChangeQuestion={this.props.onChangeQuestion}
            onChangeAnswer={this.props.onChangeAnswer}
            onSubmit={this.props.onSubmit}
            onCancel={this.props.onCancel}
            error={this.props.error}
          />
        }
      </View>
    );
  }
}

DeckDetail.propTypes = {
  deck: PropTypes.object.isRequired
};

DeckDetail.defaultProps = {
};

export default DeckDetail;
