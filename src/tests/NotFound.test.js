import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente <NotFound.js />', () => {
  test('Teste se contém um h2 com o texto "Page requested not found 😭"', () => {
    const { getByText, container } = renderWithRouter(<NotFound />);

    /** Verifica se o texto é "Page requested not found" */
    const h2 = container.querySelector('h2');
    expect(h2).toHaveTextContent('Page requested not found');

    /** Verifica se o emoji está na página */
    const emoji = getByText('😭');
    expect(emoji).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { container } = renderWithRouter(<NotFound />);
    const notFoundImage = container.querySelector('.not-found-image');
    const urlImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(notFoundImage).toHaveAttribute('src', urlImage);
  });
});
