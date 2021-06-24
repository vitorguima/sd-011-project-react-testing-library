import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

test('Testando o componente <NotFound.js />', () => {
  const { container } = renderWithRouter(<NotFound />);
  const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const h2Title = container.querySelector('h2');
  const img = container.querySelector('img');
  expect(h2Title.textContent).toBe('Page requested not found 😭');
  expect(img.src).toBe(imgURL);
});
