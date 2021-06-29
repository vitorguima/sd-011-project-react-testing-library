import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Check the functions of page pokemons favorites', () => {
  it('show message No favorite pokemon found on the page', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  it('check the cards favorites', () => {
    const { getAllByTestId } = renderWithRouter(<FavoritePokemons
      pokemons={ pokemons }
    />);
    expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
  });
});
