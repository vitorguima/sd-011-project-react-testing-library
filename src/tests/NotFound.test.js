import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Testa se página contém um heading h2', () => {
  const { container } = render(
    <NotFound />,
  );
  const header = container.querySelector('h2');
  expect(header).toBeInTheDocument();
});

test('Testa se página contém um heading com o texto Page requested not found', () => {
  const { getByText } = render(
    <NotFound />,
  );
  const text = getByText('Page requested not found');
  expect(text).toBeInTheDocument();
});

test('Teste se página mostra uma imagem', () => {
  const { getByAltText } = render(
    <NotFound />,
  );
  const image = getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
