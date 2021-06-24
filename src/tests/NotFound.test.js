import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

test('Teste se página contém um h2 com o texto Page requested not found 😭', () => {
  const { container } = renderWithRouter(<NotFound />);
  const notFoundText = container.querySelector('h2');
  // https://stackoverflow.com/questions/58976251/checking-text-appears-inside-an-element-using-react-testing-library
  expect(notFoundText).toHaveTextContent('Page requested not found 😭');
});

test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { container } = renderWithRouter(<NotFound />);
  const notFoundImg = container.querySelector('img');
  // https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
