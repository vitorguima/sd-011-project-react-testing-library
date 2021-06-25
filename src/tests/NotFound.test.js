import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound, requisito 4', () => {
  it('Testa se a página contém um heading com o texto específico', () => {
    const { getByText } = renderWithRouter(<NotFound />);

    const heading = getByText(/Page requested not found/);
    expect(heading).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem específica', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);

    const imagems = getAllByRole('img');
    expect(imagems[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
