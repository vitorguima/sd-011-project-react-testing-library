import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText, container } = render(<FavoritePokemons />);
    const noFavoriteMessage = getByText('No favorite pokemon found');
    expect(noFavoriteMessage).toBeInTheDocument();

    const pokemonOverview = container.querySelector('.pokemon-overview');
    expect(pokemonOverview).toBe(null);
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const btnMoreDetails = getByText('More details');
    fireEvent.click(btnMoreDetails);

    const inputFavorite = getByText('Pokémon favoritado?');
    fireEvent.click(inputFavorite);

    const favoriteLink = getByText('Favorite Pokémons');
    fireEvent.click(favoriteLink);

    const pokemonOverview = container.querySelector('.pokemon-overview');
    expect(pokemonOverview).toBeInTheDocument();
  });
});
