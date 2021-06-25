import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Test if all the Favorite Pokemons page is being exhibited correctly', () => {
  test('checks empty favorite', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noPokemonFound = getByText(/No favorite pokemon found/i);
    expect(noPokemonFound).toBeInTheDocument();
  });

  test('checks if selected pokemon shows on Favorite screen', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More Details/i);
    fireEvent.click(moreDetails);
    const favoritePokemon = getByText('Pokémon favoritado?');
    fireEvent.click(favoritePokemon);
    const linkFavorite = getByText(/Favorite Pokémons/);
    fireEvent.click(linkFavorite);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
