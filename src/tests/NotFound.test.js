import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

test('Verifica se a página tem título com o texto "Page requested not found"', () => {
  renderWithRouter(<NotFound />);

  const title = screen.getByText(/Page requested not found/i);
  expect(title).toBeInTheDocument();
});

test('Verifica se há um h2 na página', () => {
  const { container } = renderWithRouter(<NotFound />);

  const title = container.querySelector('h2');
  expect(title).toBeInTheDocument();
});

test('Verifica se a página contém uma imagem específica', () => {
  const { container } = renderWithRouter(<NotFound />);

  const img = container.querySelector('.not-found-image');
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
