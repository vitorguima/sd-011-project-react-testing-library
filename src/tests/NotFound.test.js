import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './helper/renderWithRouter';

describe('Testes do componente "NotFound"', () => {
  it('Teste se página contém um heading h2 com o texto "Page requested not found 😭"',
    () => {
      const { getByText, getAllByRole } = renderWithRouter(<NotFound />);
      const heading = getByText(/Page requested not found/i);
      const emoji = getAllByRole('img');
      expect(emoji[0]).toBeInTheDocument();
      expect(heading.localName).toBe('h2');
    });

  it('Teste se página mostra a imagem', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const img = getAllByRole('img')[1];
    const imagePath = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toBe(imagePath);
  });
});
