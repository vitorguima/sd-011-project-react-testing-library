import React from 'react';
import NotFound from '../components/NotFound';
import RenderWithRouter from '../RenderWithRouter';

describe('Testa o componente NotFound.js ', () => {
  it('heading h2 com o texto Page requested not found 😭', () => {
    const { getByRole } = RenderWithRouter(<NotFound />);
    const h2Text = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(h2Text).toBeInTheDocument();
  });
  it('Testa existência de imagem', () => {
    const { getAllByRole } = RenderWithRouter(<NotFound />);
    const image = getAllByRole('img')[1];
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
