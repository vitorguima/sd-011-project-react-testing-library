import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('test the component "FavoritePokemons"', () => {
  it('the text "No favorite pokemon found" is rendered whit is no favorite pokemon',
    () => {
      const favoritePokemons = [];
      const { getByText } = renderWithRouter(
        <FavoritePokemons pokemons={ favoritePokemons } />,
      );
      const msg = getByText('No favorite pokemon found');
      expect(msg).toBeInTheDocument();
    });

  it('render all the favorite pokemons', () => {
    const size = 3;
    const favoritePokemons = pokemons.slice(0, size);
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const favoriteNames = getAllByTestId('pokemon-name');
    expect(favoriteNames).toHaveLength(size);
    expect(favoriteNames[0].innerHTML).toBe('Pikachu');
    expect(favoriteNames[1].innerHTML).toBe('Charmander');
    expect(favoriteNames[2].innerHTML).toBe('Caterpie');
  });

  it('does not render all the non favorite pokemons', () => {
    const size = 6;
    const favoritePokemons = pokemons.slice(0, size);
    const { getAllByTestId, queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const favoriteNames = getAllByTestId('pokemon-name');
    expect(favoriteNames).toHaveLength(size);
    expect(queryByText('Pikachu')).toBeInTheDocument();
    expect(queryByText('Rapidash')).not.toBeInTheDocument();
    expect(queryByText('Snorlax')).not.toBeInTheDocument();
    expect(queryByText('Dragonair')).not.toBeInTheDocument();
  });
});
