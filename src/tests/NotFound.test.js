import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const title = getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(title).toBeInTheDocument();
});

test('', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const notF = getByAltText('Pikachu crying because the page requested was not found');
  expect(notF).toBeInTheDocument();
  expect(notF.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
