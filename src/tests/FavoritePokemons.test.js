import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const ZERO = 0;

test('Verifica se exibe uma mensagem se a pessoa não tem pokémons favoritos', () => {
  renderWithRouter(<FavoritePokemons />);
  screen.getByText('No favorite pokemon found');
});

test('Verifica se exibe todos os cards de pokémons favoritados', () => {
  const { container } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
  const pokemonDivs = container.querySelectorAll('.pokemon');
  expect(pokemonDivs.length).toBe(pokemons.length);
});

test('Verifica se não exibe nenhum card de pokémon se ele não estiver favoritado', () => {
  const { container } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  const pokemonDivs = container.querySelectorAll('.pokemon');
  expect(pokemonDivs.length).toBe(ZERO);
});
