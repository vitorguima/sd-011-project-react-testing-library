import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 03: Teste o componente <FavoritePokemons.js />', () => {
  it('', () => {
    renderWithRouter(<App />);
    const link = screen.getByText(/Favorite Pokémons/i);
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const pokemonNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(pokemonNotFound).toBeInTheDocument();
  });

  it('', () => {

  });
});
