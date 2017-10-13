import { StyleSheet } from 'react-native';

export const modalStyle = StyleSheet.create({
  modalWrapper: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modal: {
    height: 300, marginHorizontal: 50, marginTop: 100, backgroundColor: 'white',
    borderWidth: 1, borderColor: 'darkgray',
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 10
  },
  submitButton: {
    backgroundColor: '#f4731c', marginTop: 10
  },
  cancelButton: {
    marginTop: 10
  }
});

export const cardStyle = StyleSheet.create({

});
