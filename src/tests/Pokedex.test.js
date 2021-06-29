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
const SEVEN = 7;

test('when theres no pokemon', () => {
  const { getByText } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ mockFavorite } />,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('when theres no pokemon', () => {
  const { getByText, getAllByTestId, getByRole } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ mockFavorite } />,
  );
  expect(getByText('All')).toBeInTheDocument();
  expect(getByText('Próximo pokémon')).toBeInTheDocument();
  expect(getAllByTestId('pokemon-type-button').length).toBe(SEVEN);
  pokemons.map((pokemon) => {
    const { type } = pokemon;
    expect(getByRole('button', { name: type })).toBeInTheDocument();
    return true;
  });
  fireEvent.click(getByText('All'));
});
