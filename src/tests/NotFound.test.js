import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <NotFound.js />', () => {
  it('Verifica se a página contém h2 com o texto Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const headingText = getByRole('heading', { level: 2 });
    expect(headingText.innerHTML).toBe('Page requested not found'
    + '<span role="img" aria-label="Crying emoji"> 😭</span>');
  });

  it('Verifica se a página mostra a imagem especifica', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imageNotFound = getByAltText('Pikachu crying because '
      + 'the page requested was not found');
    expect(imageNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
