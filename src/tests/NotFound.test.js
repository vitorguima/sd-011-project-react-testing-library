import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('', () => {
  const { container } = render(<NotFound />);
  const getAbout = container.querySelector('h2');
  expect(getAbout.textContent).toBe('Page requested not found 😭');

  const getImg = container.querySelector('.not-found-image');
  expect(getImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
