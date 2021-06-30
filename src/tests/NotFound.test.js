import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 4 - componente NotFound', () => {
  test('Contém h2 com texto ', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const h2text = getByText(/Page requested not found/i);
    expect(h2text).toBeInTheDocument();
  });
  test('Contém imagem com src especifico', () => {
    const { queryAllByRole } = renderWithRouter(<NotFound />);
    const imagem = queryAllByRole('img');
    expect(imagem[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
