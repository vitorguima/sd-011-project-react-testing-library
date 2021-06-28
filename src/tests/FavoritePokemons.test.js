import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('requisito 3 - favorite pokemons', () => {
  test('', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoriteText = getByText(/No favorite pokemon found/i);
    expect(noFavoriteText).toBeInTheDocument();
  });
});
