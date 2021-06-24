import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

// test('', () => {});

it('Testa se página contém um heading h2 com o texto `Page requested not found`', () => {
  const { container } = render(<NotFound />);
  const titleH2 = container.querySelector('h2');
  expect(titleH2).toHaveTextContent(/Page requested not found 😭/);
});

it('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
  const { container } = render(<NotFound />);
  const img = container.querySelector('img');
  expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
