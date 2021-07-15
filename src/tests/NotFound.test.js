import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

test('if contains a h2 with the text Page requested not found', () => {
  const { container } = renderWithRouter(<NotFound />);
  const [h2] = container.getElementsByTagName('h2');

  expect(h2).toBeInTheDocument();
  expect(h2).toHaveTextContent(/Page requested not found/i);
});

test('if show the correct image URL', () => {
  const { container } = renderWithRouter(<NotFound />);
  const [img] = container.getElementsByTagName('img');

  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
