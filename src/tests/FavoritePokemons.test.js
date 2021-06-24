import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  const noPokeFound = getByText('No favorite pokemon found');
  expect(noPokeFound).toBeInTheDocument();
});

it('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { getByText, getByLabelText } = renderWithRouter(<App />);
  const moreDetails = getByText('More details');
  fireEvent.click(moreDetails);

  const toFavorite = getByLabelText('Pokémon favoritado?');
  fireEvent.click(toFavorite);

  const favoritePoke = getByText('Favorite Pokémons');
  fireEvent.click(favoritePoke);

  const pikachu = getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
});

it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
  const { queryByText } = renderWithRouter(<FavoritePokemons />);
  const noPokeFavorited = queryByText('Caterpie');
  expect(noPokeFavorited).not.toBeInTheDocument();
});
