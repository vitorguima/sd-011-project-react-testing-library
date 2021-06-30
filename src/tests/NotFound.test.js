import React from 'react';
// import { getByRole } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './RenderWithRouter';

test('Testa se página contém um `h2` com o texto `Page requested not found 😭`', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const heading2 = getByRole('heading', {
    level: 2,
  });
  expect(heading2).toHaveTextContent('Page requested not found');
});

test('Testa se página mostra a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
  renderWithRouter(<NotFound />);
  const notFoundImage = document.querySelector('img');

  expect(notFoundImage.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
