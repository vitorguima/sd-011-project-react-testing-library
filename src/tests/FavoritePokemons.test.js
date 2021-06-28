import { fireEvent } from '@testing-library/dom';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  it('Verifica se é exibido a mensagem "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFoundFavorite = getByText(/No favorite pokemon found/i);
    expect(notFoundFavorite).toBeInTheDocument();
  });

  it('Verifica se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const details = getByRole('link', { name: /More details/i });
    fireEvent.click(details);
    const favoriteCheck = getByRole('checkbox');
    fireEvent.click(favoriteCheck);
    const favoritePokemon = getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(favoritePokemon);
  });

  it('Verifica se é exibido a mensagem "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notFoundFavorite = getByText(/No favorite pokemon found/i);
    expect(notFoundFavorite).toBeInTheDocument();
  });
});
