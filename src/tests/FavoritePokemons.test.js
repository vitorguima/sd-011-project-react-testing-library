import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Test the <FavoritePokemons.js /> component', () => {
  test('Test if it is displayed on the screen if you dont have favorite pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFoundFavorite = getByText('No favorite pokemon found');

    expect(notFoundFavorite).toBeInTheDocument();
  });

  // test('Test if all favorite Pokemon cards are displayed.', () => {
  //   const { getByText } = renderWithRouter(<FavoritePokemons />);
  //   const notFoundFavorite = getByText('No favorite pokemon found');

  //   expect(notFoundFavorite).toBeInTheDocument();
  // });

  // test('Test if no Pokemon card is displayed, if it is not favorited.', () => {
  //   const { getByText } = renderWithRouter(<FavoritePokemons />);
  //   const notFoundFavorite = getByText('No favorite pokemon found');

  //   expect(notFoundFavorite).toBeInTheDocument();
  // });
});
