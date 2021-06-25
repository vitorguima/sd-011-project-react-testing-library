import React from 'react';
// import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Test component Favorite', () => {
  it('Test the message that appear when no favorite', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/);
    expect(message).toBeInTheDocument();
  });

  // it('Test if all favorites appear', () => {
  // }
});
