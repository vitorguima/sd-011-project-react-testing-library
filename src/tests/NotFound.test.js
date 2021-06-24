import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound tests', () => {
  test('Teste se pág contém um heading com texto Page requested not found 😭', () => {
    const { container } = render(<NotFound />);
    const title = container.querySelector('h2');
    expect(title.textContent).toBe('Page requested not found 😭');
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { container } = render(<NotFound />);
    const img = container.querySelector('img');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
