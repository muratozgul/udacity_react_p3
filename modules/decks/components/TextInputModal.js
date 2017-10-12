import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { View, Modal, TextInput } from 'react-native';
import { modalStyle as styles } from './styles';

class TextInputModal extends Component {
  /****************************************************************************/
  // Event Handlers
  /****************************************************************************/
  onChangeText = (text) => {
    this.props.onChangeText(text);
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
            <FormLabel>{this.props.label}</FormLabel>
            <FormInput
              value={this.props.input}
              onChangeText={this.onChangeText}
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

TextInputModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  error: PropTypes.object
};

TextInputModal.defaultProps = {
};

export default TextInputModal;
