import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('verificando se a página tem um h2 com o texto de erro', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const headerTwo = getByRole('heading', { level: 2 });
  expect(headerTwo).toBeInTheDocument();
  expect(headerTwo.innerHTML)
    .toBe('Page requested not found<span role="img" aria-label="Crying emoji"> 😭</span>');
});

it('verificando se a pagina contém uma img com endereço específico', () => {
  const { container } = renderWithRouter(<NotFound />);
  const img = container.querySelector('img');
  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
