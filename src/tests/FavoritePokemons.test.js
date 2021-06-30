import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

test('Teste se é exibido na tela a mensagem `No favorite pokemon found`', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const heading = getByText(/No favorite pokemon found/i);

  expect(heading).toBeInTheDocument();
});

//
// https://testing-library.com/docs/ecosystem-user-event/

test('Testa se é exibido todos os cards de pokémons favoritados', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pokemons/25');

  const favoriteLink = getByText(/Pokémon favoritado/i);
  userEvent.click(favoriteLink);
  history.push('/favorites');

  expect(getByText(/Charmander/i)).toBeInTheDocument();
});

test('Testa se **nenhum** card de pokémon é exibido, caso não favoritado', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pokemons/25');

  const favoriteLink = getByText(/Pokémon favoritado/i);
  userEvent.click(favoriteLink);
  history.push('/favorites');

  const heading = getByText(/No favorite pokemon found/i);
  expect(heading).toBeInTheDocument();
});
