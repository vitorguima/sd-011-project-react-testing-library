import React from 'react';
import FavotitePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

it('render message `No favorite pokemon found`', () => {
  const { getByText } = renderWithRouter(<FavotitePokemons />);
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});
