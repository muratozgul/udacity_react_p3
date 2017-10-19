import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Quiz from '../../../modules/decks/components/Quiz';

storiesOf('Quiz', module)
  .addDecorator(getStory =>
    <View style={{ flex: 1 }}>
      {getStory()}
    </View>
  )
  .add('question', () => {
    const deck = { name: 'Test-Deck', cards: [1, 2, 3] };
    const card = { question: 'Capital of France?', answer: 'Paris' };
    return (
      <Quiz
        currentCardIndex={0}
        currentCard={card}
        answerCorrect={() => {}}
        answerIncorrect={() => {}}
        deck={deck}
        score={0}
        showResults={false}
        closeQuiz={() => {}}
      />
    );
  })
  .add('result', () => {
    const deck = { name: 'Test-Deck', cards: [1, 2, 3] };
    const card = { question: 'Capital of France?', answer: 'Paris' };
    return (
      <Quiz
        currentCardIndex={3}
        currentCard={card}
        answerCorrect={() => {}}
        answerIncorrect={() => {}}
        deck={deck}
        score={1}
        showResults={true}
        closeQuiz={() => {}}
      />
    );
  });
