import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('4 - Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto `Page requested not found`',
    () => {
      const { getByRole } = renderWithRouter(<NotFound />);
      const title = getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      });
      expect(title).toBeInTheDocument();
    });

  it('Teste se página mostra uma imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toBeInTheDocument();

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
