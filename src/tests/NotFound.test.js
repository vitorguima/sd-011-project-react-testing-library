import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando componente NotFound - R4', () => {
  it('Verifica se o componente possui o texto correto', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const textNotFound = getByText(/Page requested not found/);
    expect(textNotFound).toBeInTheDocument();
  });
  it('Teste se a página contém a img correta.', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const img = getAllByRole('img');
    expect(img[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
