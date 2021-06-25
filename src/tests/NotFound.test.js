import React from 'react';
import renderWithRouter from '../Renderwithrouter';
import { NotFound } from '../components';

describe('Testa o componente Not Found', () => {
  it('Testa se a página contém o texto Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const textNotFound = getByText(/Page requested not found/);

    expect(textNotFound).toBeInTheDocument();
  });

  it('Verifica se a página tem a img correta', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const img = getAllByRole('img');

    expect(img[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
