import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { container } = renderWithRouter(<NotFound />);
    const titleNotFound = container.querySelector('h2');
    expect(titleNotFound.textContent).toBe('Page requested not found 😭');
  });

  it('se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { container } = renderWithRouter(<NotFound />);
    const image = container.querySelector('img');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
