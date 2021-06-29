import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 4 - componente NotFound', () => {
  test('test1 ', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const h2text = getByText(/Page requested not found/i);
    expect(h2text).toBeInTheDocument();
  });
  test('test2', () => {
    const { queryAllByRole } = renderWithRouter(<NotFound />);
    const imagem = queryAllByRole('img');
    expect(imagem[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
