import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

it('Teste o componente <FavoritePokemons.js /> renderiza sem favoritados', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkFavorites = getByText(/Favorite Pokémons/i);
  fireEvent.click(linkFavorites);
  const notFoundPokemon = getByText(/No favorite pokemon found/i);
  expect(notFoundPokemon).toBeInTheDocument();
});

it('Teste o componente <FavoritePokemons.js /> renderiza com favoritados', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const clickBug = getByText('Bug');
  fireEvent.click(clickBug);
  const linkMoreDetails = getByText(/More Details/i);
  fireEvent.click(linkMoreDetails);
  const labelFavoritePokemon = container.querySelector('#favorite');
  fireEvent.click(labelFavoritePokemon);
  const linkFavorites = getByText(/Favorite Pokémons/i);
  fireEvent.click(linkFavorites);
  expect(getByText('Caterpie')).toBeInTheDocument();
});
