import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('testing about component', () => {
  test('if theres no favorite pokemon message at `Pokédex`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  test('if there are favorite pokemons at `Pokédex`', () => {
    const favoritePokemon = [pokemons[0]];
    const { getByText } = renderWithRouter(<FavoritePokemons
      pokemons={ favoritePokemon }
    />);

    const pokedexCard = getByText(/Pikachu/i);
    expect(pokedexCard).toBeInTheDocument();
  });

  test('if there are no favorite pokemon there are no card', () => {
    const favoritePokemon = [pokemons[0]];
    const { getByText, queryByText } = renderWithRouter(<FavoritePokemons
      pokemons={ favoritePokemon }
    />);

    const pokeTrue = getByText(/Pikachu/i);
    expect(pokeTrue).toBeInTheDocument();

    const pokeFalse = queryByText(/Charmander/i);
    expect(pokeFalse).not.toBeInTheDocument();
  });
});
