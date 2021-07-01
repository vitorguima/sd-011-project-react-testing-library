import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente Not Found', () => {
  test('Testa se contém heading h2 com o texto Page requested not found', () => {
    const { container } = render(<NotFound />);
    const headingh2 = container.querySelector('h2');
    expect(headingh2.textContent).toBe('Page requested not found 😭');
  });

  test('Testa se mostra imagem já definida', () => {
    const { container } = render(<NotFound />);
    const image = container.querySelector('img');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
