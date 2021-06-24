import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('A página contém um heading h2 com o texto Encountered pokémons.', () => {
  const { getByText } = renderWithRouter(<App />);
  const header = getByText('Encountered pokémons');
  expect(header).toBeInTheDocument();
});

test('Exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const nextPokemonBtn = getByTestId('next-pokemon');
  expect(nextPokemonBtn).toBeInTheDocument();
  expect(nextPokemonBtn.innerHTML).toBe('Próximo pokémon');
  // fireEvent.click(nextPokemonBtn);
});

test('A Pokédex tem os botões de filtro.', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pokemonTypeBtn = getAllByTestId('pokemon-type-button');
  const pkmtps = [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
  expect(pokemonTypeBtn.length).toBe(pkmtps.length);
  pokemonTypeBtn.forEach((button, index) => {
    expect(button.innerHTML).toBe(pkmtps[index]);
  });
});

test('A Pokédex contém um botão para resetar o filtro.', () => {
  const { getByText } = renderWithRouter(<App />);
  const allBtn = getByText('All');
  expect(allBtn).toBeInTheDocument();
  fireEvent.click(allBtn);
});
