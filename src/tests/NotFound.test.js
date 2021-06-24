import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

it('Teste o componente <NotFound.js /> seu título e sua tag', () => {
  const { container } = renderWithRouter(<NotFound />);
  const titlePage = container.querySelector('h2');
  expect(titlePage).toBeTruthy();
  expect(titlePage.textContent).toBe('Page requested not found 😭');
});

it('Teste o componente <NotFound.js /> seu título e sua tag', () => {
  const { container } = renderWithRouter(<NotFound />);
  const imageSource = container.querySelector('.not-found-image');
  expect(imageSource.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
