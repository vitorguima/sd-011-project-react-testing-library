import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Teste o componente FavoritePokemons.js', () => {
  it('É exibido na tela a msg No favorite pokemon found, se não tiver favoritado pokemon',
    () => {
      renderWithRouter(<FavoritePokemons pokemons={ [] } />);

      const msgNoFavorite = screen.getByText(/No favorite pokemon found/i);
      expect(msgNoFavorite).toBeInTheDocument();
    });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const pokemonsFavorited = screen.getAllByTestId(/pokemon-name/i);

    expect(pokemonsFavorited.length).toBe(pokemons.length);
  });
  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const pokemonsFavorited = screen.queryAllByTestId(/pokemon-name/i);
    expect(pokemonsFavorited.length).toBe(0);
  });
});
