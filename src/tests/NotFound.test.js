import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

test('Renderiza o título `Page requested not found`', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const title = getByText(/Page requested not found/i);
  expect(title).toBeInTheDocument();
});

test('Renderiza a imagem apropriada', () => {
  renderWithRouter(<NotFound />);
  const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const image = document.querySelector('img');
  expect(image.src).toBe(url);
});
