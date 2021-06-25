import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <NotFound.js />', () => {
  it('Testa se página contém heading h2 com o texto Page requested not found 😭.', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });

  it('Testa se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFoundImage = getByAltText(/Pikachu crying because the page/);
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
