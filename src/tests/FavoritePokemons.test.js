import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('FavoritePokemons.js component', () => {
  it('should render message if there are no favorite pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
});
