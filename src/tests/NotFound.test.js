import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes do componente NotFound', () => {
  it('Verifica se a página contém um heading h2', () => {
    const { getByText, getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    const title = getByText('Page requested not found');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se a página contém a imagem', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const imageNotFound = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = getAllByRole('img');
    expect(image[1]).toBeInTheDocument();
    expect(image[1].src).toBe(imageNotFound);
  });
});
