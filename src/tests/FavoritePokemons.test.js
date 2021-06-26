import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste componente <About.js />', () => {
  it('Exibe -No favorite pokemon found-, se não houver pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const titleNoFavorite = getByText(/No favorite pokemon found/);
    expect(titleNoFavorite).toBeInTheDocument();
  });

  it('Exibe todos os cards de pokémons favoritados', () => {
    const { getByRole, getByLabelText, getByTestId } = renderWithRouter(<App />);
    const pokemonDetails = getByRole('link', { name: 'More details' });
    const pokemonHomeScreen = getByTestId('pokemon-name').innerHTML;

    fireEvent.click(pokemonDetails);
    const inputFavorite = getByLabelText('Pokémon favoritado?');

    fireEvent.click(inputFavorite);
    const favoritePokemons = getByRole('link', { name: 'Favorite Pokémons' });

    fireEvent.click(favoritePokemons);
    const pokemonFavoriteScreen = getByTestId('pokemon-name').innerHTML;
    expect(pokemonFavoriteScreen).toBe(pokemonHomeScreen);
  });
});
