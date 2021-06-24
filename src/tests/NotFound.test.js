import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

test('A página contém um heading h2 com o texto Page requested not found', () => {
  const { getByText } = render(<NotFound />);
  const header = getByText('Page requested not found');
  expect(header).toBeInTheDocument();
});

test('A página contém a seguinte imagem de uma Pokédex', () => {
  const { getByAltText } = render(<NotFound />);
  const img = getByAltText('Pikachu crying because the page requested was not found');
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
