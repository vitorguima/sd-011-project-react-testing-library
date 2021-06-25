import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

test('Teste se página contém um h2 com o texto Page requested not found', () => {
  const { getByRole } = render(<NotFound />);
  const heading = getByRole('heading', { level: 2, name: /Page requested not found/i });
  expect(heading).toBeInTheDocument();
});

test('Teste se página mostra a imagem', () => {
  const { getByAltText } = render(<NotFound />);
  const getImg = getByAltText(/Pikachu crying because the page requested was not found/);
  expect(getImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
