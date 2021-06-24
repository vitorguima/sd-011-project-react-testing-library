import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../RenderWithRouter';
import data from '../data';

const pokemons = [data[0], data[2]];

describe('FavoritePokemons tests', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = render(<FavoritePokemons />);
    const title = getByText('No favorite pokemon found');
    expect(title).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Caterpie')).toBeInTheDocument();
  });

  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { container } = render(<FavoritePokemons />);
    expect(container.querySelector('.favorite-pokemons')).not.toBeInTheDocument();
  });
});
