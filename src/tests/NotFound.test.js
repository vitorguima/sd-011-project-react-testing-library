import { render } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

test('testa se contem h2 com texto', () => {
  const { getByRole } = render(<NotFound />);
  const h2 = getByRole('heading', { level: 2 });
  // console.log(h2.innerHTML);
  expect(h2.innerHTML).toMatch(/Page requested not found/i);
});

test('testa se aparece a imagem', () => {
  const { getAllByRole } = render(<NotFound />);
  const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const imagem = getAllByRole('img');
  // console.log(imagem);
  expect(imagem[1].src).toContain(img);
});
