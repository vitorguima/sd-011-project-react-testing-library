import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente <NotFound/>', () => {
  it('Testa se página contém um heading h2 com o texto Page requested not found', () => {
    const { container } = renderWithRouter(<NotFound />);

    const heading = container.querySelector('h2');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Page requested not found/i);
  });

  it('Testa se a página mostra uma imagem específica.', () => {
    const { container } = renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = container.querySelector('img');

    expect(image).toBeInTheDocument();
    expect(image.src).toBe(url);
  });
});
