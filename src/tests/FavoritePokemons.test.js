import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import Data from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('testa mensagem No favorite pokemon found', () => {
    const { getByText } = render(<FavoritePokemons />);
    const head = getByText(/No favorite pokemon found/i);
    expect(head).toBeInTheDocument();
    expect(head.textContent).toMatch(/No favorite pokemon found/i);
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const PokemonArr = [Data[0], Data[1]];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ PokemonArr } />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Charmander')).toBeInTheDocument();
  });
  test('Nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const PokemonArr = [];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ PokemonArr } />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
