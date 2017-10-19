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
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold'}}>{deck.name}</Text>
          <Text>{`${deck.cards.length} cards`}</Text>
        </View>
        <View>
          <Button
            raised
            buttonStyle={styles.addCardButton}
            textStyle={{ textAlign: 'center' }}
            title={'Add New Question'}
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
  deck: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  startQuiz: PropTypes.func.isRequired,
  show: PropTypes.bool,
  answer: PropTypes.string,
  question: PropTypes.string,
  onChangeQuestion: PropTypes.func.isRequired,
  onChangeAnswer: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  error: PropTypes.object
};

DeckDetail.defaultProps = {
};

export default DeckDetail;
