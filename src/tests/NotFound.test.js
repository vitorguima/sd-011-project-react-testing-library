import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

it('Teste se página contém um heading h2', () => {
  const { getByRole } = renderWithRouter(<NotFound />);

  const headingTwo = getByRole('heading', { level: 2 });
  expect(headingTwo.textContent).toBe('Page requested not found 😭');
});

it('Teste se página mostra a imagem ', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const image = getAllByRole('img');
  expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
