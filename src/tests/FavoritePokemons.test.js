import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/renderWithRouter';

describe('3 - Tests the FavoritePokemons component', () => {
  it('should show "No favorite pokemon found" if the prson hasnt favorites', () => {
    const { getByText } = render(<FavoritePokemons />);
    const noPokemonsMsg = getByText(/No favorite pokemon found/);
    expect(noPokemonsMsg).toBeInTheDocument();
  });

  it('should render favorite pokemons', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);
    const seeDetailsBtn = getByText(/More details/);
    fireEvent.click(seeDetailsBtn);
    const favoriteCheckBtn = getByRole('checkbox');
    fireEvent.click(favoriteCheckBtn);
    const favoritesLink = getByText(/Favorite Pokémons/);
    fireEvent.click(favoritesLink);
    const favorites = getByTestId('pokemon-name');
    expect(favorites).toBeInTheDocument();
  });
});
