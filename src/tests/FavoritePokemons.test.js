import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste componente FavoritePokemons', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByRole } = renderWithRouter(<FavoritePokemons />);

    const fav = getByRole('heading', {
      name: /Favorite pokémons/,
      level: 2,
    });

    expect(fav).toBeInTheDocument();
  });

  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const favNot = getByText(/No favorite pokemon found/);

    expect(favNot).toBeInTheDocument();
  });
});
