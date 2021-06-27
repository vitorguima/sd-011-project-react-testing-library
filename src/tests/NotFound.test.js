import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente NotFound', () => {
  test('Teste se página contém um heading h2', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notExist = getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });

    expect(notExist).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const image = getByRole('img', {
      name: /Pikachu crying because the page requested was not found/,
    });

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
