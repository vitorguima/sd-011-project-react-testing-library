import React from 'react';
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

test('Teste o componente Pokedex.js', () => {
  const { getByText } = renderWithRouter(
  <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ mockFavorite } />,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
