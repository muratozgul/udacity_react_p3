import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import DeckDetail from '../../../modules/decks/components/DeckDetail';

storiesOf('DeckDetail', module)
  .addDecorator(getStory =>
    <View style={{ flex: 1 }}>
      {getStory()}
    </View>
  )
  .add('deck', () => {
    const deck = {
      name: 'Test-Deck',
      cards: [1, 2, 3]
    };
    return (
      <DeckDetail
        deck={deck}
        question={''}
        answer={''}
        showModal={() => {}}
        startQuiz={() => {}}
        onChangeQuestion={() => {}}
        onChangeAnswer={() => {}}
        onSubmit={() => {}}
        onCancel={() => {}}
        error={null}
      />
    );
  });
