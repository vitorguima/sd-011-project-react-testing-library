import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4 - Teste o componente <Not Found/>', () => {
  it('Teste se a página contém um heading h2', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const element = getByRole('heading', {
      name: 'Page requested not found Crying emoji' });
    expect(element).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText(/not found/);
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
