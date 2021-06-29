import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente "NotFound.js"', () => {
  test('Teste se página contém um heading h2 com o Page requested not found', () => {
    const { getByRole, history } = renderWithRouter(<NotFound />);

    history.push('/rota-que-nao-existe');
    const heading = getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem com um link específico', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const img = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
