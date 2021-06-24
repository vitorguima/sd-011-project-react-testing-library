import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testes do componente NotFound', () => {
  test('renderize h2 com texto Page requested not found 😭', () => {
    const { container } = render(<NotFound />);
    const h2 = container.querySelector('h2');
    expect(h2.textContent).toBe('Page requested not found 😭');
  });

  test('renderiza gif pikachu chorando', () => {
    const { container } = render(<NotFound />);
    const img = container.querySelector('img');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
