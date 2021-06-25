import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Infos da página notFound', () => {
  const { container } = render(<NotFound />);
  const h2Text = container.querySelector('h2');
  expect(h2Text.textContent).toBe('Page requested not found 😭');

  const imgPikachu = container.querySelector('img');
  expect(imgPikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
