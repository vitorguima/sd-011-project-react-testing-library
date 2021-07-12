import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

it('Verifica se a mensagem No favorite pokemon found é exibida', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);

  const notFound = getByText(/No favorite pokemon found/);

  expect(notFound).toBeInTheDocument();
});

it('Verifica se exibe todos os pokemons favoritados', () => {
  const { getByText, container } = renderWithRouter(<App />);

  const details = getByText(/More details/);
  fireEvent.click(details);

  const favPokemons = getByText(/Pokémon favoritado/);
  fireEvent.click(favPokemons);

  const favPage = getByText(/Favorite Pokémons/);
  fireEvent.click(favPage);

  const favList = container.querySelectorAll('.favorite-pokemons');
  expect(favList.length).toBe(1);
});

it('Verifica se nenhum card é exibito sem pokemons favoritados', () => {
  const { container } = renderWithRouter(<FavoritePokemons />);

  const favList = container.querySelectorAll('.favorite-pokemons');
  expect(favList.length).toBe(0);
});
