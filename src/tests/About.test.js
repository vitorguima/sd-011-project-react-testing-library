import React from 'react';
import { About } from '../components';
import renderWithRouter from './RenderWithRouter';

test('Testa se a página contém um heading `h2` com o texto `About Pokédex`', () => {
  const { getByRole } = renderWithRouter(<About />);
  const heading = getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(heading).toBeInTheDocument();
});

test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const firstParagraph = getByText(/This application simulates a Pokédex/);
  const secondParagraph = getByText(/One can filter Pokémons by type/);

  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
});

// estava em dúvida e encontrei a forma na própria biblioteca => "ByAltText find by img alt * attribute getByAltText" => https://testing-library.com/docs/dom-testing-library/cheatsheet/#queries
test('Testa se a página contém a imagem de uma Pokédex', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const pokedexAltImage = getByAltText(/Pokédex/i);

  expect(pokedexAltImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
