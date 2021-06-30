import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Testa o se existe o texto Page Requested...', () => {
  const { getByRole } = render(<NotFound />);
  const heading = getByRole('heading', { level: 2, name: /Page requested not found/ });
  expect(heading).toBeInTheDocument();
});

test('Teste se a página contém a imagem com link https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif ', () => {
  const { getAllByRole } = render(<NotFound />);
  const image = getAllByRole('img');
  expect(image[1].src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
