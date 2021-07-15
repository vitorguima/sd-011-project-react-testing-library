import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Test the NotFound component', () => {
  test('Test if the page contains a heading h2 with the text', () => {
    const { container } = render(<NotFound />);
    const getAbout = container.querySelector('h2');

    expect(getAbout.textContent).toBe('Page requested not found 😭');
  });

  test('Test if the page shows the image', () => {
    const { container } = render(<NotFound />);
    const Img = container.querySelector('.not-found-image');

    expect(Img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
