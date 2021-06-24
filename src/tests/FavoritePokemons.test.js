import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

test('Teste se é exibido na tela a mensagem No favorite pokemon found.', () => {
  const fvPokemons = [];
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ fvPokemons } />);
  const favoritePokemonTest = getByText(/No favorite pokemon found/);
  expect(favoritePokemonTest).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  const { getAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
  const favoritePokemons = getAllByTestId('pokemon-name');
  expect(favoritePokemons[0]).toHaveTextContent(/Pikachu/i);
  expect(favoritePokemons[1]).toHaveTextContent(/Charmander/i);
  expect(favoritePokemons[2]).toHaveTextContent(/Caterpie/i);
  expect(favoritePokemons[3]).toHaveTextContent(/Ekans/i);
});
