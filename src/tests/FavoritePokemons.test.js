import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('Teste se é exibido na tela a mensagem No favorite pokemon found.', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const favoritePokemonTest = getByText(/No favorite pokemon found/);
  expect(favoritePokemonTest).toBeInTheDocument();
});

// test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
//   const { getByText } = renderWithRouter(<FavoritePokemons />);
//   const favoritePokemonTest = getByText(/No favorite pokemon found/);
//   expect(favoritePokemonTest).toBeInTheDocument();const
// });


