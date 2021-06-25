import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found',
    () => {
      const { getByRole } = renderWithRouter(<NotFound />);
      const headH2 = getByRole(
        'heading', { level: 2, name: 'Page requested not found Crying emoji' },
      );
      expect(headH2).toBeInTheDocument();
    });
  it('Teste se a página contém a seguinte imagem de uma Pokédex.', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
