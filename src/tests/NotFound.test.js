import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Tests of NotFound component', () => {
  test('test if page has H2 with text Page requested not found 😭', () => {
    const { container } = render(<NotFound />);
    const h2 = container.querySelector('h2');
    expect(h2).toHaveTextContent('Page requested not found 😭');
  });
  test('test if page contains img https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const { container } = render(<NotFound />);
    const image = container.querySelector('.not-found-image');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
