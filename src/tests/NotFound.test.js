import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa componente Not Found', () => {
  it('Verifica se contem heading h2 com o texto Page requested not found 😭', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const headingh2 = getByText(/Page requested not found/i);
    expect(headingh2).toBeInTheDocument();
  });

  it('Verifica se página mostra determinada imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imgGifPikachu = getByAltText(/Pikachu/i);
    expect(imgGifPikachu).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
