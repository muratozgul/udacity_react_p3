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
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text>Deck: {deck.name}</Text>
        <Text>Card: {`${currentCardIndex + 1}/${deck.cards.length}`}</Text>
        <Text>Score: {score}</Text>
      </View>
    );
  }

  renderQuiz() {
    return (
      <View style={{ flex: 1}}>
        {this.renderInfo()}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Card card={this.props.currentCard} />
        </View>
        <Button
          raised
          buttonStyle={{ marginVertical: 20 }}
          backgroundColor='green'
          textStyle={{ textAlign: 'center' }}
          title={'Correct'}
          onPress={this.props.answerCorrect}
        />
        <Button
          raised
          backgroundColor='red'
          textStyle={{ textAlign: 'center' }}
          title={'Incorrect'}
          onPress={this.props.answerIncorrect}
        />
      </View>
    );
  }

  renderResult() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 18 }}>
            No more cards!
          </Text>
          <Text style={{ fontSize: 22, marginVertical: 20, fontWeight: 'bold' }}>
            Final score: {this.props.score}
          </Text>
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
      <View style={{ flex: 1, paddingVertical: 20 }}>
        {showResults ? this.renderResult() : this.renderQuiz()}
      </View>
    );
  }
}

Quiz.propTypes = {
  currentCardIndex: PropTypes.number,
  currentCard: PropTypes.object,
  answerCorrect: PropTypes.func.isRequired,
  answerIncorrect: PropTypes.func.isRequired,
  deck: PropTypes.object,
  score: PropTypes.number,
  showResults: PropTypes.bool,
  closeQuiz: PropTypes.func.isRequired
};

Quiz.defaultProps = {
};

export default Quiz;
