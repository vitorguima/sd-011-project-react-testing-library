import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const pokedexText = getByText(/No favorite pokemon found/i);
  expect(pokedexText).toBeInTheDocument();
});
