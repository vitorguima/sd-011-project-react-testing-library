import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('FavoritePokemons tests', () => {
  test('Tests if "No favorite pokemon found" in case the user have no favorite pokemons.',
    () => {
      const { getByText } = render(<FavoritePokemons />);
      const noFavoritePokemonMessage = getByText('No favorite pokemon found');

      expect(noFavoritePokemonMessage).toBeInTheDocument();
    });

  test('Tests if all favorite Pokemon cards are displayed.',
    () => {
      const { getByText, container } = renderWithRouter(<App />);
      const MoreDetails = getByText('More details');
      fireEvent.click(MoreDetails);

      const favoritePokemon = getByText('Pokémon favoritado?');
      fireEvent.click(favoritePokemon);

      const favoritePokemonsB = getByText('Favorite Pokémons');
      fireEvent.click(favoritePokemonsB);

      const pokemonOverview = container.querySelector('.pokemon-overview');
      expect(pokemonOverview).toBeInTheDocument();
    });
});
