import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import DeckList from '../../../modules/decks/components/DeckList';

storiesOf('DeckList', module)
  .addDecorator(getStory =>
    <View style={{ flex: 1 }}>
      {getStory()}
    </View>
  )
  .add('empty', () => {
    return (
      <DeckList decks={[]} />
    );
  })
  .add('populated', () => {
    return (
      <DeckList decks={[{ id: 1 }]} />
    );
  });
