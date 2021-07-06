import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Favorite pokemons tests', () => {
  test('Verifica se aparece a mensagem "No favorite pokemon found"', () => {
    const { getByText } = render(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/i);

    expect(message).toBeInTheDocument();
  });

  test('Verifica se é exibido todos os cards de pokemons favoritos', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const details = getByText('More details');
    fireEvent.click(details);

    const favorite = getByText('Pokémon favoritado?');
    fireEvent.click(favorite);

    const favoriteLink = getByText('Favorite Pokémons');
    fireEvent.click(favoriteLink);

    const pokemonOverview = container.querySelector('.pokemon-overview');
    expect(pokemonOverview).toBeInTheDocument();
  });
});
