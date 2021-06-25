import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const headingH2 = getByText(/Page requested not found/i, { selector: 'h2' });
  expect(headingH2).toBeInTheDocument();
});

test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const testImg = getByAltText(/Pikachu crying because the page requested was not found/);
  expect(testImg).toBeInTheDocument();
  expect(testImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
