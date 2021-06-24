import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<App />);
  const favoritePokemonsLink = getByText(/Favorite Pokémons/i);
  fireEvent.click(favoritePokemonsLink);
  const noFavoritePokemons = getByText(/No favorite pokemon found/i);
  expect(noFavoritePokemons).toBeInTheDocument();
});

it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
  const { getByText } = renderWithRouter(<App />);
  const goToFavorite = getByText(/Favorite Pokémons/i);
  fireEvent.click(goToFavorite);

  const noFavorite = getByText(/No favorite pokemon found/i);
  expect(noFavorite).toBeInTheDocument();
});

it('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { getByText, getAllByTestId } = renderWithRouter(<App />);
  const detailsButton = getByText(/More details/i);

  fireEvent.click(detailsButton);
  const favoriteButton = getByText(/Pokémon favoritado?/i);
  fireEvent.click(favoriteButton);

  const goToFavorite = getByText(/Favorite Pokémons/i);
  fireEvent.click(goToFavorite);

  const pokemonNameId = 'pokemon-name';
  const pokemonName = getAllByTestId(pokemonNameId);
  expect(pokemonName).toHaveLength(1);
});
