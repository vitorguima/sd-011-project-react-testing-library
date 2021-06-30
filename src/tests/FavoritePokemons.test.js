import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('teste do componente FavoritePokemons', () => {
  it('testa se aparece No favorite pokemon found, sem favoritos', () => {
    const { getByText } = render(<FavoritePokemons />);

    const pokemonNotFound = getByText(/No favorite pokemon found/i);
    expect(pokemonNotFound).toBeInTheDocument();
  });

  it('testa se o pokémon favoritado está na página FavoritePokemons', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const linkDetail = getByRole('link', { name: 'More details' });
    fireEvent.click(linkDetail);

    const favoriteCheck = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    fireEvent.click(favoriteCheck);

    const linkFavoritePokemon = getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(linkFavoritePokemon);

    const getName = getByTestId('pokemon-name');
    const getType = getByTestId('pokemon-type');
    const getWeigth = getByTestId('pokemon-weight');

    expect(getName).toBeInTheDocument();
    expect(getType).toBeInTheDocument();
    expect(getWeigth).toBeInTheDocument();
  });
});
