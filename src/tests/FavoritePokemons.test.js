import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing Component FavoritePokemon', () => {
  it('Testing if mensage no favorite pokemon found appears', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoriteLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoriteLink);
    const favoriteMensage = getByText(/No favorite /);
    expect(favoriteMensage).toBeInTheDocument();
  });

  it('Testing if pokemons favorite add', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const detailsLink = getByText(/More details/i);
    fireEvent.click(detailsLink);
    const labelPokemon = getByLabelText(/Pokémon favoritado/i);
    fireEvent.click(labelPokemon);
    const favoriteLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoriteLink);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
