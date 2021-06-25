import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { container } = render(<NotFound />);
    const tagh2 = container.querySelector('h2');
    expect(tagh2.textContent).toBe('Page requested not found 😭');
  });

  test('Teste se a página contém uma imagem da Pokédex já definida', () => {
    const { container } = render(<NotFound />);
    const img = container.querySelector('img');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
