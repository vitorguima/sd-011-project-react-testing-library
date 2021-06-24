import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('render the text \'No favorite pokemon found\' with no favs', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  expect(localStorage.length).toBe(0);
  const text = getByText(/No favorite pokemon found/);
  expect(text).toBeInTheDocument();
});
// test('show all favorited pokemon', () => {

//   const { getByText } = renderWithRouter(<FavoritePokemons />);
//   const pikaText = getByText(/Pikachu/);
//   expect(pikaText).toBeInTheDocument();

// });
