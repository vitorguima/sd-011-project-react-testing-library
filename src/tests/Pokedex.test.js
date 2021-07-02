import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Pokedex } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const mockFavorite = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const pLength = 7;

test('Teste o componente Pokedex.js', () => {
  const { getByText } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ mockFavorite } />,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Teste o componente Pokedex.js', () => {
  const { getByText, getAllByTestId, getByRole } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ mockFavorite } />,
  );

  expect(getByText('All')).toBeInTheDocument();
  expect(getByText('Próximo pokémon')).toBeInTheDocument();
  // no magic numbers (lint problems): https://eslint.org/docs/rules/no-magic-numbers
  expect(getAllByTestId('pokemon-type-button').length).toBe(pLength);

  pokemons.map((pokemon) => {
    const { type } = pokemon;
    expect(getByRole('button', { name: type })).toBeInTheDocument();
    return true;
  });

  fireEvent.click(getByText('All'));
});
