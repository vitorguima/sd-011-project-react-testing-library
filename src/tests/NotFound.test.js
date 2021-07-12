import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

it('Verifica se existe um h2 com Page requested not found 😭', () => {
  const { getByRole } = renderWithRouter(<NotFound />);

  const h2 = getByRole('heading');
  expect(h2.textContent).toBe('Page requested not found 😭');
});

it('Verifica se a img está correta', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);

  const img = getByAltText('Pikachu crying because the page requested was not found');
  expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
