import React from 'react';
import { render } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('requirement 3 - test the FavoritePokemons.js component', () => {
  it('message "No favorite pokemon found" if not have favorite pokemons', () => {
    const { getByText } = render(<FavoritePokemons />);
    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  it('all favorite pokemons cards are displyed', () => {
    const favoritePokemons = [pokemons[0], pokemons[4]];
    const { container } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const favorite = container.getElementsByClassName('favorite-pokemon');
    expect(favorite.length).toBe(2);
  });

  it('if no Pokemon card is displayed, if it is not favorited', () => {
    const { container } = render(<FavoritePokemons />);
    const favorite = container.getElementsByClassName('favorite-pokemon');
    expect(favorite.length).toBe(0);
  });
});
