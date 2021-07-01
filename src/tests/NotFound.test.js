import React from 'react';
import { NotFound } from '../components';
import renderWhithRouter from '../renderWithRouter';

describe('Requisito 04 teste NotFound', () => {
  it('testa se a pagina tem h2 com Page requested not found', () => {
    const { getByText } = renderWhithRouter(<NotFound />);
    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });

  it('Deve testar se a pagina mostra a imagem', () => {
    const { getByAltText } = renderWhithRouter(<NotFound />);
    const image = getByAltText(/Pikachu crying/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
