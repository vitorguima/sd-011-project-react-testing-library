import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste o componente NotFound.js', () => {
  test('Se página contém um heading h2 com o texto Page requested not found', () => {
    const { container } = renderWithRouter(<NotFound />);
    const getTag = container.querySelector('h2');
    expect(getTag.textContent).toBe('Page requested not found 😭');
  });

  // https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  test('Teste se página mostra a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const getTag = getByAltText(/Pikachu crying because the/);
    expect(getTag.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
