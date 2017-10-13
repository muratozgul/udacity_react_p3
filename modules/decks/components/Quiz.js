import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import Card from '../../cards/components/Card';
import { cardStyle as styles } from './styles';

class Quiz extends Component {
  renderInfo() {
    const { deck, currentCardIndex, score } = this.props;
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Deck: {deck.name}</Text>
        <Text>Card: {`${currentCardIndex + 1}/${deck.cards.length}`}</Text>
        <Text>Score: {score}</Text>
      </View>
    );
  }

  renderQuiz() {
    return (
      <View>
        <Card card={this.props.currentCard} />
        <Button
          raised
          buttonStyle={{}}
          textStyle={{ textAlign: 'center' }}
          title={'Correct'}
          onPress={this.props.answerCorrect}
        />
        <Button
          raised
          buttonStyle={{}}
          textStyle={{ textAlign: 'center' }}
          title={'Incorrect'}
          onPress={this.props.answerIncorrect}
        />
      </View>
    );
  }

  renderResult() {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <Text>No more cards!</Text>
          <Text>Final score: {this.props.score}</Text>
        </View>
        <Button
          raised
          buttonStyle={{}}
          textStyle={{ textAlign: 'center' }}
          title={'Done'}
          onPress={this.props.closeQuiz}
        />
      </View>
    );
  }

  render() {
    const { deck, currentCardIndex, score, showResults } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        {!showResults && this.renderInfo()}
        {showResults ? this.renderResult() : this.renderQuiz()}
      </View>
    );
  }
}

Quiz.propTypes = {
  currentCard: PropTypes.object
};

Quiz.defaultProps = {
};

export default Quiz;
