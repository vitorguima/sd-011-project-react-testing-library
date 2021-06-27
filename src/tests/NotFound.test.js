import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const h2NotFound = getByText('Page requested not found');
    expect(h2NotFound).toBeInTheDocument();
  });

  it('Se a página mostra a imagem do Pikachu chorando', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
