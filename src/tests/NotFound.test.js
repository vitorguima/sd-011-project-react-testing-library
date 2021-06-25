import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa funcionalidade do componente <NotFound />', () => {
  it('Teste se renderiza o heading com o texto Page requested not found 😭;', () => {
    const { container } = renderWithRouter(<NotFound />);
    const headerPage = container.querySelector('h2');
    expect(headerPage).toBeTruthy();
    expect(headerPage.textContent).toBe('Page requested not found 😭');
  });

  it('Testa se renderiza a imagem do Pikachu chorando', () => {
    const { container } = renderWithRouter(<NotFound />);
    const pikachuGif = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const gifImage = container.querySelector('.not-found-image');
    expect(gifImage.src).toBe(pikachuGif);
  });
});
