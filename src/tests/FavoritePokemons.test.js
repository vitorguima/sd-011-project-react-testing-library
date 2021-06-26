import React from 'react';
import { fireEvent } from '@testing-library/dom';
import * as pokedexService from '../services/pokedexService';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

jest.mock('../services/pokedexService');

describe('Test component Favorite', () => {
  it('Test the message that appear when no favorite', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/);
    expect(message).toBeInTheDocument();
  });

  it('Test if all favorites appear', () => {
    // eslint-disable-next-line no-magic-numbers
    pokedexService.readFavoritePokemonIds.mockReturnValue([25, 4, 10]);
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/));
    const getPokemon = getAllByTestId('pokemon-name');
    // eslint-disable-next-line no-magic-numbers
    expect(getPokemon.length).toBe(3);
  });

  it('Test favorites not appear', () => {
    pokedexService.readFavoritePokemonIds.mockReturnValue([]);
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/));
    const getPokemon = getByText('No favorite pokemon found');
    expect(getPokemon).toBeInTheDocument();
  });
});
