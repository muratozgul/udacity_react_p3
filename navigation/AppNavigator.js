import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import AppLoadingScreen from './AppLoadingScreen';
import DeckList from '../modules/decks/containers/DeckListContainer';
import DeckDetail from '../modules/decks/containers/DeckDetailContainer';
import Quiz from '../modules/decks/containers/QuizContainer';
import { showEnterDeckNameModal } from '../modules/decks/redux/deckFormStore';

export const AppNavigator = StackNavigator({
  AppLoading: { screen: AppLoadingScreen },
  DeckList: {
    screen: DeckList,
    navigationOptions: ({ navigation, screenProps }) => ({
      title: 'Decks',
      headerRight: (
        <Button backgroundColor={'transparent'}
          title='New' color='black'
          onPress={() => { navigation.dispatch(showEnterDeckNameModal()) }}
        />
      )
    })
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      title: 'Deck Details'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  }
}, {
  initialRouteName: 'AppLoading'
});

// @see https://github.com/react-community/react-navigation/tree/master/examples/ReduxExample
const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav })}
  />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ nav: state.nav });

export default connect(mapStateToProps)(AppWithNavigationState);
