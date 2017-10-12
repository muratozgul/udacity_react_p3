import { StyleSheet } from 'react-native';

export const listStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listWrapper: {
    flex: 1
  },
  contentContainer: {
    backgroundColor: 'lightgrey'
  }
});

export const listItemStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
});

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
