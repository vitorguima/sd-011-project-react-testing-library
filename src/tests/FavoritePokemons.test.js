import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

import pokemons from '../data';

const [pikachu, charmander] = pokemons;

test('Renderiza mensagem `No favorite pokemon found` se não existirem pokémons favoritos',
  () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    const title = getByText('No favorite pokemon found');
    expect(title).toBeInTheDocument();
  });

test('Pokemons favoritados são exibidos na tela corretamente', () => {
  renderWithRouter(
    <FavoritePokemons pokemons={ [pikachu, charmander] } />,
  );

  const cards = document.querySelectorAll('.favorite-pokemon');

  expect(cards.length).toBe(2);
});

test('Não exibe nenhum card quando não há pokemons favoritados', () => {
  renderWithRouter(<FavoritePokemons pokemons={ [] } />);

  const cards = document.querySelectorAll('.favorite-pokemons');

  expect(cards.length).toBe(0);
});
