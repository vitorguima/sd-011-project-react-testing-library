import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Testa se existe as informações da Pokedex', () => {
  const { getByText } = renderWithRouter(<About />);

  const PokedexInfo = getByText(/This application simulates a Pokédex/i);
  expect(PokedexInfo).toBeInTheDocument();
});

test('Testa se existe About Pokedex', () => {
  const { getByText } = renderWithRouter(<About />);

  const heading = getByText(/About Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Testa se existe Os parágrafos', () => {
  const { getByText } = renderWithRouter(<About />);

  const textParagraphOne = getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
  expect(textParagraphOne).toBeInTheDocument();

  const textParagraphTwo = getByText('One can filter Pokémons by type, '
  + 'and see more details for each one of them');
  expect(textParagraphTwo).toBeInTheDocument();
});

test('Testa se existe uma imagem com link https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
  const { getByRole } = render(<About />);

  const img = getByRole('img');

  expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
