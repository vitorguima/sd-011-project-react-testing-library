import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Test the <FavoritePokemons.js /> component', () => {
  test('Testa se é exibindo No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFoundFavorite = getByText('No favorite pokemon found');

    expect(notFoundFavorite).toBeInTheDocument();
  });
});
