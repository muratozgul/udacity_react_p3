import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import { cardStyle as styles } from './styles';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false
    };
  }

  toggleShowAnswer = () => {
    this.setState((prevState, props) => {
      return { showAnswer: !prevState.showAnswer };
    });
  }

  render() {
    const { card } = this.props;
    const { showAnswer } = this.state;
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 18, fontWeight: 'bold',
              textDecorationLine: 'underline'
            }}
          >
            {showAnswer ? 'Answer' : 'Question'}
          </Text>
          <Text style={{ fontSize: 22, marginVertical: 20 }}>
            {showAnswer ? card.answer : card.question}
          </Text>
        </View>
        <View>
          <Button
            raised
            buttonStyle={{}}
            textStyle={{ textAlign: 'center' }}
            title={`Show ${showAnswer ? 'Question' : 'Answer'}`}
            onPress={this.toggleShowAnswer}
          />
        </View>
      </View>
    );
  }
}

Card.propTypes = {
  card: PropTypes.object.isRequired
};

Card.defaultProps = {
};

export default Card;
