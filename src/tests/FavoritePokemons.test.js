import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Se é exibido na tela a mensagem no favorite pokemon found', () => {
  const { getByText } = render(<FavoritePokemons />);
  const pageTextWithoutFav = getByText(/No favorite pokemon found/);
  expect(pageTextWithoutFav).toBeInTheDocument();
});

test('Se é exibida a tela com o pokémon favoritado', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const pokeType = getByText('Normal');
  fireEvent.click(pokeType);
  const details = getByText(/More details/);
  fireEvent.click(details);
  const checkFavorite = getByRole('checkbox');
  fireEvent.click(checkFavorite);
  const favoriteName = getByText('Snorlax');
  expect(favoriteName).toBeInTheDocument();
});
