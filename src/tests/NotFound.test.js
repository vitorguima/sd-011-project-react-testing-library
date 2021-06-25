import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um h2 com o texto Page requested not found', () => {
    const { container } = render(<NotFound />);
    const tagh2 = container.querySelector('h2');
    expect(tagh2.textContent).toBe('Page requested not found 😭');
  });

  test('Teste se página mostra a imagem pedida', () => {
    const { container } = render(<NotFound />);
    const img = container.querySelector('img');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
