import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import { renderWithRouter } from '../helpers';
import { favoritePokemons, nonFavoritePokemons } from '../mockedFavoritePokemons';

describe('FavoritePokemons.js:', () => {
  it('There should be a message in the page if there are no favorite pokemons', () => {
    const { getByText } = render(<FavoritePokemons />);
    const notFoundMessage = getByText(/no favorite pokemon found/i);

    expect(notFoundMessage).toBeInTheDocument();
  });

  it('The page should contain a card for each favorite pokemon.', () => {
    const { getByRole } = renderWithRouter(
      <FavoritePokemons
        pokemons={ favoritePokemons }
      />,
    );

    favoritePokemons.forEach(({ name }) => {
      const favoritePokemonCard = getByRole('img', {
        name: new RegExp(`${name} is marked as favorite`, 'i'),
      });

      expect(favoritePokemonCard).toBeInTheDocument();
    });
  });

  it('There shouldn\'t be a card for a pokemon that isn\'t a favorite.', () => {
    const { queryByRole } = renderWithRouter(
      <FavoritePokemons
        pokemons={ favoritePokemons }
      />,
    );

    nonFavoritePokemons.forEach(({ name }) => {
      const pokemonCard = queryByRole('img', {
        name: new RegExp(`${name} is marked as favorite`, 'i'),
      });

      expect(pokemonCard).not.toBeInTheDocument();
    });
  });
});
