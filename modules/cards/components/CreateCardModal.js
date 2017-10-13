import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { View, Modal } from 'react-native';
import { modalStyle as styles } from './styles';

class CreateCardModal extends Component {
  /****************************************************************************/
  // Event Handlers
  /****************************************************************************/
  onChangeQuestion = (text) => {
    this.props.onChangeQuestion(text);
  }

  onChangeAnswer = (text) => {
    this.props.onChangeAnswer(text);
  }

  onSubmit = () => {
    this.props.onSubmit(this.props.input);
  }

  onCancel = () => {
    this.props.onCancel();
  }

  /****************************************************************************/
  // Render
  /****************************************************************************/
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.show}
        onRequestClose={() => {}}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modal}>
            <FormLabel>{'Question'}</FormLabel>
            <FormInput
              value={this.props.question}
              onChangeText={this.onChangeQuestion}
              inputStyle={styles.input}
            />
            <FormLabel>{'Answer'}</FormLabel>
            <FormInput
              value={this.props.answer}
              onChangeText={this.onChangeAnswer}
              inputStyle={styles.input}
            />
            {
              this.props.error &&
              <FormValidationMessage>
                {this.props.error.message}
              </FormValidationMessage>
            }
            <Button
              raised
              buttonStyle={styles.submitButton}
              textStyle={{ textAlign: 'center' }}
              title={'Submit'}
              onPress={this.onSubmit}
            />
            <Button
              raised
              buttonStyle={styles.cancelButton}
              textStyle={{ textAlign: 'center' }}
              title={'Cancel'}
              onPress={this.onCancel}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

CreateCardModal.propTypes = {
  show: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onChangeQuestion: PropTypes.func.isRequired,
  onChangeAnswer: PropTypes.func.isRequired,
  error: PropTypes.object
};

CreateCardModal.defaultProps = {
  show: false
};

export default CreateCardModal;
