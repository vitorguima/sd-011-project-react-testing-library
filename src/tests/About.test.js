import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

test('Verifica se a página tem título com o texto "About PokéDex"', () => {
  renderWithRouter(<About />);

  const title = screen.getByText(/About Pokédex/i);
  expect(title).toBeInTheDocument();
});

test('Verifica se há um h2 na página', () => {
  const { container } = renderWithRouter(<About />);

  const title = container.querySelector('h2');
  expect(title).toBeInTheDocument();
});

test('Verifica se a página contém dois parágrafos', () => {
  const { container } = renderWithRouter(<About />);

  const paragraph = container.querySelectorAll('p');
  const expectedParagraphsLength = 2;

  expect(paragraph.length).toBe(expectedParagraphsLength);
  expect(paragraph[0].textContent.length).toBeGreaterThan(0);
  expect(paragraph[1].textContent.length).toBeGreaterThan(0);
});

test('Verifica se a página contém uma imagem específica', () => {
  renderWithRouter(<About />);

  const img = screen.getByAltText('Pokédex');
  expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
