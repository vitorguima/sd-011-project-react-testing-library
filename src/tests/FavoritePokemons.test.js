import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

import App from '../App';

test('Teste se é exibido na tela uma mensagem, não tiver pokémons favoritos.', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const message = getByText(/No favorite pokemon found/i);

  expect(message).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  const { getByText, container } = renderWithRouter(<App />);

  userEvent.click(getByText('Home'));
  userEvent.click(getByText('More details'));
  userEvent.click(getByText('Pokémon favoritado?'));
  userEvent.click(getByText('Favorite Pokémons'));

  const pokemon = container.querySelector('.favorite-pokemons');

  expect(pokemon).toBeInTheDocument();
});

test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});
