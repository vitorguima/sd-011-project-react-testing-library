import React from 'react';
// import { fireEvent } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const title = getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(title).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const firstP = getByText(
    /This application simulates a Pokédex, a digital encyclopedia containing all/,
  );
  const secondP = getByText(
    /One can filter Pokémons by type, and see more details for each one of them/,
  );
  expect(firstP).toBeInTheDocument();
  expect(secondP).toBeInTheDocument();
});

test('Teste se a página contém a imagem correta de uma Pokédex', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const imgPokemon = getByAltText('Pokédex');
  expect(imgPokemon).toBeInTheDocument();
  expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
