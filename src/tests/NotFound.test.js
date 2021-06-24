import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requisito 04', () => {
  it('Test se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { container } = render(<NotFound />);
    const element = container.querySelector('h2');
    expect(element.textContent).toBe('Page requested not found 😭');
  });

  it('Teste se página mostra a imagem', () => {
    const { container } = render(<NotFound />);
    const element = container.querySelector('img');
    expect(element.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
