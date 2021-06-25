import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se é exibido na tela a mensagem, se não tiver pokémons favoritos.', () => {
  const { getByText } = render(<FavoritePokemons />);
  const heading = getByText(/No favorite pokemon found/i);
  expect(heading).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/i);
  fireEvent.click(moreDetails);
  const clickFavorite = getByRole('checkbox');
  fireEvent.click(clickFavorite);
  const goToFavPoke = getByText(/Favorite Pokémons/i);
  fireEvent.click(goToFavPoke);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
  const averageWeight = getByText(/Average weight/i);
  expect(averageWeight).toBeInTheDocument();
});

test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
  const { getByText } = render(<FavoritePokemons pokemons={ [] } />);
  const title = getByText(/No favorite pokemon found/);
  expect(title).toBeInTheDocument();
});
